import { SetMetadata } from '@nestjs/common';
import { LogicalEnum } from '../emums/logical.enum';
import { PERMISSION_KEY_METADATA } from '../constant/decorator.constant';

export type Permis = {
  permArr: string[];
  logical: LogicalEnum;
};

export const ReqPerm = (perms: string | string[], logical: LogicalEnum) => {
  let permsObj = {} as Permis;

  if (typeof perms === 'string') {
    permsObj = {
      permArr: [perms],
      logical,
    };
  } else if (perms instanceof Array) {
    permsObj = {
      permArr: perms,
      logical,
    };
  }
  return SetMetadata(PERMISSION_KEY_METADATA, permsObj);
};
