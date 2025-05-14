const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');



//Inscription

exports.registerUser = async (req, res) => {
    const { name, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({
            name,
            lastName,
            email,
            password: hashedPassword
        });
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// connection 
exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user =  await User.findOne({ email });
        if (!user) return res.status(404).json({message: "Utilisateur non trouve "});

        // verifier le mot de passe
        const  validPassword =  await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({message: "Mot de passe incorrect"});

        // generer le token
        const token = jwt.sign(
            {id: user._id, email: user.email },
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        res.json( {token});
    }catch(err) {
        res.status(500).json({error: 'Erreur serveur' });
    }
   
};


