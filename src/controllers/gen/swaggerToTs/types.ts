/* eslint-disable no-use-before-define */

export type ApiRouteParameter = {
  name: string;
  required: boolean;
  in: 'path';
  schema: ApiTypeDefinition;
};

export type ApiConditionalUnionTypeDefinition =
  | ApiTypeDefinition
  | { oneOf: ApiTypeDefinition[] }
  | { payload: ApiTypeDefinition };

export type ApiTypeDefinition = {
  type?: string;
  $ref?: string;
  properties?: ApiConditionalUnionTypeDefinition;
  items?: ApiTypeDefinition;
  required?: string[];
  enum?: string[];
  description?: string;
};

export type ApiSchemas = Record<
  string,
  {
    type: string;
    properties: Record<string, ApiConditionalUnionTypeDefinition>;
    required: string[];
    description?: string;
  }
>;

export type ApiOperation = {
  operationId: string;
  summary: string;
  description: string;
  parameters: ApiRouteParameter[];
  requestBody: ApiContent & { required: boolean };
  responses: Record<string, ApiContent & { description: string }>;
};

export type Verbs = 'get' | 'post' | 'put' | 'delete';

export type ApiPath = Record<Verbs, ApiOperation>;

export type ValidatedOpenaApiSchema = {
  paths: ApiPath[];
  components: {
    schemas: ApiSchemas;
  };
};

export type ApiContent = {
  content: {
    'application/json': {
      schema: ApiConditionalUnionTypeDefinition;
    };
  };
};

export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};
