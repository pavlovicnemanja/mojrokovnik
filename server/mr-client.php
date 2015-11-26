<?php

require_once 'controllers/np-connect.php';
require_once 'controllers/np-login.php';
require_once 'controllers/np-sanitize.php';
require_once 'controllers/np-database.php';

secure_session_start();

if (login_check($mysqli) == true) {

    function getClient($mysqli) {
        $params = array();
        $getters = sanitize($_GET, $mysqli);

        $sql = "SELECT * FROM clients";

        if (!empty($getters)) {
            $params = $getters;
        }

        getDatabase($sql, $params, $mysqli);
    }

    function setClient($mysqli) {
        $params = array();
        $getters = sanitize($_GET, $mysqli);

        if (!empty($getters)) {
            $params = $getters;
            $table = "clients";

            setDatabase($table, $params, $mysqli);
        }
    }

    function updateClient($mysqli) {
    }

    function deleteClient($mysqli) {
    }

    $method = sanitize($_SERVER['REQUEST_METHOD'], $mysqli);
    switch ($method) {
        case 'POST' : setClient($mysqli);
            break;
        case 'GET' : getClient($mysqli);
            break;
        case 'PUT' : updateClient($mysqli);
            break;
        case 'DELETE' : deleteClient($mysqli);
            break;
    }
} else {
    echo json_encode('You are not authorized to access this page, please login.');
}