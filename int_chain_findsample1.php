<?php
//Create results array with default disposal info
$resultsarray=array();
// Log in database
$pdo = new pdo('mysql:host=localhost;port=3306;dbname=sample_int_chain_custody','mysql','mysql');
$casenumber=$_POST['casenumber'];
//$casenumber="1701375";
//---Select from samplereceiving table----------
$sql_select1 = "SELECT samplereceiving.sample_case,samplereceiving.received_date,samplereceiving.sample_description,samplereceiving.lotnumber,samplereceiving.notes,staffinitials.staff_initial,customer.customer,storage.storage_location,storageconditions.storage_conditions
FROM samplereceiving
INNER JOIN staffinitials ON samplereceiving.received_initial_id=staffinitials.staffinitials_id
INNER JOIN customer ON samplereceiving.customer_id=customer.customer_id
INNER JOIN storage ON samplereceiving.storage_id=storage.storage_id
INNER JOIN storageconditions ON samplereceiving.storage_condition_id=storageconditions.storageconditions_id
WHERE samplereceiving.sample_case='".$casenumber."'";
$stmt1 = $pdo->query($sql_select1);
$stmt1->execute();
foreach ($stmt1 as $r) {
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
//---Select from dispose table---------
$sql_select2="SELECT dispose.sample_case,dispose.disposedate,dispose.disposetime,staffinitials.staff_initial FROM dispose INNER JOIN staffinitials ON dispose.disposeby_initial_id=staffinitials.staffinitials_id WHERE dispose.sample_case='".$casenumber."'";
$stmt2 = $pdo->query($sql_select2);
$stmt2->execute();
foreach ($stmt2 as $r) {
  $resultsarray['casenumber']=$r['sample_case'];
  $resultsarray['dispodate']=$r['disposedate'];
  $resultsarray['dispoby']=$r['staff_initial'];
}
//---Output results------------
if (empty($resultsarray)) {
  $resultsarray['casenumber']=$casenumber.' DOSE NOT EXIST.';
  echo(json_encode($resultsarray));
}
else {
  echo(json_encode($resultsarray));
}

//}
?>
