const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');



const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true, //스페이스 없애주는역할
    unique: 1 //같은 이름 사용하지 못함
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: { //관리자 등의 역할
    type: Number,
    default: 0
  },
  image: String,
  token: { //유효성 판단하는 토큰
    type: String
  },
  tokenExp: { //토큰의 유효기간
    type: Number
  }
})

//user모델의 정보를 저장하기 전에 뭔갈한다!
userSchema.pre('save', function(next) {
  //비밀번호를 암호화 시킨다.
  var user = this

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err)

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err)
        user.password = hash
        next()
      })
    })
  }else{
    next()
  }

})

userSchema.methods.comparePassword = function(plainPassword, cb){
  bcrypt.compare(plainPassword, this.password, function(err, isMatch){
    if(err) return cb(err);
    cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function(cb){
  var user = this;
  //jsonwebtoken을 이용해서 token을 생성하기
  var token = jwt.sign(user._id.toHexString(), 'secretToken')

  user.token = token;
  user.save(function(err, user){
    if(err) return cb(err)
    cb(null, user)
  })
}

//스키마를 모델로 감싸줌
const User = mongoose.model('User', userSchema)

module.exports = {
  User
}
