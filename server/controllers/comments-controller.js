const { CREATE_SUCCESS, DELETE_SUCCESS } = require("../utils/consts");
const CommentService = require("../services/comments-service");

const create = async (req, res, next) => {
    try {
        const { text, owner, productId, userId } = req.body
        await CommentService.create(text, owner, productId, userId);
        res.json(CREATE_SUCCESS);
    } catch (error) {
        console.log(error)
        next(error)
    }
}
const getAll = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comments = await CommentService.getAll(id)
        console.log(comments)
        res.json(comments)
    } catch (error) {
        console.log(error)
        next(error)
    }
}
const update = async (req, res, next) => {
    try {
        const { text } = req.body;
        const { id } = req.params;
        await CommentService.update(id, text);
        res.json({ message: 'comment successfuly changed' });
    } catch (error) {
        console.log(error)
        next(error)
    }
}
const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params
        await CommentService.deleteOne(id)
        res.json({ message: DELETE_SUCCESS })
    } catch (error) {
        console.log(error);
        next(error)
    }
}
const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comment = await CommentService.getOne(id);
        res.json(comment);
    } catch (error) {
        console.log(error);
        next(error)
    }
}
module.exports = {
    create,
    getAll,
    update,
    deleteOne,
    getOne
}