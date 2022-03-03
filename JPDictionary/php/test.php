<?php
  //if(isset($_POST["data"])){
  //  $data = $_POST["data"];
  //  echo "<p>$data</p>";
  //  $fname = "chungus.txt";//generates random name
  //  
  //  $file = fopen("dic/" . $fname, 'w');//creates new file
  //  fwrite($file, $data);
  //  fclose($file);
  //}

  header("Content-Type: application/json; charset=UTF-8");

  $data = json_decode(file_get_contents("php://input"));

  
  if($data){
    $file = fopen("dic/all_dic", 'w');//creates new file
    fwrite($file, json_encode($data));
    fclose($file);
    echo "Dictionary saved";
  }
  else{
    echo "PHP: issue receiving jpDict";
  }
  
    
?>