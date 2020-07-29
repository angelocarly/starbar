import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export const MatchesProperty = (property: string, validationOptions?: ValidationOptions) => {
	return (object: Object, propertyName: string): void => {
		registerDecorator({
			name: "matchesProperty",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: string, args: ValidationArguments) {
					const [relatedPropertyName] = args.constraints;
					const relatedProperty = (args.object as never)[relatedPropertyName];
					return value === relatedProperty;
				}
			}
		});
	};
};
