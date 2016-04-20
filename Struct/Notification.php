<?php

chdir(realpath(dirname(__FILE__))."/../");
require_once('Include.php');

function notification_initialize($a) {
	$n = [];
	$n['_id'] = mongo_id();
	$n['date'] = mongo_date();
	$n['type'] = $a['type'];
	$n['text'] = $a['text'];
	$n['data'] = $a['data'];
	$n['source'] = $a['source']; 
	$n['target'] = $a['target'];
	$n['link'] = sha1(rand().$forum['_id'].time());
	return $n;
}

function notification_save(&$n) {
	$ret = mongo_save("notifications",$n);
	return $ret;
}

function notification_destroy($id) {
	mongo_destroy("notifications", $id);
}

function notification_load($array) {
	$n = mongo_load("notifications", $array);
	return $n;
}

function notification_bulkLoad($array) {
	$n = mongo_bulkLoad("notifications", $array);
	return $n;
}

function notification_print(&$n) {

	$html = "";
	
	if($n['type'] == "invitation") {
		$html .= '	
			<div class="section-entry" data-id="'.$n['_id'].'">
				<div onclick="addUserToForum(this)" class="fontgrey menu-highlight forum-link">+ '.$n['text'].'</div>
				<div onclick="removeNotification(this)" class="forum-settings"><i class="fontgrey fa fa-remove"></i></div>
			</div>
		';
		return $html;
	}
	if($n['type'] == "blog_update") {
		$html .= '
			<div class="notification" data-id="'.$n['_id'].'">
				<a href="'.$n['data'].'" target="_blank" class="menu-highlight title">'.$n['text'].'</a>
				<div onclick="removeNotification(this)" class="remove"><i class="fa fa-remove"></i></div>
			</div>
		';
		return $html;
	}
}
