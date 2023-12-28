<?
$_POST = json_decode( file_get_contents("php://input"), true ); //для опрацювання json даних
echo var_dump($_POST);
?>