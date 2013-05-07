var mongoose = require('./db');

var blogSchema = mongoose.Schema({
  title:  String,
  author: String,
  authorEmail: String,
  body: String,
  img: Buffer,
  comments: [{author: String, body: String, date: Date }],
  postTime: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: { type: Number, default: 0 },
    favs: { type: Number, default: 0 }
  }
});

var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;