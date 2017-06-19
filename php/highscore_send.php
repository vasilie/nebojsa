<?php

require "mysql_connection.php";

// select the db name
mysqli_select_db( $db, $database);

if (isset($_REQUEST['score'])){
	$score = $_REQUEST['score'];
	$name = $_REQUEST['name'];


	$sql2 = "INSERT INTO `$database`.`highscores` (`id`, `name`, `score`) VALUES (NULL, '$name', '$score')";
	mysqli_query($db, $sql2);
}

?>