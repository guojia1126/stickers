
/*
 * GET home page.
 */
var User = require('../models/user'),
  myUtils = require('../myutils');

exports.index = function (req, res) {
  if(req.cookies.user){
    res.render('index');
  } else{
    res.render('hello');
  }

};

exports.signIn = function (req, res) {
  res.render('signin');
};


exports.doSignIn = function(req, res){
  console.log(req.body);
  //生成口令的散列值
  //var md5 = crypto.createHash('md5');
  var password = myUtils.getPassword(req.body.password);
  console.log(password);
  var user2reg = new User({
    email: req.body.email,
    nickname: req.body.nickname,
    password: password
  });


  //检查用户名是否已经存在了
  User.findOne({'email':user2reg.email}, function(err, user) {
    if(user)
      err = user.email+'此邮箱已经注册过.';
    if(err){
      res.cookie('error',err);
      console.log(err);
      return res.redirect('/signin');
    }
    user2reg.save(function(err){
      if(err) {
        res.cookie('error',err);
        console.log(err);
        return res.redirect('/signin');
      }
      res.cookie('user', user2reg);
      console.log(user2reg.email+'注册成功');
      res.cookie('success','注册成功');
      res.redirect('/');
    });
  });
};

exports.login = function (req, res) {
  res.render('login');
};

exports.doLogin = function (req, res) {
  var password = myUtils.getPassword(req.body.password);
  //查找用户
  User.findOne({'email':req.body.email,'password':password}, function(err, user) {
    if(err){
      res.cookie('error',err);
      console.log(err);
    }else if(user) {
      res.cookie('user',user);
      console.log(user.email+'登录了系统');
      //res.cookie('success','登录成功');
    }else{
      res.cookie('error','登录失败');
    }
    res.redirect('/');
  });
};

exports.signOut = function (req, res) {
  res.clearCookie('user');
  res.redirect('/');
};
