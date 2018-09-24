<?php
// Log in database
$pdo = new PDO('mysql:host=localhost;port=3306;dbname=sample_int_chain_custody','mysql','mysql');
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
date_default_timezone_set('America/Los_Angeles');
$date = date('Y-m-d');
$time = date('H:i:sa');
$casenumber=$_POST['casenumber'];
$loginstaffinitial=$_POST['loginstaffinitial'];
//$casenumber='1701325';
//$loginstaffinitial='AL';
// Get the staffinitials
if (isset($staffinitial_array)) {} else {
  $staffinitial_array=array();
  $query_staffinitial=$pdo->prepare("select staffinitials_id,staff_initial from staffinitials");
  $query_staffinitial->execute();
  foreach ($query_staffinitial as $row) {
    $staffinitial_array[$row['staff_initial']]=(int)$row['staffinitials_id'];
  }
}
$disposeby_initial_id=$staffinitial_array[$loginstaffinitial];
// Enter dispose record in database
if (isset($casenumber)) {
  if ($casenumber=='') {
    echo("<p><font color='red'>Missing sample case number.</font></p>");
  }
  else {
    $sql1 = "INSERT IGNORE INTO dispose (sample_case,disposedate,disposetime,disposeby_initial_id) VALUES (:sample_case,:disposedate,:disposetime,:disposeby_initial_id)";
    $stmt1 = $pdo->prepare($sql1);
    $stmt1->execute (array(':sample_case'=>$casenumber,
                          ':disposedate'=>$date,
                          ':disposetime'=>$time,
                          ':disposeby_initial_id'=>$disposeby_initial_id
                        ));
    echo ("<p></p>".$casenumber." disposed.");
  }
}
?>
