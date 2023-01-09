import { Photo } from '../../photos/types/Photo';
import { Review } from '../../reviews/types/Review';

export type SpotPhoto = Photo & {
  spotId: string;
};

export type Spot = {
  id: string;
  longitude: string;
  latitude: string;
  name: string;
  description: string;
  created_at: Date;
  Photos: Array<SpotPhoto>;
  Reviews: Array<Review>;
  CreatedBy: {
    nickname: string;
  };
  averageRate: number;
};
