// users_route.js
const bcrypt = require('bcryptjs');
const User = require('../models/user_model');
const express = require("express");
const router = express.Router();
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const jwt = require('jsonwebtoken');
const passport = require('passport');



router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
      id: req.user.id,
      handle: req.user.handle,
	  email: req.user.email,
	  passsword: req.user.password
    });
  })


router.post('/register', (req, res)=>{
	const { errors, isValid} = validateRegisterInput(req.body);

	if (!isValid){
		return res.status(400).json(errors);
	};

	User.findOne({email: req.body.email})
		.then(user => {
			if (user){
				errors.email = 'email already exists';

				return res.status(404).json(errors);
			}else{
				const newUser = new User({
					handle: req.body.handle,
					email: req.body.email,
					password: req.body.password
				});
				newUser
				.save()
				.then(user => res.json(user))
				.catch(err => console.log(err));
			}
		
		})
});

router.post('/login', (req, res)=> {
	const { errors, isValid} = validateLoginInput(req.body);
	if (!isValid){
		return res.status(400).json(errors);
	};

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({email})
		.then(user => {
			if (!user) {
				 errors.email = 'User not found';
				return res.status(404).json(errors);
			}
			bcrypt.compare(password, user.password)
			.then(isMatch => {
				if (isMatch){
				const payload = {id: user.id, name: user.name};
				jwt.sign(
					payload,
					keys.secretOrKey,
					{expiresIn: 3600},
					(err, token)=>{
						res.json({
							success: true,
							token: 'Bearer ' + token
						});
					});
			}else{
				return res.status(400).json({password: 'Incorrect password'});
			}
		})
	})
});




module.exports = router;
