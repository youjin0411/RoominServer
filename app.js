// create database hotel;
// use hotel;
// create table hotelTable (
//     -> id int(30) not null auto_increment,
//     -> hotelname varchar(50) not null,
//     -> name varchar(50) NOT NULL,
//     -> password varchar(255) NOT NULL,
//     -> PRIMARY KEY(id)
//     -> ) charset=utf8;

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3333;

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'hotel',
  insecureAuth: true // 인증 모드 설정
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// POST 요청의 body 파싱을 위한 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 로그인 요청 처리
app.post('/login', (req, res) => {
  const { hotelname, username, password } = req.body;

  // MySQL에서 사용자 정보 확인
  const query = `SELECT * FROM hotelTable WHERE name = '${username}' AND password = '${password}'`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // 사용자 정보 확인 후 로그인 처리
    if (results.length > 0) {
      // 로그인 성공
      res.json({ message: 'Login successful' });
    } else {
      // 로그인 실패
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

// 회원가입 요청 처리
app.post('/signup', (req, res) => {
  const { hotelname, username, password } = req.body;

  // MySQL에서 중복된 사용자명 확인
  const query = `SELECT * FROM hotelTable WHERE name = '${username}'`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ' + err.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // 중복된 사용자명이 없을 경우 회원가입 처리
    if (results.length === 0) {
      // MySQL에 사용자 정보 저장
      const insertQuery = `INSERT INTO hotelTable (hotelname, name, password) VALUES ('${hotelname}', '${username}', '${password}')`;
      connection.query(insertQuery, (err, results) => {
        if (err) {
          console.error('Error executing MySQL query: ' + err.stack);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }

        // 회원가입 성공
        res.json({ message: 'Signup successful' });
      });
    } else {
      // 중복된 사용자명이 있을 경우 회원가입 실패
      res.status(400).json({ error: 'Username already exists' });
    }
  });
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
