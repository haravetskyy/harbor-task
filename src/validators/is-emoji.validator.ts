import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsEmojiConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string): boolean {
    const emojiRegex =
      /\p{Extended_Pictographic}/u;
    return (
      typeof value === 'string' &&
      emojiRegex.test(value)
    );
  }

  defaultMessage(): string {
    return 'Value must be a valid emoji';
  }
}

export function IsEmoji(
  validationOptions?: ValidationOptions,
) {
  return function (
    object: Object,
    propertyName: string,
  ) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmojiConstraint,
    });
  };
}
