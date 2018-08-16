<?php
// Log in database
$pdo = new PDO('mysql:host=localhost;port=3306;dbname=sample_int_chain_custody','mysql','mysql');
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
date_default_timezone_set('America/Los_Angeles');
$date = date('Y-m-d');
$time = date('H:i:sa');

// Get the staffinitials
if (isset($staffinitial_array)) {} else {
  $staffinitial_array=array();
  $query_staffinitial=$pdo->prepare("select staffinitials_id,staff_initial from staffinitials");
  $query_staffinitial->execute();
  foreach ($query_staffinitial as $row) {
    $staffinitial_array[$row['staff_initial']]=(int)$row['staffinitials_id'];
  }
}
$checkin_initial_id=$staffinitial_array[$_POST['loginstaffinitial']];

// Enter checkin record in database
if (isset($_POST['casenumber'])) {
  $sql1 = "INSERT INTO checkin (sample_case,checkindate,checkintime,checkin_initial_id)
          VALUES (:sample_case,:checkindate,:checkintime,:checkin_initial_id)";
  $stmt1 = $pdo->prepare($sql1);
  $stmt1->execute (array(':sample_case'=>$_POST['casenumber'],
                        ':checkindate'=>$date,
                        ':checkintime'=>$time,
                        ':checkin_initial_id'=>$checkin_initial_id
                    ));
  //$sql2 = "INSERT INTO statustracking (sample_case,status,checkeddate,checkedtime,checkedby)
  //        VALUES (:sample_case,:status,:checkeddate,:checkedtime,:checkedby)";
  //$stmt2 = $pdo->prepare($sql2);
  //$stmt2->execute (array(':sample_case'=>$_COOKIE['barcode'],
  //                      ':status'=>'checkedin',
  //                      ':checkin_initial_id'=>checkin_initial_id,
  //                      ':checkeddate'=>$date,
  //                      ':checkedtime'=>$time)
  //                  );
echo ("<p></p>".$_POST['casenumber']." checked in at ".$time.", ".$date);
}
?>
