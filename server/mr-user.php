<?php

require_once 'controllers/np-connect.php';
require_once 'controllers/np-login.php';
require_once 'controllers/np-database.php';

secure_session_start();

if (login_check($mysqli) == true) {
    $user_id = $_SESSION['user_id'];

    $sql = "SELECT 
                user_name, 
                user_surname,
                user_address,
                user_city,
                user_state,
                user_phone,
                user_email,
                user_accountNumber,
                user_username,
                user_pictureUrl,
                user_createdDate,
                user_editedDate,
                user_accountType,
                user_status
            FROM users";

    $params = array(
        'user_id' => $user_id
    );

    getDatabase($sql, $params, $mysqli);
} else {
    return false;
}