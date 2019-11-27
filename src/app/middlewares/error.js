
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

/**
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const handleError = (err, req, res, next) => {
  const { statusCode, message } = err;
  return res.status(statusCode || 500).json({ error: message });
};
