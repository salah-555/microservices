const Article  =   require('../models/Article');
const axios = require('axios');


// Gerer les articles 
exports.createArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({message: error.message });
    }
};

// Recupere tous les articles 
exports.getAllArticles = async (req, res) => {
    const articles = await Article.find();
    res.json(articles);
};

// Recupere un article par son id
exports.getArtcileById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({message: "Article non tourve"});
        
        // prepare les headers pour Axios
        const headers = {};
        if (req.headers.authorization) {
            headers.authorization = req.headers.authorization;
        }
        
        // Appel Http vers Users service 
        const userResponse = await axios.get(`http://localhost:5002/api/users/public/${article.userId}`, 
            {
                headers
            });
        const user = userResponse.data;

        // Retourne l'article avec infos auteur 
        res.json({
            ...article.toObject(),
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }catch (err) {
        res.status(500).json({message: "Erreur serveur" + err.message});
    }
};

// Metre a jour u article 
exports.updateArticle = async (req, res) => {
    const article = await Article.findByIdAndUpdate(req,params.id, req.body, {new: true});
    if (!article) return res.status(404).json({message: "Article non trouve !"});
    res.json(article);
};
//Suppremer un article 
exports.deleteArticle = async (req, res) => {
    const article = await Article.findByIdAndDelete(req.params.id)
    if (!article) return res.status(404).json({message: "Article non trouve !"});
    res.json({message: "Article supprime avec seuccès !"});

}
