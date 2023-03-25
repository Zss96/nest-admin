import 'reflect-metadata';
// import { SetMetadata } from '@nestjs/common';

export const Excel = (option: string[]) => {
  return (target: any, propertyKey: string | symbol) => {
    const old = Reflect.getMetadata();
  };
};
