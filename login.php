<!-- login.php -->
<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 데이터베이스 연결 설정
    $servername = "localhost";
    $username = "jae";
    $password = "1596";
    $dbname = "test";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // 사용자 입력 값 가져오기
    $username = $_POST["username"];
    $password = $_POST["password"];

    // 입력 값으로 데이터베이스에서 사용자 확인
    $sql = "SELECT id, username, password FROM users WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // 로그인 성공
        $row = $result->fetch_assoc();
        $_SESSION["user_id"] = $row["id"];
        echo "Login successful!";
    } else {
        // 로그인 실패
        echo "Invalid username or password.";
    }

    $conn->close();
}
?>
