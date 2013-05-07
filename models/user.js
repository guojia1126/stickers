var mongoose = require('./db');

var userSchema = mongoose.Schema({
  email: String,
  nickname: String,
  password: String,
  regdate: { type: Date, default: Date.now },
  fans:[{email: String, nicknime: String}],
  follows:[{email:String, nicknime: String}],
  meta: {
    blogs: { type: Number, default: 0 },
    fans:  { type: Number, default: 0 },
    follows: { type: Number, default: 0 }
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User;