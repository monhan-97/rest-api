export enum ResponseType {
  Success = 'Success',
  Fail = 'Fail',
}

export type ResponseDataType<T> = {
  code: number;
  data: T;
  message: string;
};

export const response = <T>(
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
