import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { SpotsModule } from './spots/spots.module';
import { PhotosModule } from './photos/photos.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CollectionsModule } from './collections/collections.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    SpotsModule,
    PhotosModule,
    ReviewsModule,
    CollectionsModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
