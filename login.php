<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="header.css">
    <link rel="stylesheet" type="text/css" href="init.css">
    <title>로그인</title>
</head>
<body>
    <?php
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
    ?>
</body>
</html>