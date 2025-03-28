<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "uniform_db";

$conn = new mysqli($host, $user, $pass, $dbname );

$METHOD = $_SERVER["REQUEST_METHOD"];
if($METHOD === "POST"){
    $stmt = $dbconn->prepare("SELECT user_id ,email,password FROM users WHERE BINARY email = ?");
    $usr = $_POST["username"];
    $password = $_POST["password"];
    if(!empty($usr) && !empty($password)){
	$stmt->bindValue(1, $usr);
	$stmt->execute();
	$row = $stmt->fetch(PDO::FETCH_ASSOC);
	if($row !== false){
	    $db_password = $row["password"];
	    if(password_verify($password,$db_password))
		die(
		    json_encode([
			"username" => $row["username"],
			"message" => "Correct Password",
			"code" => 200
		    ])
		);
	    
	    else
		die(
		    json_encode([
			"message" => "Wrong Password",
			"code" => 401
		    ])
		);
	    
	}
	else
	    die(
		json_encode([
		    "message" => "User does not exist.",
		    "code" => 401
		])
	    );
	
    }
    else
	die(
	    json_encode([	    
		"message" => "incomplete argument",
		"code" => "400"
	    ])
	);
    
}
else{
    die(
	json_encode([
	    "message" => "Invalid Method",
	    "code" => 405
	])
    );
}