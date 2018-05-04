<?

/*********************************************************************************************************
*
*
* ver. 2016.10.20 허정진
*
* 자주사용하는 json encode와 파일 입출력 함수 샘플
*
*
*********************************************************************************************************/

$Act = $_GET['Act'];
$Gid = $_GET['Gid'];

$Act_Post = $_POST['Act'];
$Gid_Post = $_POST['Gid'];



if( $Act == "test" ){
	$jsonData = array();
	$jsonData['name'] = "serpiko";
	$jsonData['lib'] = "All In One Package";
	
	//header("Content-type: text/html; charset=utf-8");
	header("Content-type: application/json; charset=utf-8");
	echo json_encode($jsonData);
}


/*
* 업로드 폴더생성
*/
function createFileFolder($MapID){
	//Gid 가지고 ../upload/ 안에 폴더를 만든다
	$upload = "../upload";
	$mydir = $MapID;

	if( is_dir($upload) ){
		if( @mkdir($upload."/".$mydir, 0777, true ) ){

		}
	}
}

/*
* 폴더에서 파일 리스트출력
*/
function getFileNames($directory){
	
	$results = array();

	$handler = opendir($directory);

	while( $file = readdir($handler)){

		if( $file != '.' && $file != ".." && is_dir($file) != '1' ){
			$results[] = $file;
		}
	}

	closedir($handler);

	return $results;
}


/*
* 파일 업로드
*/
$file = $_FILES['upload_file'];
if ( !empty($file) ){
	
	$arrFileInfo = pathinfo( $file['name']); //파일정보배열
	$ext = $arrFileInfo['extension'];	//확장자 정보
	$prefix = $_POST['str'];

	$date = date("Ymd_Hid", time() );
	$file_newname = $prefix."_".$date.".".$ext;

	$res = move_uploaded_file( $file['tmp_name'], "upload/" .$file_newname);
	
	echo $res;
}
?>