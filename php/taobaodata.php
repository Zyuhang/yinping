<?php
require "conn.php";

$result = $conn->query("select * from taobaogoods");

$taobaoarr = array();

for ($i = 0; $i < $result->num_rows; $i++) {
    $taobaoarr[$i] = $result->fetch_assoc();
}

echo json_encode($taobaoarr);
