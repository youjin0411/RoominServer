<?php
error_reporting( E_ALL );
ini_set( "display_errors", 1 );
session_start();
$host = 'localhost';
$user = 'root';
$pw = '1234';
$db_name = 'hotel';
$conn = mysqli_connect($host, $user, $pw, $db_name);
$signup_id = $_POST['id'];
$signup_pass = $_POST['pw'];
$signup_hotelname = $_POST['hotelname'];
$sql = "INSERT INTO hotellogin VALUES ('$signup_hotelname', '$signup_id', '$signup_pass')";

if ($signup_id == "" ||  $signup_pass == "" || $signup_hotelname == "") {
   echo '<script>alert("비어있는 항목이 있습니다.");</script>';
   echo '<script>history.back();</script>';
}

else {
   mysqli_query($conn, $sql);
   echo '<script>alert("회원 가입이 완료되었습니다.");</script>';
   echo "<script>location.replace('login.html');</script>";
}
?>