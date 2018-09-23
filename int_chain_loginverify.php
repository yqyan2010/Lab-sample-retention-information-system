<?php
// Log in database
$resultsarray=array();
$pdo = new pdo('mysql:host=localhost;port=3306;dbname=sample_int_chain_custody','mysql','mysql');
$staffinitial=$_POST['staffinitial'];
$pw=$_POST['pw'];
//$staffinitial='YY';
//$pw='yypw';
//$casenumber="1701395";
$sql_select = "SELECT pw FROM staffinitials WHERE staff_initial='".$staffinitial."'";
$stmt = $pdo->query($sql_select);
$stmt->execute();
foreach ($stmt as $r) {
  if ($r['pw']==$pw) {
    echo('Correct');
  }
  else {
    echo('Incorrect');
  }
}
//}
?>
