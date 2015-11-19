<?php

require_once 'np-connect.php';
require_once 'np-sanitize.php';

/*
 * Setter for database functions
 * 
 * @param {string} $sql
 */

function setterDatabase($sql) {
    if ($GLOBALS['db']->query($sql) === TRUE) {
        echo 'Total rows updated: ' . $GLOBALS['db']->affected_rows;
    } else {
        echo $GLOBALS['db']->errno;
        echo "\nError creating table: " . $GLOBALS['db']->error;
    }
}

/*
 * Getter for database functions
 * 
 * @param {string} $sql
 */

function getterDatabase($sql) {
    $result = $GLOBALS['db']->query($sql);
    $rows = array();

    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }

//    $rows['params'] = sanitize($_GET);

    header('Content-Type: application/json');
    echo json_encode($rows);
}


/*======================================================
    SPECIFIC FUNCTIONS FOR PREPOPULATIONS
=======================================================*/