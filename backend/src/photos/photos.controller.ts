import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageStorageHelper } from './helpers/image-storage.helper';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Express } from 'express';
import { SaveSpotPhotosDto } from './dto/save-photo.dto';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}
  @Post('spot')
  @UseInterceptors(FilesInterceptor('photos', 100, imageStorageHelper))
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        photos: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  async saveSpotPhotos(
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Body() saveSpotPhotosDto: SaveSpotPhotosDto,
    @Req() req,
  ) {
    return await this.photosService.saveSpotPhotos({
      photos,
      userId: req.user.id,
      spotId: saveSpotPhotosDto.spotId
    });
  }
}
