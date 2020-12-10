<!DOCTYPE html>
<html lang="en">
<head>
<body>
<ul>
<form name="insert" action="post_insert.php" method="POST" >
<li>POST BODY</li><li><input type="text" name="post_body" /></li>
<li><input type="submit"  action="HomePage.php"/></li>

</form>
</ul>
<?php 
if ($_POST[name] != '') {
    require_once 'connect.php';
    $query = "select ins_post('$_POST[post_body]')";
    $result = pg_query($query);
    echo "<script>window.location = 'HomePage.php'</script>";
}
?>
</body>
</head>
</html>