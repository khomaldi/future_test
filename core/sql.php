<?php

require_once(ROOTDIR . 'vendor/rb-mysql.php');

$host = 'localhost';
$dbname = '';
$user = '';
$password = '';

R::setup("mysql:host=$host; dbname=$dbname", $user, $password);