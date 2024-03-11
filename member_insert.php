<?php
    $id   = $_POST["id"];
    $pass = $_POST["pass"];
    $name = $_POST["name"];
    $email = $_POST["email"];
    $tel = $_POST["tel"];
              
    $con = mysqli_connect("localhost", "admin", "admin", "dogether");

	$sql = "insert into users(id, email, username, password, password_check, mobile_tel)";
	$sql .= "values('$id', '$email', '$name', '$pass', '$pass', '$tel')";

	mysqli_query($con, $sql);  // $sql 에 저장된 명령 실행
    mysqli_close($con);     

    echo "
	      <script>
	          location.href = 'index.html';
	      </script>
	  ";
?>

   
