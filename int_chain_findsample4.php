<?php
// Log in database
$resultsarray=array();
$pdo = new pdo('mysql:host=localhost;port=3306;dbname=sample_int_chain_custody','mysql','mysql');
$casenumber=$_POST['casenumber'];
//$casenumber="1701375";
$sql_select = "SELECT storage.storage_location
FROM samplereceiving
INNER JOIN storage ON samplereceiving.storage_id=storage.storage_id WHERE samplereceiving.sample_case='".$casenumber."'";
$stmt = $pdo->query($sql_select);
$stmt->execute();
foreach ($stmt as $r) {
  $resultsarray['storage_location']=$r['storage_location'];
}
if ($resultsarray['storage_location'] == 'NA') {
  echo ('<p><script type="text/javascript">document.getElementById("setstorage").style.display="";</script></p>');
}
else {
  echo('<p><script type="text/javascript">document.getElementById("setstorage").style.display="none";</script></p>');
}
?>
