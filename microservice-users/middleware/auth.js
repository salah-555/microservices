const jwt = require('jsonwebtoken');

module.exports =  function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({message: "Token manquant"});

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.user = decoded; // Ajoute l'utilisateur décodé à la requête
        next();
    }catch (err) {
        return res.status(401).json({message: "Token invlaide"})
    }
};