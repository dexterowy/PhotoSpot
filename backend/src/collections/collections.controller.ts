import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createCollectionDto: CreateCollectionDto, @Req() req) {
    return await this.collectionsService.create(
      createCollectionDto,
      req.user.id,
    );
  }

  @Post(':collectionId/assign/:spotId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async assignSpot(
    @Param('collectionId') collectionId: string,
    @Param('spotId') spotId: string,
    @Req() req,
  ) {
    return await this.collectionsService.assignSpot(
      collectionId,
      spotId,
      req.user.id,
    );
  }

  @Post(':collectionId/unassign/:spotId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async unassignSpot(
    @Param('collectionId') collectionId: string,
    @Param('spotId') spotId: string,
    @Req() req,
  ) {
    return await this.collectionsService.unassignSpot(
      collectionId,
      spotId,
      req.user.id,
    );
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAllMy(@Req() req) {
    return this.collectionsService.findAllMy(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string, @Req() req) {
    return await this.collectionsService.findOne(id, req.user.id);
  }

  @Get(':id/spots')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async fingByCollection(@Param('id') collectionId: string, @Req() req) {
    return await this.collectionsService.findSpotsByCollection(
      collectionId,
      req.user.id,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
    @Req() req,
  ) {
    return this.collectionsService.update(id, updateCollectionDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string, @Req() req) {
    return this.collectionsService.remove(id, req.user.id);
  }
}
