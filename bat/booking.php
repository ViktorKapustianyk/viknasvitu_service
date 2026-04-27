<?php
	$ownerEmail = $_POST["owner_email"];
	$senderHost = isset($_POST["sender"]) ? preg_replace('/[^a-z0-9.-]/i', '', $_POST["sender"]) : 'localhost';
	if (!$senderHost) {
		$senderHost = 'localhost';
	}
	$fromEmail = 'no-reply@' . $senderHost;
	$headers = 'From: ' . $fromEmail . "\r\n";
	$headers .= 'Reply-To: ' . $fromEmail . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
	$subject = 'An order from your site visitor';
	$messageBody = "";	
	
	$arr=array();
	$arr=$_POST;
	foreach ($arr as $key => $value) {
	   echo "$key".': '."$value".'&';
	   if (($value != 'nope') && ($key != 'owner_email') && ($key != 'sender')) {
		   $messageBody .="$key" . ': '."$value" . "\n\n";
		}
	}
		
	try{
		echo $_POST['Email'];
		echo $subject;
		echo $messageBody;

		if(!mail($ownerEmail, $subject, $messageBody, $headers)){
			throw new Exception('mail failed');
		}else{
			echo 'mail sent';
		}
	}catch(Exception $e){
		echo $e->getMessage() ."\n";
	}
?>