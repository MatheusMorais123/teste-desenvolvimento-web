const Post = require('../models/Post');

module.exports = {
    async index(request, response) {

        const name = request.query.name
        const post = await Post.find({ name })

        return response.json(post);
    }
};