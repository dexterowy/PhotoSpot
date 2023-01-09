import { Photo } from '../../photos/types/Photo';

export type ReviewPhoto = Photo & {
  reviewId: string;
};

export type Review = {
  id: string;
  userId: string;
  spotId: string;
  created_at: Date;
  updated_at: Date;
  mark: number;
  comment: string;
  CreatedBy: {
    nickname: string;
  };
  Photos: Array<ReviewPhoto>;
};
