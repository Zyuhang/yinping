<?php
include "conn.php";

if(isset($_POST["username"])){
    $username = $_POST["username"];
    $res = $conn->query("select * from registry where username='$username'");
    if($res->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}

if (isset($_POST['username']) && isset($_POST['password'])){
    $username = $_POST['username'];
    $password = sha1($_POST['password']);
    $email = $_POST['email'];
    $conn->query("insert registry values(null,'$username','$password','$email',NOW())");
}