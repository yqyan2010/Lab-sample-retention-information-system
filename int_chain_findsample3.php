<?php
// Log in database
$item=array();
$pdo = new pdo('mysql:host=localhost;port=3306;dbname=sample_int_chain_custody','mysql','mysql');
$casenumber=$_POST['casenumber'];
//$casenumber="1701375";
$sql_select = "SELECT departments_testing,departments_deliveredto,special_instance
FROM samplereceiving
WHERE samplereceiving.sample_case='".$casenumber."'";
$stmt = $pdo->query($sql_select);
$stmt->execute();
foreach ($stmt as $r) {
  $t=explode(',',$r['departments_testing']);
  for($i=0;$i<count($t);$i++) {
    $item[]='t_'.$t[$i];
  }
  $d=explode(',',$r['departments_deliveredto']);
  for($i=0;$i<count($d);$i++) {
    $item[]='d_'.$d[$i];
  }
  $s=explode(',',$r['special_instance']);
  for($i=0;$i<count($s);$i++) {
    $item[]=$s[$i];
  }
}
echo(json_encode($item));
//}
?>
