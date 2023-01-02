import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SpotsService } from 'src/spots/spots.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(
    private prismaService: PrismaService,
    private spotsService: SpotsService,
  ) {}
  async create(createCollectionDto: CreateCollectionDto, userId: string) {
    return this.prismaService.collection.create({
      data: {
        ...createCollectionDto,
        userId,
      },
    });
  }

  async findAllMy(userId: string) {
    return await this.prismaService.collection.findMany({
      where: {
        userId,
      },
      include: {
        Spots: true,
      },
    });
  }

  async findOne(collectionId: string, userId: string) {
    const collection = await this.prismaService.collection.findUnique({
      where: {
        id: collectionId,
      },
      include: {
        Spots: true,
      },
    });
    if (!collection || collection.userId !== userId)
      throw new HttpException('Collection does not exist.', 404);
    return collection;
  }

  async findSpotsByCollection(collectionId: string, userId: string) {
    const collection = await this.prismaService.collection.findUnique({
      where: {
        id: collectionId,
      },
    });
    if (!collection || collection.userId !== userId)
      throw new HttpException('Collection does not exist', 404);
    return await this.spotsService.findAllFromCollection(collectionId);
  }

  async update(
    collectionId: string,
    updateCollectionDto: UpdateCollectionDto,
    userId: string,
  ) {
    const collection = await this.prismaService.collection.findUnique({
      where: {
        id: collectionId,
      },
    });
    if (!collection || collection.userId !== userId)
      throw new HttpException('Collection does not exist.', 404);

    await this.prismaService.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        ...updateCollectionDto,
      },
    });
  }

  async assignSpot(collectionId: string, spotId: string, userId: string) {
    const collection = await this.prismaService.collection.findUnique({
      where: {
        id: collectionId,
      },
    });
    if (!collection || collection.userId !== userId)
      throw new HttpException('Collection does not exist', 404);
    await this.prismaService.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        Spots: {
          connect: {
            id: spotId,
          },
        },
      },
    });
  }

  async unassignSpot(collectionId: string, spotId: string, userId: string) {
    const collection = await this.prismaService.collection.findUnique({
      where: {
        id: collectionId,
      },
    });
    if (!collection || collection.userId !== userId)
      throw new HttpException('Collection does not exist', 404);
    await this.prismaService.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        Spots: {
          disconnect: {
            id: spotId,
          },
        },
      },
    });
  }

  async remove(collectionId: string, userId: string) {
    const collection = await this.prismaService.collection.findUnique({
      where: {
        id: collectionId,
      },
    });
    if (!collection || collection.userId !== userId)
      throw new HttpException('Collection does not exist', 404);
    await this.prismaService.collection.delete({
      where: {
        id: collectionId,
      },
    });
  }
}
