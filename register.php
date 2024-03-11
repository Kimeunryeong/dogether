<!-- register.php -->
<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 데이터베이스 연결 설정
    $servername = "localhost";
    $username = "admin";
    $password = "admin";
    $dbname = "dogether";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // 사용자 입력 값 가져오기
    $username = $_POST["username"];
    $password = $_POST["password"];

    // 중복 사용자 확인
    $check_duplicate = "SELECT id FROM users WHERE username='$username'";
    $duplicate_result = $conn->query($check_duplicate);

    if ($duplicate_result->num_rows > 0) {
        echo "Username already exists. Please choose a different username.";
    } else {
        // 새 사용자 등록
        $insert_user = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
        if ($conn->query($insert_user) === TRUE) {
            echo "Registration successful!";
        } else {
            echo "Error: " . $insert_user . "<br>" . $conn->error;
        }
    }

    $conn->close();
}
?>
