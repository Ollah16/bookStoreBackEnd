const express = require('express')
const { handleAddBook,
    handleAllBooks,
    handleDelete,
    handleSearch,
    handleSaveChanges,
    handleCancel,
    handleViewMore,
    handleBookEdit } = require('../contoller/storeControl')

const router = express.Router()
const jwt = require("jsonwebtoken")
const jwtSecretKey = process.env.MyJwt
const multer = require('multer')
const jwtMiddleWare = async (req, res, next) => {
    let { authorization } = req.headers
    let [, myJwt] = authorization.split(' ')
    let userId = await jwt.verify(myJwt, jwtSecretKey)
    if (userId) {
        req.userId = userId
        next()
    }
    else {
        res.send('Cannot Execute Request')
    }
}
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
        cb(null, true);
    } else {
        req.error = { message: 'File not supported' };
        cb(null, false);
    }
};
const upload = multer({ storage, fileFilter })

router.post("/addbook", jwtMiddleWare, upload.single('cover'), handleAddBook)
router.get("/allbooks", handleAllBooks)
router.get("/viewmore/:bookId", handleViewMore)
router.delete("/delete/:bookId", jwtMiddleWare, handleDelete)
router.patch("/edit/:bookId", jwtMiddleWare, handleBookEdit)
router.patch("/save/:bookId", jwtMiddleWare, upload.single('cover'), handleSaveChanges)
router.patch('/cancel/:bookId', jwtMiddleWare, handleCancel)
router.get("/searchBook/:bookTitle", handleSearch)

module.exports = router
