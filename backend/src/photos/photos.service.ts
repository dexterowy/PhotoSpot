import { Injectable } from '@nestjs/common';
import { rm, rename } from 'fs/promises';
// import ImageKit from 'imagekit';
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
const ImageKit = require('imagekit');

type ImageKitResponse = {
  fileId: string;
  name: string;
  size: number;
  filePath: string;
  url: string;
  fileType: string;
  height: number;
  width: number;
  thumbnailUrl: string;
};

@Injectable()
export class PhotosService {
  imagekit: any;

  constructor(private prismaService: PrismaService) {
    console.log(ImageKit);
    this.imagekit = new ImageKit({
      privateKey: 'private_8pqqKMGq4X0CHqy6kH+vNYgggds=',
      publicKey: 'public_LWLhuZFfMGMeEJM7+K/z4oV05hw=',
      urlEndpoint: 'https://ik.imagekit.io/uhx9ok7su/',
    });
  }
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
    const responses: Array<ImageKitResponse> = await Promise.all(
      savePhotosDto.photos.map((photo) => {
        return this.imagekit.upload({
          file: photo.buffer,
          fileName: photo.originalname,
        });
      }),
    );
    await Promise.all(
      responses.map((photo) => {
        return this.prismaService.spotPhoto.create({
          data: {
            photoIdCDN: photo.fileId,
            thumbnailUrl: photo.thumbnailUrl,
            url: photo.url,
            userId: savePhotosDto.userId,
            spotId: savePhotosDto.spotId,
          },
        });
      }),
    );
  }

  async saveReviewPhotos(savePhotosDto: SaveReviewPhotosDto) {
    const responses: Array<ImageKitResponse> = await Promise.all(
      savePhotosDto.photos.map((photo) => {
        return this.imagekit.upload({
          file: photo.buffer,
          fileName: photo.originalname,
        });
      }),
    );

    await Promise.all(
      responses.map((photo) => {
        return this.prismaService.reviewPhoto.create({
          data: {
            photoIdCDN: photo.fileId,
            thumbnailUrl: photo.thumbnailUrl,
            url: photo.url,
            userId: savePhotosDto.userId,
            reviewId: savePhotosDto.reviewId,
          },
        });
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
        this.imagekit.deleteFile(photo.photoIdCDN);
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
        this.imagekit.deleteFile(photo.photoIdCDN);
      }),
    );
  }
}
