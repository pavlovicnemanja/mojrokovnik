<?php

require_once 'np-database.php';

function usersCreateTable() {
    $sql = "CREATE TABLE IF NOT EXISTS Users (
            user_id                 int(11) NOT NULL AUTO_INCREMENT,
            user_name               varchar(32) CHARACTER SET utf8 NOT NULL,
            user_surname            varchar(32) CHARACTER SET utf8 NOT NULL,
            user_address            varchar(64) CHARACTER SET utf8 DEFAULT '(nije uneto)',
            user_city               varchar(32) CHARACTER SET utf8 DEFAULT '(nije uneto)',
            user_phone              varchar(32) CHARACTER SET utf8 DEFAULT '(nije uneto)',
            user_email              varchar(64) CHARACTER SET utf8 NOT NULL,
            user_accountNumber      varchar(64) CHARACTER SET utf8 DEFAULT NULL,
            user_username           varchar(64) CHARACTER SET utf8 NOT NULL,
            user_password           varchar(64) CHARACTER SET utf8 NOT NULL,
            user_createdDate        timestamp NOT NULL,
            user_editedDate         timestamp NOT NULL,
            user_accountType        varchar(32) CHARACTER SET utf8 DEFAULT NULL,
            user_activationCode     varchar(32) CHARACTER SET utf8 DEFAULT NULL,
            user_status             int(11) DEFAULT NULL,
            PRIMARY KEY (user_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

    setterDatabase($sql);
}

function clientCreateTable() {
    $sql = "CREATE TABLE IF NOT EXISTS Clients (
            client_id               int(11) NOT NULL AUTO_INCREMENT,
            user_id                 int(11) DEFAULT NULL,
            client_name             varchar(32) CHARACTER SET utf8 NOT NULL,
            client_surname          varchar(32) CHARACTER SET utf8 NOT NULL,
            client_address          varchar(64) CHARACTER SET utf8 DEFAULT NULL,
            client_city             varchar(32) CHARACTER SET utf8 NOT NULL,
            client_citizenship      varchar(64) CHARACTER SET utf8 NOT NULL,
            client_phone            varchar(32) CHARACTER SET utf8 NOT NULL,
            client_email            varchar(64) CHARACTER SET utf8 DEFAULT NULL,
            client_socialNumber     varchar(13) CHARACTER SET utf8 DEFAULT NULL,
            client_idNumber         varchar(9) CHARACTER SET utf8 DEFAULT NULL,
            client_accountNumber    varchar(64) CHARACTER SET utf8 DEFAULT NULL,
            client_comment          varchar(1024) CHARACTER SET utf8 DEFAULT NULL,
            client_createDate       timestamp NOT NULL,
            client_editedDate       timestamp NOT NULL,
            client_delete           int(11) DEFAULT NULL,
            PRIMARY KEY (client_id)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

    setterDatabase($sql);
}

/* ======================================================
  FUNCTIONS FOR DATABASE PREPOPULATION
  ======================================================= */

function userPrepopulate() {
    $sql = "INSERT INTO Users (user_name, user_surname, user_address, user_city, user_phone, user_email, user_accountNumber, user_username, user_password, user_registrationDate, user_accountType, user_activationCode, user_status)
            VALUES ('Nemanja', 'Pavlović', 'Generala Štefanika 20', 'Beograd', '+381 63 715 65 05', 'me@pavlovicnemanja.com', '160-5400100716409', '{{username}}', '{{password}}', '{{registration-date}}', 'superuserr', '', 'active')";

    setterDatabase($sql);
}

function clientPrepopulate() {
    $sql = "INSERT INTO Clients (client_name, client_surname, client_address, client_city, client_citizenship, client_phone, client_email, client_socialNumber, client_idNumber, client_accountNumber, client_comment)
            VALUES ('Nemanja', 'Pavlović', 'Generala Štefanika 20', 'Beograd', 'Srpsko', '+381 63 715 65 05', 'me@pavlovicnemanja.com', '0911992740046', '', '160-5400100716409-92', '')";

    setterDatabase($sql);
}

usersCreateTable();
clientCreateTable();

userPrepopulate();
clientPrepopulate();