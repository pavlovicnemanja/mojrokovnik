<?php

require_once 'np-connect.php';
require_once 'np-database.php';

function usersCreateTable($mysqli) {
    $sql = "CREATE TABLE IF NOT EXISTS users (
            user_id                 int(11) NOT NULL AUTO_INCREMENT,
            user_name               varchar(32) CHARACTER SET utf8 NOT NULL,
            user_surname            varchar(32) CHARACTER SET utf8 NOT NULL,
            user_address            varchar(64) CHARACTER SET utf8 DEFAULT '(nije uneto)',
            user_city               varchar(32) CHARACTER SET utf8 DEFAULT '(nije uneto)',
            user_state              varchar(32) CHARACTER SET utf8 DEFAULT '(nije uneto)',
            user_phone              varchar(32) CHARACTER SET utf8 DEFAULT '(nije uneto)',
            user_email              varchar(64) CHARACTER SET utf8 NOT NULL,
            user_accountNumber      varchar(64) CHARACTER SET utf8 DEFAULT NULL,
            user_username           varchar(64) CHARACTER SET utf8 NOT NULL,
            user_password           char(128) CHARACTER SET utf8 NOT NULL,
            user_passwordSalt       char(128) CHARACTER SET utf8 NOT NULL,
            user_pictureUrl         varchar(128) CHARACTER SET utf8 NOT NULL,
            user_createdDate        timestamp NOT NULL,
            user_editedDate         timestamp NOT NULL,
            user_accountType        varchar(32) CHARACTER SET utf8 DEFAULT NULL,
            user_activationCode     varchar(32) CHARACTER SET utf8 DEFAULT NULL,
            user_status             int(11) DEFAULT NULL,
            PRIMARY KEY (user_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

    setDatabase($sql, $mysqli);
}

function loginAttemptsCreateTable($mysqli) {
    $sql = "CREATE TABLE IF NOT EXISTS login_attempts (
            user_id     int(11) DEFAULT NULL,
            time        varchar(30) NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
    
    setDatabase($sql, $mysqli);
}

function clientCreateTable($mysqli) {
    $sql = "CREATE TABLE IF NOT EXISTS clients (
            client_id               int(11) NOT NULL AUTO_INCREMENT,
            user_id                 int(11) DEFAULT NULL,
            client_name             varchar(32) CHARACTER SET utf8 NOT NULL,
            client_surname          varchar(32) CHARACTER SET utf8 NOT NULL,
            client_address          varchar(64) CHARACTER SET utf8 DEFAULT NULL,
            client_city             varchar(32) CHARACTER SET utf8 NOT NULL,
            client_state            varchar(32) CHARACTER SET utf8 NOT NULL,
            client_citizenship      varchar(64) CHARACTER SET utf8 NOT NULL,
            client_phone            varchar(32) CHARACTER SET utf8 NOT NULL,
            client_email            varchar(64) CHARACTER SET utf8 DEFAULT NULL,
            client_socialNumber     varchar(13) CHARACTER SET utf8 DEFAULT NULL,
            client_idNumber         varchar(9) CHARACTER SET utf8 DEFAULT NULL,
            client_accountNumber    varchar(64) CHARACTER SET utf8 DEFAULT NULL,
            client_comment          varchar(1024) CHARACTER SET utf8 DEFAULT NULL,
            client_createdDate      timestamp NOT NULL,
            client_editedDate       timestamp NOT NULL,
            client_delete           int(11) DEFAULT 0,
            PRIMARY KEY (client_id)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

    setDatabase($sql, $mysqli);
}

/* ======================================================
  FUNCTIONS FOR DATABASE PREPOPULATION
  ======================================================= */

function userPrepopulate($mysqli) {
    $sql = "INSERT INTO Users (user_name, user_surname, user_address, user_city, user_state, user_phone, user_email, user_accountNumber, user_username, user_password, user_passwordSalt, user_createdDate, user_accountType, user_activationCode, user_status)
            VALUES ('Nemanja', 'Pavlović', 'Generala Štefanika 20', 'Beograd', 'Srbija', '+381 63 715 65 05', 'me@pavlovicnemanja.com', '', 'nemanja.pavlovic', '4db9357a87a5815fe3033ff37e67c13840e8eac91f73b63957658cc2d2911a450aee6784532e2a68432e5df8f174316560d723f332935eccbe1a089ae86b8bc7', 'f9aab579fc1b41ed0c44fe4ecdbfcdb4cb99b9023abb241a6db833288f4eea3c02f76e0d35204a8695077dcf81932aa59006423976224be0390395bae152d4ef', '{{registration-date}}', 'superuserr', '', '1')";

    setDatabase($sql, $mysqli);
}

function clientPrepopulate($mysqli) {
    $sql = "INSERT INTO Clients (client_name, client_surname, client_address, client_city, client_state, client_citizenship, client_phone, client_email, client_socialNumber, client_idNumber, client_accountNumber, client_comment)
            VALUES ('Nemanja', 'Pavlović', 'Generala Štefanika 20', 'Beograd', 'Srbija', 'Srpsko', '+381 63 715 65 05', 'me@pavlovicnemanja.com', '0911992740046', '', '160-5400100716409-92', '')";

    setDatabase($sql, $mysqli);
}

usersCreateTable($mysqli);
loginAttemptsCreateTable($mysqli);
clientCreateTable($mysqli);

userPrepopulate($mysqli);
clientPrepopulate($mysqli);
