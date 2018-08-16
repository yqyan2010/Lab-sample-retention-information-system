<?php
// the database is saved in myphpadmin (c drive), name:int_chain_custody;
// Create variables
$staffinitials_array=array();
$customer_array=array();
$multiplesample_array=array();
$deliverymethods_array=array();
$sampleconditions_array=array();
$storageconditions_array=array();
$storage_array=array();
//Login to database
$pdo = new PDO('mysql:host=localhost;port=3306;dbname=sample_int_chain_custody','mysql','mysql');
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
//Query the staff initials and id
$query_staffinitials=$pdo->prepare("select staffinitials_id,staff_initial from staffinitials");
$query_staffinitials->execute();
foreach ($query_staffinitials as $row) {
  $staffinitials_array[$row['staff_initial']]=(int)$row['staffinitials_id'];
}
//Query customer and id
$query_customer=$pdo->prepare("select customer_id,customer from customer");
$query_customer->execute();
foreach ($query_customer as $row) {
  $customer_array[$row['customer']]=(int)$row['customer_id'];
}
//Query multiplesample id
$query_multiplesample=$pdo->prepare("select * from multiplesample");
$query_multiplesample->execute();
foreach ($query_multiplesample as $row) {
  $multiplesample_array[$row['multiples']]=(int)$row['multiplesample_id'];
}
//Query delivery methods and id
$query_deliverymethods=$pdo->prepare("select * from deliverymethods");
$query_deliverymethods->execute();
foreach ($query_deliverymethods as $row) {
  $deliverymethods_array[$row['delivery_methods']]=(int)$row['deliverymethods_id'];
}
//Query  sample conditions and id
$query_sampleconditions=$pdo->prepare("select * from sampleconditions");
$query_sampleconditions->execute();
foreach ($query_sampleconditions as $row) {
  $sampleconditions_array[$row['conditions']]=(int)$row['sampleconditions_id'];
}
//Query  storage conditions and id
$query_storageconditions=$pdo->prepare("select * from storageconditions");
$query_storageconditions->execute();
foreach ($query_storageconditions as $row) {
  $storageconditions_array[$row['storage_conditions']]=(int)$row['storageconditions_id'];
}
//Query storage and id
$query_storage=$pdo->prepare("select * from storage");
$query_storage->execute();
foreach ($query_storage as $row) {
  $storage_array[$row['storage_location']]=(int)$row['storage_id'];
}
//var_dump($deliverymethods_array);

?>
