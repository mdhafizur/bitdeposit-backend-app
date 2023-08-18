import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

const decimalCount = (num) => {
  // Convert to String
  const numStr = String(num);
  // String Contains Decimal
  if (numStr.includes('.')) {
    return numStr.split('.')[1].length;
  }
  // String Does Not Contain Decimal
  return 0;
};

export function IsDecimalNumber(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDecimalValue',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'number' && decimalCount(value) > 1; // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
