const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },
    async delete(req, res) {


        await Post.deleteOne({ _id: req.params.id }, (err) => {

            if (err) return res.status(400).json({
                error: true,
                message: "Error: Pokemon não foi apagado com sucesso!"
            });


            return res.json({
                error: false,
                message: "Pokemon apagado com sucesso!"
            });
        });

    },
    async store(req, res) {
        const { name, description, force, attack } = req.body;
        const { filename: image } = req.file;
        const fileName = `${name}.jpg`;
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )
        fs.unlinkSync(req.file.path);
        const post = await Post.create({
            name,
            description,
            force,
            attack,
            image: fileName,
        });
        return res.json(post);
    }
};