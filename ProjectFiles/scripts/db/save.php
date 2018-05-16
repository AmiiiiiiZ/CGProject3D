

	
	<?php

	header("Content-type: text/html; charset=utf-8");
	
	$str = $_REQUEST['boxes'];

	echo $_REQUEST['boxes'];
	
	$myfile = fopen("boxes.txt", "w") or die("Unable to open file!");
	
	fwrite($myfile, $str);
	
	fclose($myfile);
	
	?>

	
	