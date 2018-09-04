<?php
// Log in database
$pdo = new PDO('mysql:host=localhost;port=3306;dbname=sample_int_chain_custody','mysql','mysql');
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
$casenumber=$_POST['casenumber'];
//$casenumber="1701247";
$sql = "SELECT checkin.checkin_id,checkin.sample_case,checkin.checkindate,checkin.checkintime,staffinitials.staff_initial FROM checkin INNER JOIN staffinitials ON checkin.checkin_initial_id=staffinitials.staffinitials_id WHERE sample_case=:sample_case ORDER BY checkin.checkindate,checkin.checkintime";
$stmt = $pdo->prepare($sql);
$stmt->execute(array(':sample_case'=>$casenumber));
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  $arr=array();
  //$arr['checkout_id']=$row['checkout_id'];
  $arr['sample_case']=$row['sample_case'];
  $arr['checkindate']=$row['checkindate'];
  $arr['checkintime']=$row['checkintime'];
  $arr['checkinby']=$row['staff_initial'];
  $resultsarray[]=$arr;
}
echo(json_encode($resultsarray));
?>
