const validate = (schema, source = 'body') => (req, res, next) => {
  const data = req[source];

  const result = schema.safeParse(data);

  if (!result.success) {
    console.log("validation middleware: Invalid details");
    return res.status(400).json({
      success: false,
      error: result.error.format()
    });
  }

  req.validatedData = {
    ...req.validatedData,
    ...result.data
  };

  next();
};

module.exports = { validate };
