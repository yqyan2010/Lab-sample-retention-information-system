<?php
// Log in database
$pdo = new PDO('mysql:host=localhost;port=3306;dbname=sample_int_chain_custody','mysql','mysql');
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
//$casenumber=$_POST['casenumber'];
$casenumber="1701247";
echo ("<table border='2' width='' cellpadding='' cellspacing='' style='display:inline-block'><tr>");
echo ("<td>Sample Case</td>");
echo ("<td>Check In Date</td>");
echo ("<td>Check In Time</td>");
echo ("<td>Check In By</td>");
echo ("</tr>");
$sql = "SELECT * FROM checkin WHERE sample_case=:sample_case";
$stmt = $pdo->prepare($sql);
$stmt->execute(array(':sample_case'=>$casenumber));
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
  echo "<tr>";
  echo ("<td>".$row['sample_case']."</td>");
  echo ("<td>".$row['checkindate']."</td>");
  echo ("<td>".$row['checkintime']."</td>");
  echo ("<td>".$row['checkin_initial_id']."</td>");
  echo "</tr>";
}
echo ("</table>");
?>
