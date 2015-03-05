<?php
// require_once("/var/www/html/wp-load.php");
require_once("C:/xampp/htdocs/wp-load.php");
header('Content-Type: application/json');
$result = new stdClass();
$result->messages = array();
if (!is_user_logged_in()) {
	array_push($result->messages, status('error', 'You are not logged in! Please login to continue.'));
}
$current_user = wp_get_current_user();
$current_user = $current_user->data->user_login;
$db = new wpdb('leaveManagement', 'D8H4nHcS9zJvLR3Q', 'leaveManagement', 'localhost');
$db->show_errors();

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

switch($_GET['handler']) {
	case 'Grab Employee Requests':
	
		$result->results = $db->get_results("SELECT * FROM requests");
		
		// debug('clear');
		// debug($result->results, true);
	
		$emp = new stdClass();
		$empinfo = new stdClass();
		foreach ($result->results as $employee) {
			$empinfo = new stdClass();
			// debug($employee, true);
			$empinfo->id = $employee->id;
			$empinfo->date = $employee->date;
			$empinfo->type = $employee->type;
			$empinfo->status = $employee->status;
			$empinfo->comments = $employee->comments;
			$empinfo->managerComments = $employee->managerComments;
			$empinfo->user = $employee->user;
			// debug($employee, true);
			
			if(!$emp->{$employee->user}) {
				$emp->{$employee->user} = [$empinfo];
			} else {
				array_push($emp->{$employee->user}, $empinfo);
			}
		}
		// debug($emp, true);
		
		$result->empKey = $emp;
		// $result = $emp;
	break;
	case 'Submit Request':
		$d1 = strtotime($data->date);
		$d2 = strtotime($data->endDate);
		
		$diff = $d2 - $d1;
		$diff = floor($diff/(60*60*24));
		// debug('clear');
		// debug($data, true);
		// debug($diff);
		
		
		$insert = true;
		for ($i=0; $i<=$diff; $i++) {
			if ($insert) {
				$insert = $db->insert(
					'requests', 
					array( 
						'date' => date("Y-m-d", strtotime($data->date.' + '.$i.' day')),
						'status' => 'new',
						'type' => $data->type,
						// 'groupid' => 
						'comments' => $data->comments,
						'user' => $current_user
					), 
					array( 
						'%s'
					) 
				);
			} else {
				array_push($result->messages, status('error'));
				echo json_encode($result, JSON_NUMERIC_CHECK);
				die();
			}
		}
		
		if (!$insert) {
			array_push($result->messages, status('error'));
		} else {
			array_push($result->messages, status('success', 'Request Submitted!'));
		}
	break;
	case 'Update Request':
		debug('clear');
		// debug($data, true);
				  
		$result->update = $db->update(
			'requests', 
			array( 
				'date' => $data->date,
				'type' => $data->type,
				'status' => $data->status,
				'comments' => $data->comments,
				'managerComments' => $data->managerComments,
			), 
			array( 'id' => $data->id ),
			array( 
				'%s',
				'%s',
				'%s',
				'%s',
				'%s'
			), 
			array( '%d' ) 
		);
		
		// $result->arbitrators = $db->get_results("SELECT * FROM arbitrators");
		debug($result->update);
		if (isset($result->update)) {
			if ($result->update === 0) {
				array_push($result->messages, status('info', 'Nothing Changed!'));
			} else {
				array_push($result->messages, status('success', 'Request Updated!'));
			}
		} else {
			array_push($result->messages, status('error'));
		}
	break;
}

echo json_encode($result, JSON_NUMERIC_CHECK);

function status($statVal, $textVal=false) {
	if ( !$textVal ) {
		switch ($statVal) {
			case 'success':
				$textVal = "Success!";
			break;
			case 'warning':
				$textVal = "Warning.";
			break;
			case 'error':
				$textVal = "An error has occurred.";
			break;
			case 'info':
				$textVal = "Info";
			break;
		}
	}
	
	return array(
		"text"		=>	$textVal,
		"severity"	=>	$statVal
	);
}

function debug($dbgVal, $printr = false, $label = false) {
	global $db;
	$table = 'debug';
	$bktrc = debug_backtrace();
	if($dbgVal === 'clear') {
		$db->query("DELETE FROM ".$table." WHERE 1");
	} else {
		if ($printr) {
			$dbgVal = print_r($dbgVal, true);
		}
		if (!$label) {
			$label = '';
		}
		$db->insert(
			$table,
			array(
				'val' => $dbgVal,
				'line' => $bktrc[0]['line'],
				'label' => $label,
				'backtrace' => print_r($bktrc, true)
			), 
			array(
				'%s',
				'%d',
				'%s',
				'%s'
			)
		);
	}
	return true;
}