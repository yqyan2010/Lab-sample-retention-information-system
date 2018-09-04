<?php
$resultsarray=array();
// Log in database
$pdo = new PDO('mysql:host=localhost;port=3306;dbname=sample_int_chain_custody','mysql','mysql');
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
$casenumber=$_POST['casenumber'];
//$casenumber="1701247";
$sql = "SELECT checkout.checkout_id,checkout.sample_case,checkout.checkoutdate,checkout.checkouttime,staffinitials.staff_initial FROM checkout INNER JOIN staffinitials ON checkout.checkout_initial_id=staffinitials.staffinitials_id WHERE sample_case=:sample_case ORDER BY checkout.checkoutdate,checkout.checkouttime";
$stmt = $pdo->prepare($sql);
$stmt->execute(array(':sample_case'=>$casenumber));
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  $arr=array();
  //$arr['checkout_id']=$row['checkout_id'];
  $arr['sample_case']=$row['sample_case'];
  $arr['checkoutdate']=$row['checkoutdate'];
  $arr['checkouttime']=$row['checkouttime'];
  $arr['checkoutby']=$row['staff_initial'];
  $resultsarray[]=$arr;
}
echo(json_encode($resultsarray));
?>
