const express = require('express');
const router = express.Router();
const userConroller = require('../controllers/UserController');
const auth = require('../middleware/auth');
const UserModel = require('../models/User');



// GET /users/public/:id
router.get('/public/:id',auth,  async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({message: "Utilisateur non trouve "});
        res.json(user);
    }catch (err) {
        res.status(500).json({message: err.message});
    }
});


// Routes pour REGISTER ET login 
router.post('/register', userConroller.registerUser);
router.post('/login', userConroller.loginUser);


module.exports = router;
