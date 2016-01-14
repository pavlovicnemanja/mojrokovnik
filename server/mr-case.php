<?php

require_once 'controllers/np-connect.php';
require_once 'controllers/np-login.php';
require_once 'controllers/np-sanitize.php';
require_once 'controllers/np-database.php';

secure_session_start();

if (login_check($mysqli) == true) {

    function setCase($mysqli) {
        $params = array();
        $getters = sanitize($_GET, $mysqli);

        if (!empty($getters)) {
            $params = $getters;
            $table = "cases";
            
            $params['user_id'] = $_SESSION['user_id'];

            setDatabase($table, $params, $mysqli);
        }
    }

    function getCase($mysqli) {
        $params = array();
        $getters = sanitize($_GET, $mysqli);

        $sql = "SELECT * FROM cases";

        if (!empty($getters)) {
            $params = $getters;
        }
        
        $params['user_id'] = $_SESSION['user_id'];
        $params['case_delete'] = 0;

        getDatabase($sql, $params, $mysqli);
    }

    function updateCase($mysqli) {
        $params = array();
        $getters = sanitize($_GET, $mysqli);

        if (!empty($getters)) {
            $params = $getters;
            $table = "cases";
            $identifier = "case_id";
            $controller = "user_id = " . $_SESSION['user_id'];

            updateDatabase($table, $identifier, $controller, $params, $mysqli);
        }
    }

    function deleteCase($mysqli) {
            $params = array();
            $getters = sanitize($_GET, $mysqli);

            if (!empty($getters)) {
                $flag = 'case_delete';
                $table = "cases";
                $identifier = "case_id = " . $getters['case_id'];
                $controller = "user_id = " . $_SESSION['user_id'];

                markForDelete($table, $identifier, $controller, $flag, $mysqli);
            }
    }

    $method = sanitize($_SERVER['REQUEST_METHOD'], $mysqli);
    switch ($method) {
        case 'POST' : setCase($mysqli);
            break;
        case 'GET' : getCase($mysqli);
            break;
        case 'PUT' : updateCase($mysqli);
            break;
        case 'DELETE' : deleteCase($mysqli);
            break;
    }
} else {
    echo json_encode('You are not authorized to access this page, please login.');
}