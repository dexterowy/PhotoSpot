import { SpotsListEntity } from '../../spots/types/SpotsListEntity';

export type ColectionsListEntity = {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  Spots: Array<SpotsListEntity>;
};
