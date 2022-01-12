const router = require("express").Router();

// const { auth } = require("../middlewares/auth-middleware");
const CommentController = require("./../controllers/comments-controller");

router.post("/create", CommentController.create);
router.get("/:id", CommentController.getAll);
router.patch("/:id", CommentController.update);
router.delete("/:id", CommentController.deleteOne);
router.get("/get/:id", CommentController.getOne);

module.exports = router;