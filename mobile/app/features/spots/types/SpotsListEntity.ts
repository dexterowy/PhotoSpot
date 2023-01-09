export type SpotsListEntity = {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  Photos: Array<SpotsListEntityPhoto>; //TODO: Phostos type
  CreatedBy: SpotsListEntityAuthor;
  Reviews: Array<SpotsListEntityReview>; //TODO: Review array
  averageRate: number;
};

export type SpotsListEntityAuthor = {
  nickname: string;
};

export type SpotsListEntityPhoto = {
  id: string;
  thumbnailUrl: string;
};

export type SpotsListEntityReview = any;
