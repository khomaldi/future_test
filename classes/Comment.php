<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/core/variables.php');
require_once(ROOTDIR . 'core/sql.php');

class Comment
{
  public function __construct()
  {
  }

  // Получает из базы все комментарии
  public function loadAll()
  {
    return R::findAll('comments');
  }

  // Сохраняет коммент в базу
  public function save($name, $comment, $time, $date)
  {
    $query = R::dispense('comments');
    
    $query->date = $date;
    $query->time = $time;
    $query->name = $name;
    $query->comment = $comment;

    $result = R::store($query);

    if ($result) {
      return true;
    } else {
      return $result;
    }
  }
}
