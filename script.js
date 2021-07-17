let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let $time = document.querySelector('#time');
let $timeHeader = document.querySelector('#time-header');
let $resultTime = document.querySelector('#result-header');
let $result = document.querySelector('#result');
let $gameTime = document.querySelector('#game-time');
let score = 0;
let colors = ['red', 'green', 'blue', 'gray', 'brown', 'yellow', 'pink'];

$start.addEventListener('click', startGame);
$game.addEventListener('click', handeBoxClick);
$gameTime.addEventListener('input', setGameTime);

function handeBoxClick(e) {
  if (e.target.dataset.box) {
    score++;
    renderBox();
  };
};

function setGameTime() {
  let time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
};

function startGame() {
  score = 0;
  setGameTime();
  $start.classList.add('hide');
  $game.style.backgroundColor = '#fff';
  $timeHeader.classList.remove('hide');
  $resultTime.classList.add('hide');

  let interval = setInterval(function () {
    let time = $time.textContent;
    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);
  renderBox();
};

function endGame() {
  $game.innerHTML = '';
  $start.classList.remove('hide');
  $game.style.backgroundColor = '#ccc';
  $timeHeader.classList.add('hide');
  $resultTime.classList.remove('hide');
  $result.textContent = score;
};

function renderBox() {
  $game.innerHTML = '';
  let gameSize = $game.getBoundingClientRect();
  let boxSize = getRandom(30, 100);
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;
  let box = document.createElement('div');
  let randomClr = colors[getRandom(0, colors.length)];

  box.style.width = box.style.height = boxSize + 'px';
  box.style.backgroundColor = randomClr;
  box.style.position = 'absolute';
  box.style.top = getRandom(0, maxTop) + 'px';
  box.style.left = getRandom(0, maxLeft) + 'px';
  box.style.cursor = 'pointer';
  box.style.borderRadius = '5px';
  box.setAttribute('data-box', 'true');
  $game.insertAdjacentElement('afterbegin', box);
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
