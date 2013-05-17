var Blog = require('../models/sticker');

exports.post = function (req, res) {
  console.log('req.body===='+req.body);
  console.log('files===='+req.files);
//  var currentUser = req.cookies.user;
//  var blog = new Blog({ title: "测试标题", author: currentUser.nickname, authorEmail: currentUser.email });
//  blog.body = "我是文章啊~~~";
//  blog.img = new Buffer("adfasd");
//  blog.hidden = false;
//  console.log(blog);
//  blog.save(function (err) {
//    if (err) {
//      res.cookie('error', err);
//      return res.redirect('/');
//    }
//    res.cookie('success', '发表成功');
    res.redirect('/');
//    res.redirect('/u/' + currentUser.name);
//  });
};