import { getInterfaceMemberDefinition } from './get-interface-member-definition';
import { mapZodTypes } from './map-zod-types';
import type { ApiSchemas } from './types';

export const getTypesDefinitions = (schemas: ApiSchemas): string => {
  let types = '';

  for (const [typeName, schema] of Object.entries(schemas)) {
    const { properties, required, description, type } = schema;

    if (description) {
      types += `/**
 * ${description}
 */ \n`;
    }

    if (properties) {
      types += `export type ${typeName} = {\n`;
      for (const [propName, property] of Object.entries(properties)) {
        types += getInterfaceMemberDefinition(propName, required, property);
      }
      types += '}\n\n';
    } else if (type) {
      types += `export type ${typeName} = ${mapZodTypes(type)}\n\n`;
    }
  }

  return types;
};
