class BaseController {
  //  method for success responses
  success(res, message, data, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message: message,
      data: data
    });
  }

  //  method for error responses
  error(res, message, statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message: message
    });
  }
}

export default BaseController;
