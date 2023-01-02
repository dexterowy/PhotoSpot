import { Injectable } from '@nestjs/common';
import { rm, rename } from 'fs/promises';
import { join } from 'path';
import { config } from 'src/config/config.dev';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import {
  DeleteReviewPhotosDto,
  DeleteSpotPhotosDto,
  SaveReviewPhotosDto,
  SaveSpotPhotosDto,
} from './dto/save-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotosService {
  constructor(private prismaService: PrismaService) {}
  // create(createPhotoDto: CreatePhotoDto) {
  //   return 'This action adds a new photo';
  // }

  // findAll() {
  //   return `This action returns all photos`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} photo`;
  // }

  // update(id: number, updatePhotoDto: UpdatePhotoDto) {
  //   return `This action updates a #${id} photo`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} photo`;
  // }
  async saveSpotPhotos(savePhotosDto: SaveSpotPhotosDto) {
    const photos = await Promise.all(
      savePhotosDto.photos.map((photo) => {
        return this.prismaService.spotPhoto.create({
          data: {
            filename: photo.filename,
            originalFilename: photo.originalname,
            userId: savePhotosDto.userId,
            spotId: savePhotosDto.spotId,
          },
        });
      }),
    );
    await Promise.all(
      photos.map((photo) => {
        rename(
          join(config.filesPath, 'temp', photo.filename),
          join(config.filesPath, 'spots', photo.filename),
        );
      }),
    );
  }

  async saveReviewPhotos(savePhotosDto: SaveReviewPhotosDto) {
    const photos = await Promise.all(
      savePhotosDto.photos.map((photo) => {
        return this.prismaService.reviewPhoto.create({
          data: {
            filename: photo.filename,
            originalFilename: photo.originalname,
            userId: savePhotosDto.userId,
            reviewId: savePhotosDto.reviewId,
          },
        });
      }),
    );

    await Promise.all(
      photos.map((photo) => {
        rename(
          join(config.filesPath, 'temp', photo.filename),
          join(config.filesPath, 'reviews', photo.filename),
        );
      }),
    );
  }

  async deleteSpotPhotos(deleteSpotPhotosDto: DeleteSpotPhotosDto) {
    const photos = await this.prismaService.spotPhoto.findMany({
      where: {
        id: {
          in: deleteSpotPhotosDto.photosIds,
        },
      },
    });
    await this.prismaService.spotPhoto.deleteMany({
      where: {
        id: {
          in: photos.map((photo) => photo.id),
        },
      },
    });
    await Promise.all(
      photos.map((photo) => {
        rm(join(config.filesPath, 'spots', photo.filename));
      }),
    );
    console.log(photos);
  }

  async deleteReviewPhotos(deleteReviewPhotosDto: DeleteReviewPhotosDto) {
    const photos = await this.prismaService.reviewPhoto.findMany({
      where: {
        id: {
          in: deleteReviewPhotosDto.photosIds,
        },
      },
    });
    await this.prismaService.reviewPhoto.deleteMany({
      where: {
        id: {
          in: photos.map((photo) => photo.id),
        },
      },
    });
    await Promise.all(
      photos.map((photo) => {
        rm(join(config.filesPath, 'reviews', photo.filename));
      }),
    );
  }
}
