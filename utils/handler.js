const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message, 
      error: error.message 
    });
  };
  
  const handleSuccess = (res, data, message = 'Request successful') => {
    res.status(200).json({
      success: true,
      message,
      data
    });
  };
  
  module.exports = { handleError, handleSuccess };
  