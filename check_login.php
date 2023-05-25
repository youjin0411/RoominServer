<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title></title>
</head>
<body>
   <?php
   session_start();
   $host = 'localhost';
   $user = 'root';
   $pw = '1234';
   $db_name = 'hotel';
      $mysqli = new mysqli($host, $user, $pw, $db_name); //db 연결
      
      //login.php에서 입력받은 id, password
      $username = $_POST['id'];
      $userpass = $_POST['pw'];
      
      $q = "SELECT * FROM hotellogin WHERE name = '$username' AND password = '$userpass'";
      $result = $mysqli->query($q);
      $row = $result->fetch_array(MYSQLI_ASSOC);
      
      //결과가 존재하면 세션 생성
      if ($row != null) {
         $_SESSION['username'] = $row['id'];
         $_SESSION['name'] = $row['name'];
         echo "<script>location.replace('index.php');</script>";
         exit;
      }
      
      //결과가 존재하지 않으면 로그인 실패
      if($row == null){
         echo "<script>alert('Invalid username or password')</script>";
         echo "<script>location.replace('login.html');</script>";
         exit;
      }
      ?>
   </body>