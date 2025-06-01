import { getInlineTypeDefinition } from './get-inline-type-definition';
import { getSchemaName } from './get-schema-name';
import type { ApiTypeDefinition, WithRequiredProperty } from './types';

export const getArrayMemberType = (
  propName: string,
  property: WithRequiredProperty<ApiTypeDefinition, 'items'>,
): string | undefined => {
  if (property.items.$ref !== undefined) {
    return `${getSchemaName(property.items.$ref)}[]`;
  }

  if (property.items.type === 'object' && property.items.properties && property.items.required) {
    return `${getInlineTypeDefinition(property.items as never)}[]`;
  }

  if (property.items.type !== undefined) {
    return `${property.items.type}[]`;
  }

  return undefined;
};
