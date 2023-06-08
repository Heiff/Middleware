const { Router } = require('express')
const router = Router()
const {authenticateJWT} = require('../controller/admin.js')
const {DeleteComment,getAllComment,PostComment} = require('../controller/comments.js')

router.get('/',authenticateJWT,getAllComment)
router.delete('/',authenticateJWT,DeleteComment)
router.post('/',PostComment)


module.exports = router