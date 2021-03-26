const express = require('express')
const router = express.Router()

// GET api/auth

router.get('/',(req,res) => res.send('auth Route'))


module.exports = router