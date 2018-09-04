<?php
// Log in database
require_once('C:\wamp\www\purity\intchaincustody\int_chain_getfromdb.php');

$casenumber=$_POST['casenumber'];
$staffinitial=$_POST['loginstaffinitial'];
$storage=$_POST['storage'];

$staffinitial_id=$staffinitials_array[$staffinitial];
$storage_id=$storage_array[$storage];

$sql_setstorage = "UPDATE samplereceiving SET storage_id=:storage_id,setstorageby_id=:setstorageby_id WHERE sample_case=:sample_case";
$stmt = $pdo->prepare($sql_setstorage);
$stmt->execute (array(':storage_id'=>$storage_id,
                        ':setstorageby_id'=>$staffinitial_id,
                        ':sample_case'=>$casenumber));
//echo('<p>Hi</p>');
echo ('<p><script type="text/javascript">document.getElementById("setstorage").style.display="none";</script></p>');
//echo ("<p></p>".$_COOKIE['barcode']." checked in at ".$time.", ".$date);
?>
