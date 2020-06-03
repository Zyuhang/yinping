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

if(isset($_GET["password"])){
    $password = $_GET["password"];
    $res = $conn->query("select * from registry where password='$password'");
    if($res->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}