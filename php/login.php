<?php
include "conn.php";

if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $result = $conn->query("select * from registry where username='$username' and password='$password'");
    if ($result->fetch_assoc()) {
        echo true;
    } else {
        echo false;
    }
}
