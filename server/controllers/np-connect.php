<?php

$GLOBALS['db'] = new mysqli("localhost", "root", "", "mojrokovnik_db");

if ($GLOBALS['db']->connect_error) {
    die("Connection failed: " . $GLOBALS['db']->connect_error);
}