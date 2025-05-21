import { getMemberType } from './get-member-type';
import type { ApiConditionalUnionTypeDefinition, ApiTypeDefinition } from './types';

const getInterfaceMemberDescription = (property: ApiTypeDefinition) => {
  if (!property.description) {
    return '';
  }
  return `   /**
    * ${property.description}
    */
  `;
};

export const getInterfaceMemberDefinition = (
  propName: string,
  required: Array<string>,
  property: ApiConditionalUnionTypeDefinition,
  isInlineType = false,
): string => {
  const prop = `  ${propName}${required && required.includes(propName) ? '' : '?'}`;

  if ((property as { oneOf: ApiTypeDefinition[] }).oneOf) {
    return `${prop}: ${(property as { oneOf: ApiTypeDefinition[] }).oneOf
      .map(el => getMemberType(propName, el))
      .join(' | ')}${isInlineType ? ',' : ';'}`;
  }

  return `${getInterfaceMemberDescription(property as ApiTypeDefinition)}${prop}: ${getMemberType(propName, property as ApiTypeDefinition)};\n`;
};
