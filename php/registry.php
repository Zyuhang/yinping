<?php
include "conn.php";


if(isset($_GET["username"])){
    $username = $_GET["username"];
    $res = $conn->query("select * from registry where username='$username'");
    if($res->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}

if (isset($_GET['username']) && isset($_GET['password'])){
    $username = $_GET['username'];
    $password = sha1($_GET['password']);
    $email = $_GET['email'];
    $conn->query("insert registry values(null,'$username','$password','$email',NOW())");
    header('location:http://localhost/JS-2002/project/src/login.html');
}