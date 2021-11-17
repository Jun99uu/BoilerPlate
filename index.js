const express = require('express')
const app = express()
const port = 5000
const {User} = require('./models/User');

//bodyParser가 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해주는 것
// applicatinx/x-www-form-ulencoded로 분석해서 가져올 수 있게 해줌
app.use(express.urlencoded({extended: true}));
//application/json으로 분석해서 가져올 수 있게 해줌
app.use(express.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://rhon:wnsrb990614@boilerplate.v0nvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.post('/register', (req, res) =>{
  //회원 가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body)
//몽고db에서 오는 메소드 저장
  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({ //성공했음을 의미
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
