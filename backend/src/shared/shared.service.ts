import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

@Injectable()
export class SharedService {
  //生成uuid
  generateUUID(): string {
    return nanoid();
  }
  //生成树
  public handleTree(
    data: any[],
    id?: string,
    parentId?: string,
    children?: string,
  ) {
    const config = {
      id: id || 'id',
      parentId: parentId || 'parentId',
      childrenList: children || 'children',
    };

    const childrenListMap = {};
    const nodeIds = {};
    const tree = [];

    for (const d of data) {
      const parentId = d[config.parentId];
      if (childrenListMap[parentId] == null) {
        childrenListMap[parentId] = [];
      }
      nodeIds[d[config.id]] = d;
      childrenListMap[parentId].push(d);
    }

    for (const d of data) {
      const parentId = d[config.parentId];
      if (nodeIds[parentId] == null) {
        tree.push(d);
      }
    }
    console.log('tree', tree);
    for (const t of tree) {
      adaptToChildrenList(t);
    }
    function adaptToChildrenList(o) {
      if (childrenListMap[o[config.id]] !== null) {
        o[config.childrenList] = childrenListMap[o[config.id]];
      }
      if (o[config.childrenList]) {
        for (const c of o[config.childrenList]) {
          adaptToChildrenList(c);
        }
      }
    }
    return tree;
  }
}
