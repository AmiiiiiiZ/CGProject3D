

<?php

    class MyDB extends SQLite3
   {
      function __construct()
      {
		  // Open database...
         $this->open('test.db');
      }
   }
   
   $db = new MyDB();
   
   if(!$db){
      echo $db->lastErrorMsg();
   } else {
      echo "Opened database successfully\n";
   }
   
   
   
   // Close database.
   $db->close();
?>