<?php
chdir(realpath(dirname(__FILE__).'/../'));
require_once('Core/Post.php');
require_once('Core/Location.php');
require_once('Core/Configuration.php');
require_once('Core/Utils.php');
require_once('Core/Print_post.php');
require_once('Core/Forum.php');
require_once('Core/Miniature.php');

$pid = (String) $_POST['pid'];
$text = (String) $_POST['text'];
$forum = (String) $_POST['forum'];
$uid = (String) $_POST['uid'];
$parent = (String) $_POST['parent'];


// look for a preview
$ret = preg_match("/https?:\/\/[\w\/=?~,.%&+\-#\!]+/i",$text,$matches);
if($ret != false && count($matches) > 0) {
	$preview = $matches[0];
} else {
	$preview = "";
}

// building response...
if($preview != "") {
	// generating the miniature if it's not already done
	$link = gen_miniature($preview);
	if($link != false && $link != "") {
		$url_prev = $link;
	}
} 
// default placeholder image
if($url_prev == "" || $url_prev == null) {
	$url_prev = p2l(pathTo("placeholder", "assets", "jpg"));
}

if($pid == null || $pid == 0) {
	if($parent == null || $parent == 0) {
		// new post
		$p = post_initialize($text, $uid, $preview, $forum);
		post_save($p);
		$f = forum_load($forum);
		forum_post2news($f, $p['_id']);
		forum_save($f);
	} else {
		// new com
		$p = post_load($parent);
		$c = post_initialize($text, $uid, $preview, $forum, $p['_id']);
		post_addChild($p, $c['_id']);
		post_save($c);
		post_save($p);
		$f = forum_load($forum);
		forum_post2news($p);
		forum_save($f);
	}
} else {
	// editing post or com
	$p = post_load($pid);
	post_update($p, array('text'=>$text,'preview'=>$preview));
	post_save($p);
}

$r = new stdClass();
$r->preview = $url_prev;
$r->miniature = $url_prev;
$r->prev = $preview;
$r->id = (String) $p['_id'];
$r->text = $text;
$r->parent = $parent;
$r->pid = $pid;

if($parent != null && $parent != 0) {
	$r->html = print_post($c['_id'], $uid);
}

header('Content-Type: text/json; charset=UTF-8');
echo(json_encode($r));

?>
