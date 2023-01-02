import { HttpException, Injectable } from '@nestjs/common';
import { throws } from 'assert';
import { PhotosService } from 'src/photos/photos.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { getDistanceBetween } from './helpers/getDistanceBetween';

@Injectable()
export class SpotsService {
  constructor(
    private prismaService: PrismaService,
    private photosService: PhotosService,
  ) {}

  async create(
    createSpotDto: CreateSpotDto,
    userId: string,
    photos: Express.Multer.File[],
  ) {
    const spot = await this.prismaService.spot.create({
      data: {
        name: createSpotDto.name,
        description: createSpotDto.description,
        inReview: false,
        latitude: createSpotDto.latitude,
        longitude: createSpotDto.longitude,
        CreatedBy: {
          connect: {
            id: userId,
          },
        },
      },
    });

    console.log(spot);

    await this.photosService.saveSpotPhotos({
      photos: photos,
      spotId: spot.id,
      userId,
    });
  }

  async findAll(params: { lon: string; lat: string; dist: string }) {
    let spots = await this.prismaService.spot.findMany({
      select: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
        Photos: {
          select: {
            id: true,
            filename: true,
          },
        },
        CreatedBy: {
          select: {
            nickname: true,
          },
        },
        Reviews: {
          select: {
            mark: true,
          },
        },
      },
    });

    if (params.lon && params.lat && params.dist) {
      const userLocation = {
        lat: params.lat,
        lon: params.lon,
      };
      spots = spots.filter((spot) => {
        return (
          getDistanceBetween(userLocation, {
            lat: spot.latitude,
            lon: spot.longitude,
          }) <= parseFloat(params.dist)
        );
      });
    }

    return spots.map((spot) => {
      const rateSum = spot.Reviews.reduce((acc, cur) => (acc += cur.mark), 0);
      const averageRate = rateSum ? rateSum / spot.Reviews.length : 0;
      return {
        ...spot,
        averageRate,
      };
    });
  }

  async findOne(id: string) {
    const spot = await this.prismaService.spot.findUnique({
      where: {
        id,
      },
      include: {
        Labels: true,
        Photos: true,
        Reviews: {
          include: {
            CreatedBy: {
              select: {
                nickname: true,
              },
            },
            Photos: true,
          },
        },
        CreatedBy: {
          select: {
            nickname: true,
          },
        },
      },
    });

    const rateSum = spot.Reviews.reduce((acc, cur) => (acc += cur.mark), 0);
    const averageRate = rateSum ? rateSum / spot.Reviews.length : 0;

    return { ...spot, averageRate };
  }

  async findAllMy(userId: string) {
    const spots = await this.prismaService.spot.findMany({
      where: {
        CreatedBy: {
          id: userId,
        },
      },
      select: {
        id: true,
        name: true,
        Photos: {
          select: {
            id: true,
            filename: true,
          },
        },
        CreatedBy: {
          select: {
            nickname: true,
          },
        },
        Reviews: {
          select: {
            mark: true,
          },
        },
      },
    });

    return spots.map((spot) => {
      const rateSum = spot.Reviews.reduce((acc, cur) => (acc += cur.mark), 0);
      const averageRate = rateSum ? rateSum / spot.Reviews.length : 0;
      return {
        ...spot,
        averageRate,
      };
    });
  }

  async findAllFromCollection(collectionId: string) {
    const spots = await this.prismaService.spot.findMany({
      where: {
        Collections: {
          some: {
            id: collectionId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        Photos: {
          select: {
            id: true,
            filename: true,
          },
        },
        CreatedBy: {
          select: {
            nickname: true,
          },
        },
        Reviews: {
          select: {
            mark: true,
          },
        },
      },
    });

    return spots.map((spot) => {
      const rateSum = spot.Reviews.reduce((acc, cur) => (acc += cur.mark), 0);
      const averageRate = rateSum ? rateSum / spot.Reviews.length : 0;
      return {
        ...spot,
        averageRate,
      };
    });
  }

  async update(
    spotId: string,
    { photosToDelete, ...updateSpotDto }: UpdateSpotDto,
    photos: Express.Multer.File[],
    userId: string,
  ) {
    const spot = await this.prismaService.spot.findUnique({
      where: {
        id: spotId,
      },
    });

    if (spot.userId !== userId)
      throw new HttpException('Spot does not exist', 404);

    if (photosToDelete) {
      await this.photosService.deleteSpotPhotos({
        photosIds: photosToDelete,
      });
    }
    await this.prismaService.spot.update({
      where: {
        id: spotId,
      },
      data: {
        ...updateSpotDto,
      },
    });

    if (photos) {
      await this.photosService.saveSpotPhotos({
        photos,
        spotId,
        userId,
      });
    }
  }

  async remove(id: string, userId: string) {
    const spot = await this.prismaService.spot.findUnique({
      where: {
        id,
      },
    });
    if (spot.userId !== userId)
      throw new HttpException('Spot does not exist.', 404);

    const spotPhotos = await this.prismaService.spotPhoto.findMany({
      where: {
        userId,
      },
    });

    const reviewPhotos = await this.prismaService.reviewPhoto.findMany({
      where: {
        userId,
      },
    });

    await this.photosService.deleteSpotPhotos({
      photosIds: spotPhotos.map((photo) => photo.id),
    });
    await this.photosService.deleteReviewPhotos({
      photosIds: reviewPhotos.map((photo) => photo.id),
    });
    await this.prismaService.spot.delete({
      where: {
        id,
      },
    });
  }
}
