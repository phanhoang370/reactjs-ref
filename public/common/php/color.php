<?
$color = $arrColor[ rand(0, count($arrColor)-1) ];

$color1 = $arrGradient[ rand(0, count($arrGradient)-1) ][0];
$color2 = $arrGradient[ rand(0, count($arrGradient)-1) ][1];

/*
<!DOCTYPE HTML>
<head>
<meta charset='utf-8'>
</head>
<body>
*/

$arrColor =  Array(
'',

//10
"#FFA500"
,"#9BC200"
,"#FEDE58"
,"#60ABD2"
,"#C9965B"
,"#FF69B4"
,"#87CEEB"
,"#FF6347"
,"#9370DB"
,"#BDB76B"

//20
,"#14cbeb"
,"#20df8e"
,"#c5b5fd"
,"#fdc4b5"
,"#b5fdc5"
,"#d68e79"
,"#b5ecfd"
,"#d679c2"
,"#baff2c"
,"#e9bc81"


//30
,"#c0858b"
,"#ddbd68"
,"#68ddbd"
,"#bc68dd"
,"#b63a5c"
,"#ffac00"
,"#3aa9c5"
,"#149a2c"
,"#8b581f"
,"#7c9162"

//40
,"#dfc8f0"
,"#ffb9b9"
,"#0bca9f"
,"#767746"
,"#a53f84"
,"#46e0fb"
,"#37c806"
,"#d8789a"
,"#ddbc93"
,"#adcc42"

//50
,"#e47d0c"
,"#589882"
,"#721898"
,"#8f4021"
,"#e010e0"
,"#478f3a"
,"#876f18"
,"#6fa271"
,"#a7cbeb"
,"#c7dab8"

//60
,"#ff0080"
,"#eaea00"
,"#0080ff"
,"#ff80c0"
,"#8080c0"
,"#008080"
,"#004080"
,"#808040"
,"#408080"
,"#e1a451"

//70
,"#818f4b"
,"#dd466f"
,"#ad9843"
,"#86bd33"
,"#32be8d"
,"#30aec0"
,"#2f80c1"
,"#2e32c2"
,"#8e2fc1"
,"#be32be"

//80
,"#c0308d"
,"#f79f9b"
,"#f8c59a"
,"#f8f39a"
,"#d0f89a"
,"#9bf7af"
,"#9cf3f5"
,"#9bc5f7"
,"#a599f9"
,"#de9af8"

//90
,"#984541"
,"#957744"
,"#968f43"
,"#769445"
,"#4a9544"
,"#439677"
,"#408b99"
,"#3e429b"
,"#823d9c"
,"#9c3d7b"

//100
,"#96be1b"
,"#cd590c"
,"#0eaacb"
,"#e1cbf3"
,"#e76de3"
,"#8080bb"
,"#9c6b96"
,"#e6647a"
,"#519fb9"
,"#ee6804"
);

/*
echo "<table width=1000 height=400>\n";

$i = 0;
while($i < 100)
{
	if( $i % 10 == 0 ) {
		echo ("
			<tr>
				<td width=100 height=20 style='background-color:".$arrColor[++$i].";'> ".$arrColor[$i]." </td>
				<td width=100 height=20 style='background-color:".$arrColor[++$i].";'> ".$arrColor[$i]." </td>
				<td width=100 height=20 style='background-color:".$arrColor[++$i].";'> ".$arrColor[$i]." </td>
				<td width=100 height=20 style='background-color:".$arrColor[++$i].";'> ".$arrColor[$i]." </td>
				<td width=100 height=20 style='background-color:".$arrColor[++$i].";'> ".$arrColor[$i]." </td>
				<td width=100 height=20 style='background-color:".$arrColor[++$i].";'> ".$arrColor[$i]." </td>
				<td width=100 height=20 style='background-color:".$arrColor[++$i].";'> ".$arrColor[$i]." </td>
				<td width=100 height=20 style='background-color:".$arrColor[++$i].";'> ".$arrColor[$i]." </td>
				<td width=100 height=20 style='background-color:".$arrColor[++$i].";'> ".$arrColor[$i]." </td>
				<td width=100 height=20 style='background-color:".$arrColor[++$i].";'> ".$arrColor[$i]." </td>
			<tr>
			");
	}
}

echo "</table>\n";

echo "<br /><br /><br />";
*/

$arrGradient =  Array(
'',

//10
array("#830082","#FC6AFE"),
array("#0c67b2","#3AB1CE"),
array("#49B927","#c3E22F"),
array("#FF9F00","#FFE400"),
array("#3A1D8C","#7B53ED"),
array("#E20070","#F83A99"),
array("#ff6d0a","#ffa568"),
array("#085B61","#51A2A3"),
array("#967230","#c49744"),
array("#8b863f","#bdb76b"),

//20
array("#0d5e3c","#14cbeb"), 
array("#a287fc","#dacffe"),
array("#fc9b83","#fed6cb"),
array("#60fb83","#c5fed1"),
array("#d68e79","#eac6bb"),
array("#34cdfa","#b5ecfd"),
array("#cc59b3","#e2a3d5"),
array("#baff2c","#ecffc4"),
array("#df9f48","#f2d8b3"),
array("#c0858b","#e2c7ca"),

//30
array("#bc68dd","#e9cdf3"), 
array("#b63a5c","#de98ab"),
array("#bb7e00","#ffb926"),
array("#6fa271","#bed6bf"),
array("#a7cbeb","#deecf8"),
array("#c7dab8","#e2ecdb"),
array("#004080","#0078f0"),
array("#e76de3","#f3b8f2"),
array("#c0c0c0","#e4e4e4"),
array("#12cade","#9eeff8"),

//40
array("#f4eaa2","#fbf7db"),
array("#5ecfd9","#b0e8ec"),
array("#ebc2b1","#f5e2da"),
array("#c4da45","#e2eda7"),
array("#c67c6e","#ddb1aa"),
array("#de7527","#eeb891"),
array("#d609f2","#f1a9fc"),
array("#77e1af","#c8f2de"),
array("#528f45","#a8d09f"),
array("#a38b54","#cec09f"),

//50
array("#9fcec0","#d8ebe6"),
array("#17686a","#25a6a9"),
array("#a7ae20","#d1da36"),
array("#7ab1f5","#cce1fb"),
array("#e1687d","#eca2ae"),
array("#f398f5","#fad5fb"),
array("#8ec7f0","#cee7f9"),
array("#78c86a","#bde4b6"),
array("#7c4310","#c86c1a"),
array("#e0c872","#f2e9c6"),

//60
array("#ff8040","#ff9d6f"),
array("#e3ed2c","#f3f8a9"),
array("#b4f9a8","#e8fde3"),
array("#c2bc72","#e2dfbe"),
array("#1592a8","#5fd6eb"),
array("#5b84ee","#c1d0f9"),
array("#7ec7e9","#c5e6f5"),
array("#808000","#b7b700"),
array("#7e386f","#cb89bc"),
array("#5a5ffa","#a8aafd"),

//70
array("#aafbce","#dbfdea"),
array("#d2d073","#e6e4ae"),
array("#6fcfe3","#9fdeec"),
array("#6d86e7","#97a8ee"),
array("#d1574e","#e1938c"),
array("#f2a87b","#f9d5bf"),
array("#9da81c","#dce666"),
array("#c4b888","#e1dbc4"),
array("#e9b61d","#f7e2a4"),
array("#b17d4e","#d8bea7"),

//80
array("#8ec7f0","#d0e8f9"),
array("#eee322","#f8f3a5"),
array("#a09d29","#dddb7b"),
array("#e2a618","#f7e1ae"),
array("#4f04ca","#8741fc"),
array("#e72ecb","#f07ddf"),
array("#6cd23c","#9ae078"),
array("#4bd8a7","#91e8c9"),
array("#2c9bcb","#61b7dc"),
array("#c48aee","#ead5f9"),

//90
array("#5ac148","#87d279"),
array("#74882f","#9ab53e"),
array("#17db9b","#acf7de"),
array("#9468e3","#bea4ee"),
array("#3072ba","#a9c8e9"),
array("#358a42","#a2dbaa"),
array("#96f0ff","#d2f9ff"),
array("#e2ecdb","#eff4ec"),
array("#ff5b99","#ffb0ce"),
array("#3f1f89","#693cd2"),

//100
array("#e82696","#f8b8dd"),
array("#ffc296","#ffe8d7"),
array("#e3e04f","#f4f3bd"),
array("#2de19d","#aff3da"),
array("#3696ed","#b9dbf9"),
array("#40d047","#8be28f"),
array("#c65b15","#f0a675"),
array("#3e429b","#7b80ca"),
array("#e6647a","#f2aeba"),
array("#e1cbf3","#f1e7fa")

);

/*
echo "<table width=1000 height=400>\n";
$i = 0;

while($i < 100)
{
	if( $i % 10 == 0 ) {
		echo ("
			<tr>
				<td width=100 height=20 style='background:linear-gradient(".$arrGradient[++$i][0].",".$arrGradient[$i][1].")'> ".$arrGradient[$i][0].','.$arrGradient[$i][1]." </td>
				<td width=100 height=20 style='background:linear-gradient(".$arrGradient[++$i][0].",".$arrGradient[$i][1].")'> ".$arrGradient[$i][0].','.$arrGradient[$i][1]." </td>
				<td width=100 height=20 style='background:linear-gradient(".$arrGradient[++$i][0].",".$arrGradient[$i][1].")'> ".$arrGradient[$i][0].','.$arrGradient[$i][1]." </td>
				<td width=100 height=20 style='background:linear-gradient(".$arrGradient[++$i][0].",".$arrGradient[$i][1].")'> ".$arrGradient[$i][0].','.$arrGradient[$i][1]." </td>
				<td width=100 height=20 style='background:linear-gradient(".$arrGradient[++$i][0].",".$arrGradient[$i][1].")'> ".$arrGradient[$i][0].','.$arrGradient[$i][1]." </td>
				<td width=100 height=20 style='background:linear-gradient(".$arrGradient[++$i][0].",".$arrGradient[$i][1].")'> ".$arrGradient[$i][0].','.$arrGradient[$i][1]." </td>
				<td width=100 height=20 style='background:linear-gradient(".$arrGradient[++$i][0].",".$arrGradient[$i][1].")'> ".$arrGradient[$i][0].','.$arrGradient[$i][1]." </td>
				<td width=100 height=20 style='background:linear-gradient(".$arrGradient[++$i][0].",".$arrGradient[$i][1].")'> ".$arrGradient[$i][0].','.$arrGradient[$i][1]." </td>
				<td width=100 height=20 style='background:linear-gradient(".$arrGradient[++$i][0].",".$arrGradient[$i][1].")'> ".$arrGradient[$i][0].','.$arrGradient[$i][1]." </td>
				<td width=100 height=20 style='background:linear-gradient(".$arrGradient[++$i][0].",".$arrGradient[$i][1].")'> ".$arrGradient[$i][0].','.$arrGradient[$i][1]." </td>
			</tr>
			");
	}
}
echo "</table>\n";

?>

</body>
<html>
*/