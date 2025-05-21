import { getArrayMemberType } from './get-array-member-type';
import { getInlineTypeDefinition } from './get-inline-type-definition';
import { getSchemaName } from './get-schema-name';
import type { ApiTypeDefinition } from './types';
import { mapZodTypes } from './map-zod-types';

export const getMemberType = (
  propName: string,
  property: ApiTypeDefinition,
): string | undefined => {
  if (property.$ref) {
    return `${getSchemaName(property.$ref)}`;
  }

  if (property.type) {
    if (property.type === 'object' && property.properties && property.required) {
      return getInlineTypeDefinition(property as never);
    }

    if (property.type === 'array' && property.items) {
      return getArrayMemberType(propName, property as never);
    }

    if (property.enum) {
      return property.enum.map(el => `'${el}'`).join(' | ');
    }

    return mapZodTypes(property.type);
  }

  return undefined;
};
