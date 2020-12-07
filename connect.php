<?php
require_once 'credentials.php';

//I am using a Postgres Database; the Odin server uses MariaDB
//so I use "pgsql:" instead of "mysql:"

$dsn = "mysql:host=$host;dbname=$db;";//charset=$charset";

	try{
		//$myPDO =
		$pdo = new PDO($dsn, $user, $pass);
		echo 'Hello Database';

	} catch(PDOException $e) {
		echo "<h1>NO DATABASE FOUND</h1>";
		echo $e->getMessage();

	}

?>