<?php

/*

CREATE TABLE `session_handler_table` (
`id` varchar(255) NOT NULL,
`data` mediumtext NOT NULL,
`timestamp` int(255) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

*/


require_once('MySqlSessionHandler.php');

$session = new MySqlSessionHandler();

//db정보 입력
$db = array();
$db['host'] = "localhost";
$db['id'] = 'root';
$db['pw'] = 'apmsetup';
$db['name'] = "SESSION";
$ses_table = "session_handler_table";

// add db data
$session->setDbDetails($db['host'], $db['id'], $db['pw'], $db['name']);

// OR alternatively send a MySQLi ressource
// $session->setDbConnection($mysqli);
$session->setDbTable($ses_table);


session_set_save_handler(array($session, 'open'),
                         array($session, 'close'),
                         array($session, 'read'),
                         array($session, 'write'),
                         array($session, 'destroy'),
                         array($session, 'gc'));

// The following prevents unexpected effects when using objects as save handlers.
register_shutdown_function('session_write_close');
session_start();




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


$_SESSION['company'] = "primarynet";
$_SESSION['major'] = "NMS";

// 2016.06.09 허정진 추가
class MysSqlSessionData{
	
	private $s_id;
	private $MYCLASS;
	protected $SessionClass;

	//생성자
	public function __construct($Class){ 

		if( !$Class ) throw new Exception('MySqlSessionHandler 클래스 인자가 없습니다.');

		$this->MYCLASS = get_class($this);
		$this->SessionClass = $Class;

		$this->init();
	}
	
	//initialize
	private function init(){
		$this->s_id = session_id();
		if ( !$this->s_id ) throw new Exception(  $this->MYCLASS ." : ". '세션id가 존재하지 않습니다.');
		
		if(   $this->session_valid_id( $this->s_id ) > 0 ) {
		}else{
			throw new Exception(  $this->MYCLASS ." : ". '유효하지 않은 세션id입니다.');
		}
	}

	//세션 유효값 검증
	private function session_valid_id($session_id){
		return preg_match('/^[-,a-zA-Z0-9]{1,128}$/', $session_id ) > 0;
	}

	//세션 핸들러 객체(상위)에서 세션 정보 읽어온다 : 리턴[array]
	public function getSessionClassRead(){
		
		$return_arr = array();

		$fullString = $this->SessionClass->read( $this->s_id ); //company|s:10:"primarynet";major|s:3:"NMS";

		if( $fullString ){
			$arrEndTocken = explode(";", $fullString); //company|s:10:"primarynet"
			for( $i=0; $i<count($arrEndTocken); ++$i){
				$arrNameTocken = explode("|", $arrEndTocken[$i]); //company  (네임)
				
				if( $arrNameTocken[0] == "" || $arrNameTocken[0] == null ) break;

				preg_match_all('/\\"([^{}]+)\\"/', $arrEndTocken[$i], $matches); // primarynet ( "~" 의 ~값)
				//$arrNameTocken[0], implode('', $matches[1]);

				array_push($return_arr, array( "id" => $this->s_id, "name" => $arrNameTocken[0], "value" => implode('', $matches[1]) ));
			}

			return $return_arr;
		}

		return false;
	}



}

//
$a = new MysSqlSessionData($session);
$arr = $a -> getSessionClassRead();

// 출력
//header("content-type:text/html;charset=utf-8");

if ($arr[0]['id'] == session_id() ) {
	echo "[성공] php와 DB세션이 동일합니다. <br /><br />\n";
	for($i=0; $i<count($arr); ++$i){

		echo "세션id: ".$arr[$i]['id'] ." / 세션name: ". $arr[$i]['name']." / 세션 값: ".$arr[$i]['value'];

		echo "<br /><br />\n";
	}
}else {
	echo "[실패] php와 DB세션이 동일하지 않습니다.";
}

?>