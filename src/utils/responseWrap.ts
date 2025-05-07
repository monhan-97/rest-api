enum ResponseType {
  Success = 'Success',
  Fail = 'Fail',
}

const responseWrap = <T>(
  data: T,
  type: ResponseType = ResponseType.Success,
  message = 'success',
) => {
  return {
    code: type === ResponseType.Success,
    data: data,
    message: message,
  };
};

export default responseWrap;
