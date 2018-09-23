<?php
//Create results array with default disposal info
$resultsarray=array();
// Log in database
$pdo = new pdo('mysql:host=localhost;port=3306;dbname=sample_int_chain_custody','mysql','mysql');
$casenumber=$_POST['casenumber'];
//$casenumber="1701398";
//---Select from dispose----------
$sql_select = "SELECT sample_case FROM dispose WHERE sample_case='".$casenumber."'";
$stmt = $pdo->query($sql_select);
$stmt->execute();
foreach ($stmt as $r) {
  $resultsarray['casenumber']=$r['sample_case'];
}
//---Output results------------
if (empty($resultsarray)) {
  echo('retention');
}
else {
  echo('disposed');
}

//}
?>
