export class SavePhotoDto {
  filename: string;
  userId: string;
  spotId: string;
}

export class SaveSpotPhotosDto {
  photos: Express.Multer.File[];
  userId: string;
  spotId: string;
}

export class SaveReviewPhotosDto {
  photos: Express.Multer.File[];
  userId: string;
  reviewId: string;
}

export class DeleteSpotPhotosDto {
  photosIds: string[];
}

export class DeleteReviewPhotosDto {
  photosIds: string[];
}
