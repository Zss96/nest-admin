import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

@Injectable()
export class SharedService {
  generateUUID(): string {
    return nanoid();
  }
}
