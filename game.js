var score = 0;
var lives = 3;
var gameRunning = false;

var catcherX = 180;
var itemX = 0;
var itemY = 0;
var itemIsBad = false; 

var area = document.getElementById('area');
var catcher = document.getElementById('catcher');
var scoreEl = document.getElementById('score');
var livesEl = document.getElementById('lives');
var overlay = document.getElementById('overlay');


document.addEventListener('keydown', function(event) {
  if (gameRunning === false) return;
  
  if (event.key === 'ArrowLeft') {
    catcherX = catcherX - 20;
  }
  if (event.key === 'ArrowRight') {
    catcherX = catcherX + 20;
  }
  

  if (catcherX < 0) catcherX = 0;
  if (catcherX > 350) catcherX = 350;
  
  catcher.style.left = catcherX + 'px';
});


function startGame() {
  score = 0;
  lives = 3;
  gameRunning = true;
  
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  overlay.style.display = 'none'; 
  
  resetItem();
  runGameLoop();
}


function resetItem() {
  itemY = 0;
  itemX = Math.floor(Math.random() * 350); 
  
  
  if (Math.random() < 0.25) {
    itemIsBad = true;
    area.innerHTML = '<div class="catcher" id="catcher" style="left:' + catcherX + 'px">🍽️</div>' +
                     '<div class="item" id="fallingItem" style="left:' + itemX + 'px; top:0px;">🥦</div>';
  } else {
    itemIsBad = false;
    area.innerHTML = '<div class="catcher" id="catcher" style="left:' + catcherX + 'px">🍽️</div>' +
                     '<div class="item" id="fallingItem" style="left:' + itemX + 'px; top:0px;">🍕</div>';
  }
  
  
  catcher = document.getElementById('catcher');
}

// Main driving loop that updates elements step-by-step
function runGameLoop() {
  if (gameRunning === false) return;

  itemY = itemY + 5; // Change this number to make the item fall faster or slower
  var fallingItem = document.getElementById('fallingItem');
  if (fallingItem) {
    fallingItem.style.top = itemY + 'px';
  }

  // Collision Check: Has the item reached player platform height?
  if (itemY > 440) {
    var distance = Math.abs(itemX - catcherX);
    
    if (distance < 40) {
      // Caught item safely!
      if (itemIsBad === true) {
        lives = lives - 1;
      } else {
        score = score + 1;
      }
      
      scoreEl.textContent = score;
      livesEl.textContent = lives;
      
      if (lives <= 0) {
        endGame();
        return;
      }
      resetItem();
    }
  }

  // Missing Check: Item passed beneath screen borders safely
  if (itemY > 500) {
    resetItem();
  }

  // Runs this loop function again every 20 milliseconds
  setTimeout(runGameLoop, 20);
}

function endGame() {
  gameRunning = false;
  overlay.style.display = 'block'; // Show start screen menu overlay
  overlay.innerHTML = '<h2>Game Over! Score: ' + score + '</h2><button onclick="startGame()">Play Again</button>';
}