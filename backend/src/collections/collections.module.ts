import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { SpotsModule } from 'src/spots/spots.module';

@Module({
  imports: [SpotsModule],
  controllers: [CollectionsController],
  providers: [CollectionsService]
})
export class CollectionsModule {}
