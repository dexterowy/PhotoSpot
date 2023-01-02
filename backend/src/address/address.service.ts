import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { getDistanceBetween } from 'src/spots/helpers/getDistanceBetween';

@Injectable()
export class AddressService {
  async find(q: string) {
    const response = await axios.get(
      'https://nominatim.openstreetmap.org/search',
      {
        params: {
          format: 'json',
          q,
        },
      },
    );
    return response.data[0] || null;
  }
  async findAndGetDistance(q1: string, q2: string) {
    const {
      data: [p1],
    } = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        format: 'json',
        q: q1,
      },
    });
    const {
      data: [p2],
    } = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        format: 'json',
        q: q2,
      },
    });
    console.log(p1.lat, p2.lat);
    return getDistanceBetween(p1, p2);
  }
}
