<?php
    header("Content-Type: text/html; charset=UTF-8");

    $db_host = "localhost"; 
    $db_user = "admin"; 
    $db_passwd = "admin";
    $db_name = "dogether"; 
    
    // DB 연결
    $conn = mysqli_connect($db_host, $db_user, $db_passwd, $db_name);
    mysqli_query($conn,"set names utf8");
    
    // 연결 확인
    if (!$conn) {
        echo "DB연결 실패: " . mysqli_connect_error();
    } else {
        echo "DB연결 성공";
    }
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST["name"];
        $password = $_POST["password"];
    
        $sql = "SELECT id FROM users WHERE name = '$username' and password = '$password'";
        $result = $conn->query($sql);
    
        if ($result->num_rows > 0) {
            session_start();
            $_SESSION["name"] = $username;
            header("location: index.html");
        } else {
            $error = "아이디 또는 비밀번호가 잘못되었습니다.";
        }
    }
?>