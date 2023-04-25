import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../constant/decorator.constant';

//不进行jwt校验
export const Public = () => SetMetadata(PUBLIC_KEY, true);
