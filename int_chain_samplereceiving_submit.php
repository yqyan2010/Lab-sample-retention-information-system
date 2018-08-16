<?php
//Call int_info.php that saves lab information
require_once('C:\wamp\www\purity\intchaincustody\int_chain_getfromdb.php');

// Retrieve user input and convert to database id
$received_initial=$_POST['received_initial'];
$customer=$_POST['customer'];
$multiplesample=$_POST['multi_sample_choice'];
$deliverymethods=$_POST['deliver_method'];
$received_condition=$_POST['receive_condition'];
$storagecondition=$_POST['storage_condition'];
$storage=$_POST['storage'];

$received_initial_id=$staffinitials_array[$received_initial];
$customer_id=$customer_array[$customer];
$multiplesample_id=$multiplesample_array[$multiplesample];
$deliverymethods_id=$deliverymethods_array[$deliverymethods];
$received_condition_id=$sampleconditions_array[$received_condition];
$storagecondition_id=$storageconditions_array[$storagecondition];
$storage_id=$storage_array[$storage];
// Aquire date and time
date_default_timezone_set('America/Los_Angeles');
$date = date('Y-m-d');
$time = date('H:i:sa');
//$pdonew = new PDO('mysql:host=localhost;port=3306;dbname=sample_int_chain_custody','mysql','mysql');
//$pdonew->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
// Add submit user input to database
$sql_add="INSERT INTO samplereceiving (received_date,received_time,sample_case,received_initial_id,customer_id,sample_description,lotnumber,multiplesample_id,notes,deliverymethod_id,received_condition_id,storage_condition_id,storage_id,departments_testing,departments_deliveredto,special_instance) VALUES (:received_date,:received_time,:sample_case,:received_initial_id,:customer_id,:sample_description,:lotnumber,:multiplesample_id,:notes,:deliverymethod_id,:received_condition_id,:storage_condition_id,:storage_id,:departments_testing,:departments_deliveredto,:special_instance)";

$stmt = $pdo->prepare($sql_add);
$stmt->execute(array(':received_date'=>$date,
                      ':received_time'=>$time,
                      ':sample_case'=>$_POST['casenumber'],
                      ':received_initial_id'=>$received_initial_id,
                      ':customer_id'=>$customer_id,
                      ':sample_description'=>$_POST['description'],
                      ':lotnumber'=>$_POST['lotnumber'],
                      ':multiplesample_id'=>$multiplesample_id,
                      ':notes'=>$_POST['notes'],
                      ':deliverymethod_id'=>$deliverymethods_id,
                      ':received_condition_id'=>$received_condition_id,
                      ':storage_condition_id'=>$storagecondition_id,
                      ':storage_id'=>$storage_id,
                      ':departments_testing'=>$_POST['testdeptchecked'],
                      ':departments_deliveredto'=>$_POST['deliveredtochecked'],
                      ':special_instance'=>$_POST['specialchecked']));

echo ("<p></p>".$_POST['casenumber']." submitted at ".$time.", ".$date." by ".$_POST['received_initial']);
?>
