
export class ErrorHandler extends Error {
  /**
   *
   * @param {*} statusCode
   * @param {*} message
   */
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err, req, res, next) => {
  const { statusCode, message } = err;
  console.log(err);
  return res.status(statusCode || 400).json({ error: message });
};
