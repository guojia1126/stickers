
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , post = require('./routes/post')
  , http = require('http')
  , path = require('path')
  , settings = require('./settings');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser(settings.cookieSecret));
app.use(express.methodOverride());
app.use(function(req, res, next){
  res.locals.user = req.cookies.user;
  console.log('error==='+req.cookies.error);
  var err = req.cookies.error;
  if(err){
    res.locals.error = err;
    res.clearCookie('error');
  }else{
    res.locals.error = null;
  }
  var succ = req.cookies.success;
  if(succ){
    res.locals.success = succ;
    res.clearCookie('success');
  }else{
    res.locals.success = null;
  }
  console.log(res.locals.user+"/"+res.locals.error+"/"+res.locals.success);
  next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.locals = settings.app;

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/u/:email', user.user);
app.get('/login', routes.login);
app.get('/signin', routes.signIn);
app.post('/signin', routes.doSignIn);
app.post('/login', routes.doLogin);
app.get('/signout', routes.signOut);
app.post('/post', function(req, res, next) {
  console.log(req.body);
  console.log(req.files);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
