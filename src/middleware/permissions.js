const checkOwnership = (model) => async (req, res, next) => {
  try {
    const document = await model.findById(req.params.id);
    if (document.user.toString() !== req.user.id) {
      const error = new Error(
        "You don't have permissions to perform this action."
      );
      error.status = 403;
      return next(error);
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = checkOwnership;
