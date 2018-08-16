<?php
// Log in database
$resultsarray=array();
$pdo = new pdo('mysql:host=localhost;port=3306;dbname=sample_int_chain_custody','mysql','mysql');
$casenumber=$_POST['casenumber'];
//$casenumber="1701276";
$sql_select = "SELECT samplereceiving.sample_case,samplereceiving.received_date,samplereceiving.sample_description,samplereceiving.lotnumber,samplereceiving.notes,staffinitials.staff_initial,customer.customer,storage.storage_location,storageconditions.storage_conditions
FROM samplereceiving
INNER JOIN staffinitials ON samplereceiving.received_initial_id=staffinitials.staffinitials_id
INNER JOIN customer ON samplereceiving.customer_id=customer.customer_id
INNER JOIN storage ON samplereceiving.storage_id=storage.storage_id
INNER JOIN storageconditions ON samplereceiving.storage_condition_id=storageconditions.storageconditions_id
WHERE samplereceiving.sample_case='".$casenumber."'";
$stmt = $pdo->query($sql_select);
$stmt->execute();
foreach ($stmt as $r) {
  $resultsarray['casenumber']=$r['sample_case'];
  $resultsarray['received_date']=$r['received_date'];
  $resultsarray['sample_description']=$r['sample_description'];
  $resultsarray['lotnumber']=$r['lotnumber'];
  $resultsarray['notes']=$r['notes'];
  $resultsarray['staff_initial']=$r['staff_initial'];
  $resultsarray['customer']=$r['customer'];
  if ($r['storage_conditions']=='Ambient') {
    $resultsarray['ambientlocation']=$r['storage_location'];
  }
  else {
    $resultsarray['coldlocation']=$r['storage_location'];
  }
}
if (empty($resultsarray)) {
  $resultsarray['casenumber']=$casenumber.' DOSE NOT EXIST.';

  echo(json_encode($resultsarray));
}
else {
  echo(json_encode($resultsarray));
}

//}
?>
