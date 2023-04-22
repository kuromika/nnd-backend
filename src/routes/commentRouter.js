const router = require("express").Router();
const likeController = require("../controllers/likeController");
const commentController = require("../controllers/commentController");

router.get("/", commentController.getComments);
router.get("/:id", commentController.getComment);
router.put("/:id", commentController.updatePostComment);
router.delete("/:id", commentController.deletePostComment);

router.get("/:id/likes", likeController.getDocLikes("Comment"));
router.post("/:id/likes", likeController.createLike("Comment"));

module.exports = router;
