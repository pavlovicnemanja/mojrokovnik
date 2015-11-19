<?php

require_once 'controllers/np-database.php';

function getClients() {
    $sql = "SELECT * FROM clients";
    
    getterDatabase($sql);
}

getClients();

$GLOBALS['db']->close();