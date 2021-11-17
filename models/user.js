const mongooser = require('mongoose');


const userSchema = mongoose.schema({
  name : {
    type:String,
    maxlength: 50
  },
  email: {
    type: String,
    trip: true, //스페이스 없애주는역할
    unique: 1//같은 이름 사용하지 못함
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname : {
    type : String,
    maxlength: 50
  },
  role: { //관리자 등의 역할
    type: Number,
    degault: 0
  },
  image: String,
  token : { //유효성 판단하는 토큰
    type:String
  },
  tokenExp: { //토큰의 유효기간
    type: Number
  }
})

//스키마를 모델로 감싸줌
const User = mongoose.model('User', userSchema)

module.exposts = {User}
