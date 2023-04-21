<?php 
//getting file name
$file_name = $_FILES['file']['name'];

//getting temp name of the file
$tmp_name = $_FILES['file']['tmp_name'];

//making file name dynamic by adding current time stamp to file name
$name_updated = time().$file_name;

//moving file to specified folder
move_uploaded_file($tmp_name, "files/".$name_updated);
?>
