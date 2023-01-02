import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async find(@Query('q') q: string) {
    return await this.addressService.find(q);
  }

  @Get('distance')
  async getDistance(@Query('q1') q1: string, @Query('q2') q2: string) {
    return await this.addressService.findAndGetDistance(q1, q2);
  }
}
