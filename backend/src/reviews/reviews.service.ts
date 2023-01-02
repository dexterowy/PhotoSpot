import { HttpException, Injectable } from '@nestjs/common';
import { PhotosService } from 'src/photos/photos.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    private prismaService: PrismaService,
    private photosService: PhotosService,
  ) {}

  async create(
    spotId: string,
    createReviewDto: CreateReviewDto,
    photos: Express.Multer.File[],
    userId: string,
  ) {
    const review = await this.prismaService.review.create({
      data: {
        ...createReviewDto,
        mark: parseInt(createReviewDto.mark, 10),
        Spot: {
          connect: {
            id: spotId,
          },
        },
        CreatedBy: {
          connect: {
            id: userId,
          },
        },
      },
    });
    await this.photosService.saveReviewPhotos({
      photos,
      reviewId: review.id,
      userId,
    });
  }

  async findAllMy(userId: string) {
    return await this.prismaService.review.findMany({
      where: {
        CreatedBy: {
          id: userId,
        },
      },
    });
  }

  async update(
    reviewId: string,
    { photosToDelete, ...updateReviewDto }: UpdateReviewDto,
    userId: string,
    photos: Express.Multer.File[],
  ) {
    const review = await this.prismaService.review.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (!review || review.userId !== userId)
      throw new HttpException('Review does not exist', 404);
    if (photosToDelete) {
      await this.photosService.deleteReviewPhotos({
        photosIds: photosToDelete,
      });
    }
    await this.prismaService.review.update({
      where: {
        id: reviewId,
      },
      data: {
        ...updateReviewDto,
        mark: parseInt(updateReviewDto.mark, 10),
      },
    });
    if (photos) {
      await this.photosService.saveReviewPhotos({
        photos,
        userId,
        reviewId,
      });
    }
  }

  async remove(reviewId: string, userId: string) {
    const review = await this.prismaService.review.findUnique({
      where: {
        id: reviewId,
      },
    });
    if (!review || review.userId !== userId)
      throw new HttpException('Review does not exist', 404);
    const reviewPhotos = await this.prismaService.reviewPhoto.findMany({
      where: {
        reviewId,
      },
    });
    await this.photosService.deleteReviewPhotos({
      photosIds: reviewPhotos.map((photo) => photo.id),
    });

    await this.prismaService.review.delete({
      where: {
        id: reviewId,
      },
    });
  }
}
