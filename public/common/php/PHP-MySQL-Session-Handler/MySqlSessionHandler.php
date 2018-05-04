<?php

/****************************************************************************************************************************
* 
* 2016.10.20 허정진
* 
* auth: serpiko@primarynet.co.kr
*
* mysqli => mysql 메서드로 전부 교체된 버전
*
*****************************************************************************************************************************



/**
* A PHP session handler to keep session data within a MySQL database
*
* @author 	Manuel Reinhard <manu@sprain.ch>
* @link		https://github.com/sprain/PHP-MySQL-Session-Handler
*/
class MySqlSessionHandler{
    /**
     * a database MySQLi connection resource
     * @var resource
     */
    protected $dbConnection;
    
    /**
     * the name of the DB table which handles the sessions
     * @var string
     */
    protected $dbTable;
    /**
     * Set db data if no connection is being injected
     * @param 	string	$dbHost
     * @param	string	$dbUser
     * @param	string	$dbPassword
     * @param	string	$dbDatabase
     */
    public function setDbDetails($dbHost, $dbUser, $dbPassword, $dbDatabase)
    {
		/*
        $this->dbConnection = new mysqli($dbHost, $dbUser, $dbPassword, $dbDatabase);
		if (mysqli_connect_error()) {
            throw new Exception('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
        }
		*/
		$this->dbConnection =  mysql_connect($dbHost, $dbUser, $dbPassword, true);
		mysql_select_db($dbDatabase, $this->dbConnection) or Error("DB Select 에러가 발생했습니다","");
		mysql_query("set character_set_results=utf8", $this->dbConnection);
		mysql_query("set names utf8", $this->dbConnection);
    }
    /**
     * Inject DB connection from outside
     * @param 	object	$dbConnection	expects MySQLi object
     */
    public function setDbConnection($dbConnection)
    {
        $this->dbConnection = $dbConnection;
    }
    /**
     * Inject DB connection from outside
     * @param 	object	$dbConnection	expects MySQLi object
     */
    public function setDbTable($dbTable)
    {
        $this->dbTable = $dbTable;
    }
    /**
     * Open the session
     * @return bool
     */
    public function open()
    {
        //delete old session handlers
        $limit = time() - (3600 * 24);
        $sql = sprintf("DELETE FROM %s WHERE timestamp < %s", $this->dbTable, $limit);
        //return $this->dbConnection->query($sql);
		return mysql_query($sql, $this->dbConnection);
    }
    /**
     * Close the session
     * @return bool
     */
    public function close()
    {
        return mysql_close();
    }
    /**
     * Read the session
     * @param int session id
     * @return string string of the sessoin
     */
    public function read($id)
    {
        //$sql = sprintf("SELECT data FROM %s WHERE id = '%s'", $this->dbTable, mysql_escape_string($id));
		$sql = sprintf("SELECT data FROM %s WHERE id = '%s'", $this->dbTable, mysql_real_escape_string($id));
        if ($result = mysql_query($sql, $this->dbConnection)) {
            if (mysql_num_rows($result) && mysql_num_rows($result) > 0) {
                $record = mysql_fetch_assoc($result);
                return $record['data'];
            } else {
                return false;
            }
        } else {
            return false;
        }
        return true;
    }
    /**
     * Write the session
     * @param int session id
     * @param string data of the session
     */
    public function write($id, $data)
    {
        $sql = sprintf("REPLACE INTO %s VALUES('%s', '%s', '%s')",
                       $this->dbTable,
                       //mysql_escape_string($id),
                       //mysql_escape_string($data),
						mysql_real_escape_string($id),
						mysql_real_escape_string($data),
                       time());
        return mysql_query($sql, $this->dbConnection);
    }
    /**
     * Destoroy the session
     * @param int session id
     * @return bool
     */
    public function destroy($id)
    {
        $sql = sprintf("DELETE FROM %s WHERE `id` = '%s'", $this->dbTable, /*mysql_escape_string($id)*/ mysql_real_escape_string($id));
        return mysql_query($sql, $this->dbConnection);
    }
    /**
     * Garbage Collector
     * @param int life time (sec.)
     * @return bool
     * @see session.gc_divisor      100
     * @see session.gc_maxlifetime 1440
     * @see session.gc_probability    1
     * @usage execution rate 1/100
     *        (session.gc_probability/session.gc_divisor)
     */
    public function gc($max)
    {
        $sql = sprintf("DELETE FROM %s WHERE `timestamp` < '%s'", $this->dbTable, time() - intval($max));
        return mysql_query($sql, $this->dbConnection);
    }
}