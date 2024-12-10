const httpStatus = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  ERROR: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
};

type HttpStatusKeys = keyof typeof httpStatus;

const checkStatus = (status: HttpStatusKeys) => httpStatus[status] || 500;

export {checkStatus, HttpStatusKeys};