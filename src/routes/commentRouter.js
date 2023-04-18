const router = require("express").Router();
const commentController = require("../controllers/commentController");

router.get("/", commentController.getComments);
router.get("/:id", commentController.getComment);
router.put("/:id", commentController.updatePostComment);
router.delete("/:id", commentController.deletePostComment);

module.exports = router;
