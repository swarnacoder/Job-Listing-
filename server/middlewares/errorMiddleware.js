// errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong! Please try after some time.';
    const extraDetails = err.extraDetails || 'Error from the Backend';
  
    // Log the error (optional)
    console.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${extraDetails}`);
  
    // Send the error response
    return res.status(status).json({ message, extraDetails });
  };
  
  module.exports = errorMiddleware;
  