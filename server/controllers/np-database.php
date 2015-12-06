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
        $sql = 'INSERT INTO ' . $table;

        $vars = '';
        $vals = '';

        $paramLength = count($params);
        $i = 0;

        foreach ($params as $var => $val) {
            $vars .= $var;
            $vals .= '"' . $val . '"';

            if ($i !== $paramLength - 1) {
                $vars .= ', ';
                $vals .= ', ';
            }

            $i++;
        }

        $sql .= '(' . $vars . ') VALUES (' . $vals . ')';

        if ($mysqli->query($sql) === TRUE) {
            echo json_encode(array('msg' => 'Total rows updated: ' . $mysqli->affected_rows));
        } else {
            echo json_encode(array("msg" => 'Error setting database: ' . $mysqli->error));
        }
    }
}

/*
 * Updater for database functions
 * 
 * @param {string} $sql
 */

function updateDatabase($table, $identifier, $controller, $params, $mysqli) {
    if (!empty($params) && is_array($params)) {
        $sql = 'UPDATE ' . $table . ' SET ';

        $paramLength = count($params);
        $i = 0;

        foreach ($params as $var => $val) {
            if ($identifier === $var) {
                $identifier = $var . '= "' . $val . '"';
            } else {
                $sql .= $var . '= "' . $val . '"';

                if ($i !== $paramLength - 1) {
                    $sql .= ', ';
                }
            }

            $i++;
        }
        
        $sql .= ' WHERE ' . $identifier . ' AND ' . $controller;

        if ($mysqli->query($sql) === TRUE) {
            echo json_encode(array('msg' => 'Total rows updated: ' . $mysqli->affected_rows));
        } else {
            echo json_encode(array("msg" => 'Error setting database: ' . $mysqli->error));
        }
    }
}

/*
 * Deleter for database fuction
 * 
 * @param {string} $sql
 */

function markForDelete($table, $identifier, $controller, $flag, $mysqli) {
    if (!empty($identifier) && !empty($flag)) {
        $sql = 'UPDATE ' . $table . ' SET ' . $flag . '=1' . ' WHERE ' . $identifier . ' AND ' . $controller;

        if ($mysqli->query($sql) === TRUE) {
            echo json_encode(array('msg' => 'Total rows updated: ' . $mysqli->affected_rows));
        } else {
            echo json_encode(array("msg" => 'Error setting database: ' . $mysqli->error));
        }
    }
}
