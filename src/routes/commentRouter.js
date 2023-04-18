const router = require("express").Router();
const commentController = require("../controllers/commentController");

router.put("/:id", commentController.updatePostComment);

module.exports = router;
