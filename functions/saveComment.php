<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/core/variables.php');
require_once(ROOTDIR . 'classes/Comment.php');

$data = $_POST;

if ($data['name'] != '' && $data['comment'] != '' && $data['time'] != '' && $data['date'] != '') {
  showAllComments($data['name'], $data['comment'], $data['time'], $data['date']);
}

function showAllComments($name, $comment, $time, $date)
{
  $newComment = new Comment();

  $result = $newComment->save($name, $comment, $time, $date);
  if ($result) {
    echo true;
  } else {
    echo $result;
  }
}