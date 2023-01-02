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
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { SpotsService } from './spots.service';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageStorageHelper } from 'src/photos/helpers/image-storage.helper';

@Controller('spots')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @UseInterceptors(FilesInterceptor('photos', 10, imageStorageHelper))
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async create(
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Body() createSpotDto: CreateSpotDto,
    @Req() req,
  ) {
    return await this.spotsService.create(createSpotDto, req.user.id, photos);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query('lon') lon?: string,
    @Query('lat') lat?: string,
    @Query('dist') dist?: string,
  ) {
    return this.spotsService.findAll({ lon, lat, dist });
  }

  @Get('/my')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAllMy(@Req() req) {
    return this.spotsService.findAllMy(req.user.id);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.spotsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('photos', 100, imageStorageHelper))
  async update(
    @Param('id') id: string,
    @Body() updateSpotDto: UpdateSpotDto,
    @UploadedFiles() photos: Express.Multer.File[],
    @Req() req,
  ) {
    return await this.spotsService.update(
      id,
      updateSpotDto,
      photos,
      req.user.id,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req) {
    return this.spotsService.remove(id, req.user.id);
  }
}
