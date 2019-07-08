<?php

include "db.php";

$username = trim($_POST['username']);


if(!empty($username) && isset($username)) {

	$query = "SELECT username FROM register WHERE username = '$username'";
	$run = mysqli_query($conn, $query);
	$total = mysqli_num_rows($run);

	if($total) {

		$user = ["status" => false, "msg" => "Username Already Exist", "disable" => true];

		echo json_encode($user);

	}

	else {

		$user = ["status" => true , "msg" => "Username Available", "disable" => false];

		echo json_encode($user);
	}
}

?>