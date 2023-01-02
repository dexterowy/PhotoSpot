import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageStorageHelper } from 'src/photos/helpers/image-storage.helper';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseInterceptors(FilesInterceptor('photos', 100, imageStorageHelper))
  @Post('/:spotId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(
    @Param('spotId') spotId: string,
    @Body() createReviewDto: CreateReviewDto,
    @UploadedFiles() photos: Express.Multer.File[],
    @Req() req,
  ) {
    return await this.reviewsService.create(
      spotId,
      createReviewDto,
      photos,
      req.user.id,
    );
  }

  @UseInterceptors(FilesInterceptor('photos', 100, imageStorageHelper))
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @UploadedFiles() photos: Express.Multer.File[],
    @Req() req,
  ) {
    return this.reviewsService.update(id, updateReviewDto, req.user.id, photos);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string, @Req() req) {
    return this.reviewsService.remove(id, req.user.id);
  }
}
