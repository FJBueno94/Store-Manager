const errorMiddleware = (err, _req, res, _next) => {
  if (err.isJoi) {
    const [code, message] = err.message.split('|');
    return res.status(code).json({ message });
  }

  const statusByErrorCode = {
    notFound: 404,
  };

  const status = statusByErrorCode[err.code] || 500;

  res.status(status).json({ message: err.message });
};

module.exports = errorMiddleware;