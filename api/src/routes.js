
const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const SearchController = require('./controllers/SearchController');

const routes = express.Router();


const upload = multer(uploadConfig);

routes.get('/posts',PostController.index);
routes.post('/posts', upload.single('image'),PostController.store);
routes.post('/posts/:id/like', LikeController.store);
routes.delete('/posts/:id',PostController.delete);
routes.get('/search', SearchController.index);

export default routes;
