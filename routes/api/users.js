const express = require('express')
const router = express.Router()
const {check,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const User  = require('../../models/User')
// GET api/users

router.post("/",[
    check('name','Name is required').not().isEmpty(),
    check('email','please provide valid email').isEmail(),
    check('password','please enter a password 6 or more char ').isLength({
        min: 6
    })
],async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { name, email, password } = req.body

    try {
        let user = await User.findOne({email})

        if(user) {
            res.status(400).json({ errors: [{msg: 'user already exists'}]})
        }

        const avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        //new user instacnce
        user = new User({
            email,
            name,
            avatar,
            password
        })

        //encrypt password
        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password,salt)

        await user.save()
        //Return JWT
        res.send('User registred')


    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Err ')
    }

    res.send('user route')
})


module.exports = router