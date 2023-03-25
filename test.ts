import 'reflect-metadata';

// 内置的三种元数据
function Type(type) {
  return (target) => {
    console.log('target', target);
    return Reflect.metadata('design:type', type);
  };
}
function ParamTypes(...types) {
  return Reflect.metadata('design:paramtypes', types);
}
function ReturnType(type) {
  return Reflect.metadata('design:returntype', type);
}

// Decorator application
@ParamTypes(String, Number)
export class B {
  constructor(text, i) {}

  @Type(String)
  get name() {
    return 'text';
  }

  @Type('type1')
  @ParamTypes('ParamTypes1', 'ParamTypes1')
  @ReturnType('ReturnType')
  // @Type(Function)
  // @ParamTypes(Number, Number)
  // @ReturnType(Number)
  @Type(1)
  add(x, y) {
    return x + y;
  }
}

// Metadata introspection
const inst = new B('a', 1);

const constructorParamTypes = Reflect.getMetadata('design:paramtypes', B);
const type = Reflect.getMetadata('design:type', inst, 'add');
const paramTypes = Reflect.getMetadata('design:paramtypes', inst, 'add');
const returnType = Reflect.getMetadata('design:returntype', inst, 'add');

console.log(constructorParamTypes);
console.log(type);
console.log(paramTypes);
console.log(returnType);

// [ [Function: String], [Function: Number] ]
// [Function: Function]
// [ [Function: Number], [Function: Number] ]
// [Function: Number]
