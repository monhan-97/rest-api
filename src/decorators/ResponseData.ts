export enum ResponseType {
  Success = 'Success',
  Fail = 'Fail',
}

export type ResponseDataType<T> = {
  code: number;
  data: T;
  message: string;
};

const genResponseData = <T>(
  data: T,
  type: ResponseType = ResponseType.Success,
  message = 'success',
) => {
  return {
    code: type === ResponseType.Success ? 0 : -1,
    data: data,
    message: message,
  };
};

/**
 * Decorator to wrap a response with a successful response
 * @param response Response to wrap
 * @returns A function to wrap the response
 */
export function ResponseData() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        const data = await originalMethod.apply(this, args);
        return genResponseData(data);
      } catch (error) {
        if (error instanceof Error) {
          return genResponseData(undefined, ResponseType.Fail, error.message);
        }
        return error;
      }
    };

    return descriptor;
  };
}
