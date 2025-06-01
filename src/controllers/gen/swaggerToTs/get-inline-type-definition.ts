import { getInterfaceMemberDefinition } from './get-interface-member-definition';
import type {
  ApiConditionalUnionTypeDefinition,
  ApiTypeDefinition,
  WithRequiredProperty,
} from './types';

export const getInlineTypeDefinition = (
  property: WithRequiredProperty<ApiTypeDefinition, 'properties' | 'required'>,
): string => {
  let type = '{\n';

  for (const [objectPropName, objectProperty] of Object.entries(property.properties)) {
    type += `${getInterfaceMemberDefinition(
      objectPropName,
      property.required,
      objectProperty as ApiConditionalUnionTypeDefinition,
      true,
    )}`;
  }

  type += '}';

  return type;
};
