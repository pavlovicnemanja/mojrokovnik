<?php

require_once 'controllers/np-connect.php';
require_once 'controllers/np-login.php';


secure_session_start(); // Our custom secure way of starting a PHP session.
 
if (isset($_POST['email'], $_POST['password'])) {
    $email = $_POST['email'];
    $password = hash('sha512', $_POST['password']); // The hashed password.
 
    if (login($email, $password, $mysqli) == true) {
        // Login success 
        return true;
    } else {
        // Login failed 
        return false;
    }
} else {
    // The correct POST variables were not sent to this page. 
    return 'Invalid Request';
}