<?php

require "mysql_connection.php";



// select the db name
mysqli_select_db($db, $database);

// enter your sql query
$sql = "SELECT * FROM highscores WHERE score > 0 ORDER BY score desc LIMIT 10";
// Creates temp array variable
$temp = array();

// Gets table details
$result = mysqli_query($db, $sql);
// var_dump($result);
// Adds each records/row to $temp
while($row=mysqli_fetch_row($result)) {
    $temp[] = $row;


}
// Formats json from temp and shows/print on page

 echo json_encode($temp);

?>