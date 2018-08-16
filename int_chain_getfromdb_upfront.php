<?php
//Login to database
$pdo = new PDO('mysql:host=localhost;port=3306;dbname=sample_int_chain_custody','mysql','mysql');
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
$value=$_POST['userinput'];
//$value='staffinitialfull';

if ($value=='staffinitial') {
//Query the staff initials and id
  if (isset($staffinitial_array)) {} else {
    $staffinitial_array=array();
    $query_staffinitial=$pdo->prepare("select staffinitials_id,staff_initial from staffinitials order by fororderby");
    $query_staffinitial->execute();
    foreach ($query_staffinitial as $row) {
      $staffinitial_array[$row['staff_initial']]=(int)$row['staffinitials_id'];
    }
  }
  echo(json_encode($staffinitial_array));
}

if ($value=='staffinitialfull') {
  if (isset($staffinitialfull_array)) {} else {
    $staffinitialfull_array=array();
    $query_staffinitialfull=$pdo->prepare("select staffinitials_id,staff_initial,staff_full from staffinitials");
    $query_staffinitialfull->execute();
    foreach ($query_staffinitialfull as $r) {
      $staffinitialfull_array[$r['staff_initial']." ".$r['staff_full']]=(int)$r['staffinitials_id'];
    }
  }
  echo(json_encode($staffinitialfull_array));
}

if ($value=='customer') {
//Query customer and id
  if (isset($customer_array)) {} else {
    $customer_array=array();
    $query_customer=$pdo->prepare("select customer_id,customer from customer");
    $query_customer->execute();
    foreach ($query_customer as $row) {
      $customer_array[$row['customer']]=(int)$row['customer_id'];
    }
  }
  echo(json_encode($customer_array));
}
//($customer_array);

?>
