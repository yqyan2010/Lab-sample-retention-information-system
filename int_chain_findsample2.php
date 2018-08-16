<?php
// Log in database
$resultsarray=array();
$pdo = new pdo('mysql:host=localhost;port=3306;dbname=sample_int_chain_custody','mysql','mysql');
$casenumber=$_POST['casenumber'];
//$casenumber="1701276";
$sql_select = "SELECT samplereceiving.sample_case,multiplesample.multiples,deliverymethods.delivery_methods,sampleconditions.conditions,storageconditions.storage_conditions
FROM samplereceiving
INNER JOIN multiplesample ON samplereceiving.multiplesample_id=multiplesample.multiplesample_id
INNER JOIN deliverymethods ON samplereceiving.deliverymethod_id=deliverymethods.deliverymethods_id
INNER JOIN sampleconditions ON samplereceiving.received_condition_id=sampleconditions.sampleconditions_id
INNER JOIN storageconditions ON samplereceiving.storage_condition_id=storageconditions.storageconditions_id
WHERE samplereceiving.sample_case='".$casenumber."'";
$stmt = $pdo->query($sql_select);
$stmt->execute();
foreach ($stmt as $r) {
  $resultsarray['casenumber']=$r['sample_case'];
  $resultsarray[$r['multiples']]=$r['multiples'];
  $resultsarray[$r['delivery_methods']]=$r['delivery_methods'];
  $resultsarray[$r['conditions']]=$r['conditions'];
  $resultsarray[$r['storage_conditions']]=$r['storage_conditions'];
  if ($r['storage_conditions']=='Ambient') {
    $resultsarray['storageambient']=$r['storage_conditions'];
  }
  else {
    $resultsarray['storagecold']=$r['storage_conditions'];
  }
}
echo(json_encode($resultsarray));

//}
?>
