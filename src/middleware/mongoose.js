const findDocument = (model) => async (req, res, next) => {
  try {
    const document = await model.findById(req.params.id);
    if (!document) {
      const error = new Error("Document not found");
      error.status = 404;
      return next(error);
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = findDocument;
