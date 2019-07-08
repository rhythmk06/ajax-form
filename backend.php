<?php 

include "db.php";

$firstname = trim($_POST['firstname']);
$username = trim($_POST['username']);
$email = trim($_POST['email']);
$submit = trim($_POST['submit']);

$validate = [];
$data = [];


if(isset($_POST['submit']) && !empty($submit)) {

	if(!empty($firstname) && !empty($username) && !empty($email)) {

		$sql = "INSERT INTO register (firstname, username, email) VALUES ('$firstname', '$username', '$email')";

		if (mysqli_query($conn, $sql)) {
		    
			$data = ["status" => true, "msg" => '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Success! Data Inserted Successfully.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'];

			echo json_encode($data);

			exit();

		} 

		else {

		    $data = ["status" => false, "msg" => "Some Error occured"];

			echo json_encode($data);

			exit();
		}
	}

	else {

		$validate["status"] = "empty";

		if(empty($firstname)){

			$validate["fname_err"] = "Firstname required";
		}

		if(empty($username)){

			$validate["uname_err"] = "Username required";
		}

		if(empty($email)){

			$validate["email_err"] = "Email required";
		}

		echo json_encode($validate);

		exit();

	}

}

?>