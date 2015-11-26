<?php

header('Content-Type: application/json');

/*
 * Getter for database functions
 * 
 * @param {string} $sql
 */

function getDatabase($sql, $params, $mysqli) {
    if (!empty($params) && is_array($params)) {
        $sql .= ' WHERE ';

        $paramLength = count($params);
        $i = 0;

        foreach ($params as $var => $val) {
            $sql .= $var . ' = "' . $val . '"';

            if ($i !== $paramLength - 1) {
                $sql .= ' AND ';
            }

            $i++;
        }
    }

    $result = $mysqli->query($sql);
    $rows = array();

    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }

    echo json_encode($rows);
}

/*
 * Setter for database functions
 * 
 * @param {string} $sql
 */

function setDatabase($table, $params, $mysqli) {
    if (!empty($params) && is_array($params)) {
        $sql = 'INSERT INTO ' . $table . ' WHERE ';

        $vars = ''; $vals = '';

        $paramLength = count($params);
        $i = 0;

        foreach ($params as $var => $val) {
            $vars .= $var;
            $vals .= $val;

            if ($i !== $paramLength - 1) {
                $vars .= ', ';
                $vals .= ', ';
            }

            $i++;
        }

        $sql .= '(' . $vars . ') VALUES (' . $vals . ')';

        if ($mysqli->query($sql) === TRUE) {
            echo 'Total rows updated: ' . $mysqli->affected_rows;
        } else {
            echo $mysqli->errno;
            echo "\nError creating table: " . $mysqli->error;
        }
    }
}

/* ======================================================
      SPECIFIC FUNCTIONS FOR PREPOPULATIONS
      ======================================================= */