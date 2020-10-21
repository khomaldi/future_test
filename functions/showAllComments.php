<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/core/variables.php');
require_once(ROOTDIR . 'classes/Comment.php');



function showAllComments()
{
  $comment = new Comment();

  // Получаем массив со всеми комментами
  $comments = $comment->loadAll();

  // Переменная для всех commentLine
  // Функция будет возвращать эту переменную
  $commentLines = '';

  // Перебираем массив и выводим комменты
  foreach ($comments as $item) {
    // Не склеил всё в одну строку за один раз,
    // чтобы было видно структуру.
    //
    // PHP_EOL чтобы в html'е структуру сохранить.
    $commentLine = '    <div class="comments__line">' . PHP_EOL;
    $commentLine .= '      <div class="comments__info">' . PHP_EOL;
    $commentLine .= '        <p class="comments__name">' . $item->name . '</p>' . PHP_EOL;
    $commentLine .= '        <div class="comments__date-container">' . PHP_EOL;
    $commentLine .= '          <p class="comments__time">' . $item->time . '</p>' . PHP_EOL;
    $commentLine .= '          <p class="comments__date">' . $item->date . '</p>' . PHP_EOL;
    $commentLine .= '        </div>' . PHP_EOL;
    $commentLine .= '      </div>' . PHP_EOL;
    $commentLine .= '      <p class="comments__text">' . nl2br($item->comment) . '</p>' . PHP_EOL;
    $commentLine .= '    </div>' . PHP_EOL;

    $commentLines .= $commentLine;
  }

  return $commentLines;
}
?>