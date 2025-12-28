let idleSheet, walkSheet, jumpSheet, attackSheet, projectileSheet;
let idleAnim = [], walkAnim = [], jumpAnim = [], attackAnim = [], projectileAnim = [];
let bgImage;

// 待機動畫的屬性
const idleFramesCount = 8;

// 跑步動畫屬性 (Loading Screen)
const runSpriteWidth = 1547;
const runSpriteHeight = 147;
const runFramesCount = 8;

// 走路動畫的屬性
const walkFramesCount = 8;

// 跳躍動畫的屬性
const jumpFramesCount = 13;

// 攻擊動畫的屬性
const attackFramesCount = 7;

// 投射物(氣功彈)動畫的屬性
const projectileFramesCount = 5;

// 受擊動畫屬性
const ggFramesCount = 9;

// 死亡動畫屬性
const dieFramesCount = 11;

// 新角色動畫屬性
const newCharSpriteWidth = 289;
const newCharSpriteHeight = 95;
const newCharFramesCount = 7;

// 微笑動畫屬性
const smileSpriteWidth = 290;
const smileSpriteHeight = 95;
const smileFramesCount = 5;

// 跌倒動畫屬性
const fallSpriteWidth = 1161;
const fallSpriteHeight = 99;
const fallFramesCount = 11;

// 第3個角色動畫屬性
const char3SpriteWidth = 343;
const char3SpriteHeight = 40;
const char3FramesCount = 6;

// 第3個角色移動動畫屬性
const char3MoveSpriteWidth = 397;
const char3MoveSpriteHeight = 69;
const char3MoveFramesCount = 6;

// 第3個角色跌倒動畫屬性
const char3FallSpriteWidth = 226;
const char3FallSpriteHeight = 59;
const char3FallFramesCount = 3;

// 第4個角色動畫屬性
const char4SpriteWidth = 491;
const char4SpriteHeight = 70;
const char4FramesCount = 8;

// 第4個角色移動動畫屬性
const char4MoveSpriteWidth = 367;
const char4MoveSpriteHeight = 69;
const char4MoveFramesCount = 6;

// 第4個角色跌倒動畫屬性
const char4FallSpriteWidth = 739;
const char4FallSpriteHeight = 70;
const char4FallFramesCount = 12;

// 第5個角色動畫屬性
const char5SpriteWidth = 159;
const char5SpriteHeight = 88;
const char5FramesCount = 2;

// 第5個角色跑步動畫屬性
const char5RunSpriteWidth = 385;
const char5RunSpriteHeight = 88;
const char5RunFramesCount = 6;

// 第5個角色攻擊動畫屬性
const char5AttackSpriteWidth = 747;
const char5AttackSpriteHeight = 107;
const char5AttackFramesCount = 8;

// 角色狀態變數
let charX, charY;
let speed = 5;
let isWalking = false;
let facing = 1; // 1 代表朝右, -1 代表朝左
let isAttacking = false;
let attackFrame = 0;
let isHit = false;
let hitFrame = 0;
let isDying = false;
let dieFrame = 0;

// 物理變數
let velocityY = 0;
let gravity = 0.6;
let jumpForce = -15;
let isJumping = false;
let groundY;

// 投射物管理
let projectiles = [];

let ggSheet;
let ggAnim = [];

let runSheet;
let runAnim = [];

let dieSheet;
let dieAnim = [];

let newCharSheet;
let newCharAnim = [];
let newCharX, newCharY;

let char3Sheet;
let char3Anim = [];
let char3X, char3Y;

let char3MoveSheet;
let char3MoveAnim = [];
let char3FallSheet;
let char3FallAnim = [];
let isChar3Hit = false;
let char3HitStartFrame = 0;

let char4Sheet;
let char4Anim = [];
let char4X, char4Y;
let char4MoveSheet;
let char4MoveAnim = [];
let char4FallSheet;
let char4FallAnim = [];
let isChar4Hit = false;
let char4HitStartFrame = 0;
let char4Feedback = "";

let char5Sheet;
let char5Anim = [];
let char5Objects = [];
let char5RunSheet, char5AttackSheet;
let char5RunAnim = [], char5AttackAnim = [];
let wrongAnswerCount = 0;
let char5Message = "";

let lifeImage, lifelessImage;
let maxHealth = 5;
let currentHealth = 5;

let char3Message = "";
let availableQuestions = [];

let smileSheet;
let smileAnim = [];
let inputField;

let fallSheet;
let fallAnim = [];
let isChar2Hit = false;
let char2HitStartFrame = 0;
let char2Message = "";
let char2Feedback = "";
let quizTable;
let currentQuestionIndex = 0;
let isQuizFinished = false;
let isGameStarted = false;
let isGameOver = false;
let questionTarget = 3; // 初始設為3，第一次選擇問題時會切換為2
let isGameWon = false;
let completedRounds = 0;
let questionsAskedCount = 0; // 追蹤當前角色已提問數量
let questionerSequence = [];
let currentQuestionerIndex = -1;
let confetti = [];
let instructionScrollY = 0;
let isTransitioning = false;
let transitionAlpha = 0;
let loadingCharX = 0;

// Use preload() to load external files like images before setup() runs.
function preload() {
  // Ensure the path to your image is correct relative to your index.html file.
  idleSheet = loadImage('1/stop_2/stop_2_1.png');
  walkSheet = loadImage('1/walk/walk_all.png');
  jumpSheet = loadImage('1/jump/jump_all.png');
  runSheet = loadImage('1/run/run_1.png');
  attackSheet = loadImage('1/push/push_all.png');
  projectileSheet = loadImage('1/tooi/tool_all.png');
  ggSheet = loadImage('1/GG/GG_1.png');
  dieSheet = loadImage('1/die/die_1.png');
  newCharSheet = loadImage('2/STOP/stop_2.png');
  char3Sheet = loadImage('3/stop/stop_3.png');
  char3MoveSheet = loadImage('3/move/move_3.png');
  char3FallSheet = loadImage('3/falldown_3/falldown_3.png');
  char4Sheet = loadImage('4/stop/stop_4.png');
  char4MoveSheet = loadImage('4/move/move_4.png');
  char4FallSheet = loadImage('4/falldown_4/falldown_4.png');
  char5Sheet = loadImage('5/STOP/STOP_5.png');
  char5RunSheet = loadImage('5/RUN/RUN_5.png');
  char5AttackSheet = loadImage('5/ATTACK/ATTACK_5.png');
  smileSheet = loadImage('2/smile/smile_2.png');
  fallSheet = loadImage('2/fall down/falldown_2.png');
  lifeImage = loadImage('LIFE/LIFE.png');
  lifelessImage = loadImage('LIFE/LIFELESS.png');
  quizTable = loadTable('questions.csv', 'csv', 'header');
  bgImage = loadImage('0.png');
}

function setup() {
  // Create a canvas that fills the entire browser window.
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  // 初始化角色位置在畫面中央
  groundY = height / 2 + 20;
  newCharX = width / 2 - 400; // 調整位置：往左移
  newCharY = groundY + 50;
  char3X = width / 2 + 400;   // 調整位置：往右移
  char3Y = groundY + 50;

  charX = newCharX - 200; // 交換位置：原本是 char4X
  charY = groundY + 50;   // 交換位置：原本是 char4Y
  char4X = width / 2;     // 交換位置：原本是 charX
  char4Y = groundY + 60;       // 交換位置：原本是 charY

  // 初始化第5個角色 (單一實例)
  char5Objects.push({
    x: width - 200,
    y: groundY + 60,
    originalX: width - 200,
    speed: 5,
    animIndex: 0,
    state: 'idle',
    hasHit: false,
    attackReason: ''
  });

  // 裁切待機動畫
  let idleFrameWidth = idleSheet.width / idleFramesCount;
  for (let i = 0; i < idleFramesCount; i++) {
    let frame = idleSheet.get(i * idleFrameWidth, 0, idleFrameWidth, idleSheet.height);
    idleAnim.push(frame);
  }

  // 裁切跑步動畫 (Loading Screen)
  let runFrameWidth = runSpriteWidth / runFramesCount;
  for (let i = 0; i < runFramesCount; i++) {
    let frame = runSheet.get(i * runFrameWidth, 0, runFrameWidth, runSpriteHeight);
    runAnim.push(frame);
  }

  // 裁切走路動畫
  let walkFrameWidth = walkSheet.width / walkFramesCount;
  for (let i = 0; i < walkFramesCount; i++) {
    let frame = walkSheet.get(i * walkFrameWidth, 0, walkFrameWidth, walkSheet.height);
    walkAnim.push(frame);
  }

  // 裁切跳躍動畫
  let jumpFrameWidth = jumpSheet.width / jumpFramesCount;
  for (let i = 0; i < jumpFramesCount; i++) {
    let frame = jumpSheet.get(i * jumpFrameWidth, 0, jumpFrameWidth, jumpSheet.height);
    jumpAnim.push(frame);
  }

  // 裁切攻擊動畫
  let attackFrameWidth = attackSheet.width / attackFramesCount;
  for (let i = 0; i < attackFramesCount; i++) {
    let frame = attackSheet.get(i * attackFrameWidth, 0, attackFrameWidth, attackSheet.height);
    attackAnim.push(frame);
  }

  // 裁切投射物動畫
  let projectileFrameWidth = projectileSheet.width / projectileFramesCount;
  for (let i = 0; i < projectileFramesCount; i++) {
    let frame = projectileSheet.get(i * projectileFrameWidth, 0, projectileFrameWidth, projectileSheet.height);
    projectileAnim.push(frame);
  }

  // 裁切受擊動畫
  let ggFrameWidth = ggSheet.width / ggFramesCount;
  for (let i = 0; i < ggFramesCount; i++) {
    let frame = ggSheet.get(i * ggFrameWidth, 0, ggFrameWidth, ggSheet.height);
    ggAnim.push(frame);
  }

  // 裁切死亡動畫
  let dieFrameWidth = dieSheet.width / dieFramesCount;
  for (let i = 0; i < dieFramesCount; i++) {
    let frame = dieSheet.get(i * dieFrameWidth, 0, dieFrameWidth, dieSheet.height);
    dieAnim.push(frame);
  }

  // 裁切新角色動畫
  let newCharFrameWidth = newCharSpriteWidth / newCharFramesCount;
  for (let i = 0; i < newCharFramesCount; i++) {
    let frame = newCharSheet.get(i * newCharFrameWidth, 0, newCharFrameWidth, newCharSpriteHeight);
    newCharAnim.push(frame);
  }

  // 裁切第3個角色動畫
  let char3FrameWidth = char3SpriteWidth / char3FramesCount;
  for (let i = 0; i < char3FramesCount; i++) {
    let frame = char3Sheet.get(i * char3FrameWidth, 0, char3FrameWidth, char3SpriteHeight);
    char3Anim.push(frame);
  }

  // 裁切第3個角色移動動畫
  let char3MoveFrameWidth = char3MoveSpriteWidth / char3MoveFramesCount;
  for (let i = 0; i < char3MoveFramesCount; i++) {
    let frame = char3MoveSheet.get(i * char3MoveFrameWidth, 0, char3MoveFrameWidth, char3MoveSpriteHeight);
    char3MoveAnim.push(frame);
  }

  // 裁切第3個角色跌倒動畫
  let char3FallFrameWidth = char3FallSpriteWidth / char3FallFramesCount;
  for (let i = 0; i < char3FallFramesCount; i++) {
    let frame = char3FallSheet.get(i * char3FallFrameWidth, 0, char3FallFrameWidth, char3FallSpriteHeight);
    char3FallAnim.push(frame);
  }

  // 裁切第4個角色動畫
  let char4FrameWidth = char4SpriteWidth / char4FramesCount;
  for (let i = 0; i < char4FramesCount; i++) {
    let frame = char4Sheet.get(i * char4FrameWidth, 0, char4FrameWidth, char4SpriteHeight);
    char4Anim.push(frame);
  }

  // 裁切第4個角色移動動畫
  let char4MoveFrameWidth = char4MoveSpriteWidth / char4MoveFramesCount;
  for (let i = 0; i < char4MoveFramesCount; i++) {
    let frame = char4MoveSheet.get(i * char4MoveFrameWidth, 0, char4MoveFrameWidth, char4MoveSpriteHeight);
    char4MoveAnim.push(frame);
  }

  // 裁切第4個角色跌倒動畫
  let char4FallFrameWidth = char4FallSpriteWidth / char4FallFramesCount;
  for (let i = 0; i < char4FallFramesCount; i++) {
    let frame = char4FallSheet.get(i * char4FallFrameWidth, 0, char4FallFrameWidth, char4FallSpriteHeight);
    char4FallAnim.push(frame);
  }

  // 裁切第5個角色動畫
  let char5FrameWidth = char5SpriteWidth / char5FramesCount;
  for (let i = 0; i < char5FramesCount; i++) {
    let frame = char5Sheet.get(i * char5FrameWidth, 0, char5FrameWidth, char5SpriteHeight);
    char5Anim.push(frame);
  }

  // 裁切第5個角色跑步動畫
  let char5RunFrameWidth = char5RunSpriteWidth / char5RunFramesCount;
  for (let i = 0; i < char5RunFramesCount; i++) {
    let frame = char5RunSheet.get(i * char5RunFrameWidth, 0, char5RunFrameWidth, char5RunSpriteHeight);
    char5RunAnim.push(frame);
  }

  // 裁切第5個角色攻擊動畫
  let char5AttackFrameWidth = char5AttackSpriteWidth / char5AttackFramesCount;
  for (let i = 0; i < char5AttackFramesCount; i++) {
    let frame = char5AttackSheet.get(i * char5AttackFrameWidth, 0, char5AttackFrameWidth, char5AttackSpriteHeight);
    char5AttackAnim.push(frame);
  }

  // 裁切微笑動畫
  let smileFrameWidth = smileSpriteWidth / smileFramesCount;
  for (let i = 0; i < smileFramesCount; i++) {
    let frame = smileSheet.get(i * smileFrameWidth, 0, smileFrameWidth, smileSpriteHeight);
    smileAnim.push(frame);
  }

  // 裁切跌倒動畫
  let fallFrameWidth = fallSpriteWidth / fallFramesCount;
  for (let i = 0; i < fallFramesCount; i++) {
    let frame = fallSheet.get(i * fallFrameWidth, 0, fallFrameWidth, fallSpriteHeight);
    fallAnim.push(frame);
  }

  // 建立輸入框
  inputField = createInput();
  inputField.size(150); // 設定輸入框寬度
  inputField.position(0, 0); // 初始位置
  inputField.hide(); // 預設隱藏
  inputField.changed(updateMessage); // 按下 Enter 後觸發
  
  // 初始化測驗題目
  let savedState = getItem('gameState');
  if (savedState) {
    availableQuestions = savedState.availableQuestions;
    questionsAskedCount = savedState.questionsAskedCount;
    questionTarget = savedState.questionTarget;
    completedRounds = savedState.completedRounds;
    currentHealth = savedState.currentHealth;
    currentQuestionIndex = savedState.currentQuestionIndex;
    wrongAnswerCount = savedState.wrongAnswerCount;
    questionerSequence = savedState.questionerSequence;
    currentQuestionerIndex = savedState.currentQuestionerIndex;
    
    if (currentQuestionIndex !== undefined && currentQuestionIndex !== -1) {
      char2Message = quizTable.getString(currentQuestionIndex, 'question');
    }
  } else {
    if (quizTable.getRowCount() > 0) {
      for (let i = 0; i < quizTable.getRowCount(); i++) {
        availableQuestions.push(i);
      }
      questionsAskedCount = 2; // 設定初始值，確保第一次會切換角色
      questionerSequence = [2, 4, 3]; // 提問順序由左至右 (2 -> 4 -> 3)
      currentQuestionerIndex = -1;
      selectNewQuestion();
    }
    
    instructionScrollY = height; // 初始化說明文字位置在畫面底部
    loadingCharX = width / 2;
  }
}

function selectNewQuestion() {
  let isTargetChanged = false;
  if (availableQuestions.length > 0) {
    questionsAskedCount++;
    if (questionsAskedCount > 2) {
      completedRounds++;
      if (completedRounds >= 4) {
        isGameWon = true;
        isQuizFinished = true;
        return false;
      }

      currentQuestionerIndex++;
      if (currentQuestionerIndex < questionerSequence.length) {
        questionTarget = questionerSequence[currentQuestionerIndex];
        isTargetChanged = true;
      }
      questionsAskedCount = 1; // 切換後重置為1
    }
    // 從剩餘問題中隨機抽取一題
    let listIndex = floor(random(availableQuestions.length));
    currentQuestionIndex = availableQuestions[listIndex];
    availableQuestions.splice(listIndex, 1); // 從列表中移除已抽出的問題，避免重複
    char2Message = quizTable.getString(currentQuestionIndex, 'question');
    saveGameState();
    return isTargetChanged;
  } else {
    isQuizFinished = true;
    char2Message = "測驗結束！你真厲害！";
    return false;
  }
}

function draw() {
  // Set the background color to beige.
  image(bgImage, width / 2, height / 2, width, height);

  if (!isGameStarted) {
    drawStartScreen();
    return;
  }

  // --- 物理更新 ---
  if (isJumping || isAttacking) { // 攻擊時也套用重力，避免浮空
    velocityY += gravity;
    charY += velocityY;

    if (charY >= groundY + 50) {
      charY = groundY + 50;
      isJumping = false;
      velocityY = 0;
    }
  }

  // --- 邏輯更新 ---
  // 只有在不攻擊、不受傷、未死亡且遊戲未結束時才能移動
  if (!isAttacking && !isHit && !isDying && !isGameOver && !isGameWon) {
    if (keyIsDown(RIGHT_ARROW)) {
      // 判斷是否被提問者阻擋
      let targetX;
      if (questionTarget === 2) targetX = newCharX;
      else if (questionTarget === 3) targetX = char3X;
      else if (questionTarget === 4) targetX = char4X;
      
      let barrierX = targetX - 50; // 阻擋位置在角色前方

      // 如果嘗試通過阻擋點
      if (charX < barrierX && charX + speed >= barrierX) {
        charX = barrierX; // 阻止移動
        
        // 觸發角色5攻擊
        if (char5Objects.length > 0) {
          let c5 = char5Objects[0];
          if (c5.state === 'idle' || c5.state === 'return') {
            c5.state = 'run_to_player';
            c5.attackReason = 'force_pass';
            char5Message = "回答問題才能通過！";
            setTimeout(() => { char5Message = ""; }, 2000);
          }
        }
      } else {
        if (charX < width - 50) { // 限制右邊界
          charX += speed;
        }
      }

      facing = 1;
      // 只有在地面上才算走路
      isWalking = !isJumping;
    } else if (keyIsDown(LEFT_ARROW)) {
      if (charX > 50) { // 限制左邊界
        charX -= speed;
      }
      facing = -1;
      // 只有在地面上才算走路
      isWalking = !isJumping;

      // 判斷是否被提問者阻擋 (為了檢查是否退回左邊)
      let targetX;
      if (questionTarget === 2) targetX = newCharX;
      else if (questionTarget === 3) targetX = char3X;
      else if (questionTarget === 4) targetX = char4X;
      
      let barrierX = targetX - 50;

      // 如果玩家退回去（向左走），且位於提問者左邊，角色五停止攻擊
      if (char5Objects.length > 0) {
        let c5 = char5Objects[0];
        // 只有在是因為強行通過而攻擊時，退回才有效
        if (c5.state === 'run_to_player' && charX < barrierX && c5.attackReason === 'force_pass') {
          c5.state = 'return';
          char5Message = "";
        }
      }
    } else {
      isWalking = false;
    }
  }

  // --- 互動邏輯 ---
  let d = dist(charX, charY, newCharX, newCharY);
  let isNearChar2 = d < 150; // 設定觸發距離 (縮小範圍避免同時觸發)
  
  let d3 = dist(charX, charY, char3X, char3Y);
  let isNearChar3 = d3 < 150; // 設定觸發距離 (縮小範圍避免同時觸發)

  let d4 = dist(charX, charY, char4X, char4Y);
  let isNearChar4 = d4 < 150; // 設定觸發距離 (縮小範圍避免同時觸發)

  // 判斷是否接近負責提問的角色
  let isNearTarget = (questionTarget === 2 && isNearChar2) || (questionTarget === 3 && isNearChar3) || (questionTarget === 4 && isNearChar4);

  if (isNearTarget && !isGameOver && !isDying && !isGameWon) {
    // 繪製角色1上方的輸入框與提示文字
    let label = "請作答";
    push();
    textSize(20);
    let labelWidth = textWidth(label);
    let inputWidth = 150;
    let padding = 10;
    let boxWidth = labelWidth + inputWidth + (padding * 3);
    let boxHeight = 40;
    let boxY = charY - 200;

    rectMode(CENTER);
    fill('#ADD8E6'); // 方塊框顏色為淺藍
    rect(charX, boxY, boxWidth, boxHeight);

    fill(0); // 文字顏色設為黑色，以便在淺藍色背景上閱讀
    textAlign(LEFT, CENTER);
    let contentLeft = charX - (boxWidth / 2) + padding;
    text(label, contentLeft, boxY);
    pop();

    inputField.show();
    inputField.position(contentLeft + labelWidth + padding, boxY - 10);
    
    // 顯示題目文字
    push();
    textSize(20);
    let msgWidth = textWidth(char2Message); // 計算文字寬度
    rectMode(CENTER);
    fill('#edf6f9'); // 設定方框背景顏色
    
    let qX, qY;
    if (questionTarget === 2) {
      qX = newCharX;
      qY = newCharY;
    } else if (questionTarget === 3) {
      qX = char3X;
      qY = char3Y;
    } else {
      qX = char4X;
      qY = char4Y;
    }
    
    // 如果是角色3且有回饋訊息，將題目往上移，避免遮擋
    if (questionTarget === 3 && char3Message) {
      qY -= 40;
    }
    
    // 如果是角色2，將文字框往上移
    if (questionTarget === 2) {
      qY -= 40;
      if (char2Feedback) {
        qY -= 40;
      }
    }

    // 如果是角色4，將文字框往上移
    if (questionTarget === 4) {
      qY -= 40;
      if (char4Feedback) {
        qY -= 40;
      }
    }

    rect(qX, qY - 80, msgWidth + 20, 40); // 繪製方框，寬度隨文字調整
    textAlign(CENTER, CENTER); // 設定文字垂直與水平居中
    fill(0);
    text(char2Message, qX, qY - 80); // 顯示文字
    pop();
  } else {
    inputField.hide();
  }

  // --- 繪圖 ---
  // 繪製第4個角色
  push();
  translate(char4X, char4Y);
  if (charX < char4X) {
    scale(1.5, 1.5); // 角色1在左邊，角色4面向右 (相反)
  } else {
    scale(-1.5, 1.5); // 角色1在右邊，角色4翻轉面向左 (相反)
  }
  
  if (isChar4Hit) {
    // 播放跌倒動畫
    let fallFrame = floor((frameCount - char4HitStartFrame) / 5);
    if (fallFrame < char4FallFramesCount) {
      image(char4FallAnim[fallFrame], 0, 0);
    } else {
      // 動畫播放完畢，恢復正常狀態
      isChar4Hit = false;
    }
  } else {
    if (isNearChar4) {
      let char4MoveFrame = floor((frameCount / 5) % char4MoveFramesCount);
      image(char4MoveAnim[char4MoveFrame], 0, 0);
    } else {
      let char4Frame = floor((frameCount / 5) % char4FramesCount);
      image(char4Anim[char4Frame], 0, 0);
    }
  }
  pop();

  // 繪製新角色 (在原角色左邊)
  push();
  translate(newCharX, newCharY);
  if (charX < newCharX) {
    scale(-1.5, 1.5); // 角色1在左邊，角色2翻轉面向左
  } else {
    scale(1.5, 1.5); // 角色1在右邊，角色2正常面向右
  }

  if (isChar2Hit) {
    // 播放跌倒動畫
    let fallFrame = floor((frameCount - char2HitStartFrame) / 5);
    if (fallFrame < fallFramesCount) {
      image(fallAnim[fallFrame], 0, 0);
    } else {
      // 動畫播放完畢，恢復正常狀態
      isChar2Hit = false;
    }
  }
  
  if (!isChar2Hit) {
    let currentAnim = isNearChar2 ? smileAnim : newCharAnim; // 根據距離切換動畫
    let currentFramesCount = isNearChar2 ? smileFramesCount : newCharFramesCount;
    let newCharFrame = floor((frameCount / 5) % currentFramesCount);
    image(currentAnim[newCharFrame], 0, 0);
  }
  pop();

  // 繪製第3個角色 (在原角色右邊)
  push();
  translate(char3X, char3Y);
  if (charX < char3X) {
    scale(-1.5, 1.5); // 角色1在左邊時，左右反向顯示
  } else {
    scale(1.5, 1.5); // 正常顯示
  }

  if (isChar3Hit) {
    // 播放跌倒動畫
    let fallFrame = floor((frameCount - char3HitStartFrame) / 10); // 只有3張圖，播放慢一點
    if (fallFrame < char3FallFramesCount) {
      image(char3FallAnim[fallFrame], 0, 0);
    } else {
      // 動畫播放完畢，恢復正常狀態
      isChar3Hit = false;
    }
  } else {
    if (isNearChar3) { // 接近時顯示移動動畫
      let char3MoveFrame = floor((frameCount / 5) % char3MoveFramesCount);
      image(char3MoveAnim[char3MoveFrame], 0, 0);
    } else { // 遠離時恢復原本圖片
      let char3Frame = floor((frameCount / 5) % char3FramesCount);
      image(char3Anim[char3Frame], 0, 0);
    }
  }
  pop();

  // --- 繪製角色3的回饋訊息 ---
  if (char3Message) {
    push();
    textSize(20);
    let msgWidth = textWidth(char3Message);
    rectMode(CENTER);
    fill('#f0f0f0');
    // 將訊息框定位在角色3的頭上
    rect(char3X, char3Y - 80, msgWidth + 20, 40);
    textAlign(CENTER, CENTER);
    fill(0);
    text(char3Message, char3X, char3Y - 80);
    pop();
  }

  // --- 繪製角色2的回饋訊息 ---
  if (char2Feedback) {
    push();
    textSize(20);
    let msgWidth = textWidth(char2Feedback);
    rectMode(CENTER);
    fill('#f0f0f0');
    // 將訊息框定位在角色2的頭上
    rect(newCharX, newCharY - 120, msgWidth + 20, 40);
    textAlign(CENTER, CENTER);
    fill(0);
    text(char2Feedback, newCharX, newCharY - 120);
    pop();
  }

  // --- 繪製角色4的回饋訊息 ---
  if (char4Feedback) {
    push();
    textSize(20);
    let msgWidth = textWidth(char4Feedback);
    rectMode(CENTER);
    fill('#f0f0f0');
    // 將訊息框定位在角色4的頭上
    rect(char4X, char4Y - 120, msgWidth + 20, 40);
    textAlign(CENTER, CENTER);
    fill(0);
    text(char4Feedback, char4X, char4Y - 120);
    pop();
  }

  // --- 非目標角色的提示訊息 ---
  if (!isGameOver && !isDying && !isGameWon) {
    if (isNearChar2 && questionTarget !== 2 && char2Feedback === "") {
      push();
      textSize(20);
      let msg = "去找另一個角色！";
      let msgWidth = textWidth(msg);
      rectMode(CENTER);
      fill('#f0f0f0');
      rect(newCharX, newCharY - 120, msgWidth + 20, 40);
      textAlign(CENTER, CENTER);
      fill(0);
      text(msg, newCharX, newCharY - 120);
      pop();
    }

    if (isNearChar3 && questionTarget !== 3 && char3Message === "") {
      push();
      textSize(20);
      let msg = "去找另一個角色！";
      let msgWidth = textWidth(msg);
      rectMode(CENTER);
      fill('#f0f0f0');
      rect(char3X, char3Y - 80, msgWidth + 20, 40);
      textAlign(CENTER, CENTER);
      fill(0);
      text(msg, char3X, char3Y - 80);
      pop();
    }

    if (isNearChar4 && questionTarget !== 4 && char4Feedback === "") {
      push();
      textSize(20);
      let msg = "去找另一個角色！";
      let msgWidth = textWidth(msg);
      rectMode(CENTER);
      fill('#f0f0f0');
      rect(char4X, char4Y - 120, msgWidth + 20, 40);
      textAlign(CENTER, CENTER);
      fill(0);
      text(msg, char4X, char4Y - 120);
      pop();
    }
  }

  push(); // 儲存當前的繪圖狀態
  translate(charX, charY); // 將畫布原點移動到角色位置
  scale(facing, 1); // 根據 facing 的值翻轉 X 軸

  // 根據角色狀態選擇要播放的動畫
  if (isDying) {
    // 播放死亡動畫
    image(dieAnim[dieFrame], 0, 0);
    if (frameCount % 5 === 0) {
      dieFrame++;
    }
    if (dieFrame >= dieFramesCount) {
      dieFrame = dieFramesCount - 1; // 停在最後一幀
      isGameOver = true; // 遊戲結束
    }
  } else if (isHit) {
    // 播放受擊動畫
    image(ggAnim[hitFrame], 0, 0);
    if (frameCount % 5 === 0) {
      hitFrame++;
    }
    if (hitFrame >= ggFramesCount) {
      isHit = false;
      hitFrame = 0;
    }
  } else if (isAttacking) {
    // 播放一次攻擊動畫
    image(attackAnim[attackFrame], 0, 0);
    // 每隔幾幀更新一次攻擊動畫的畫格
    if (frameCount % 4 === 0) {
      attackFrame++;
    }
    // 動畫結束後
    if (attackFrame >= attackFramesCount) {
      isAttacking = false;
      attackFrame = 0;
      spawnProjectile();
    }
  } else if (isJumping) {
    // 簡單的循環播放跳躍動畫
    let currentFrame = floor((frameCount / 5) % jumpFramesCount);
    image(jumpAnim[currentFrame], 0, 0);
  } else if (isWalking) {
    let currentFrame = floor((frameCount / 4) % walkFramesCount);
    image(walkAnim[currentFrame], 0, 0);
  } else {
    let currentFrame = floor((frameCount / 5) % idleFramesCount);
    image(idleAnim[currentFrame], 0, 0);
  }
  pop(); // 恢復到 push() 之前的繪圖狀態

  // --- 第5個角色生成與更新 ---
  // 移除自動生成邏輯，改為控制單一角色

  for (let i = char5Objects.length - 1; i >= 0; i--) {
    let c = char5Objects[i];
    
    // --- 狀態邏輯 ---
    if (c.state === 'run_to_player') {
      // 走向主角
      if (dist(c.x, c.y, charX, charY) < 100) {
        c.state = 'attack';
        c.animIndex = 0;
        c.hasHit = false;
      } else {
        if (c.x > charX) c.x -= c.speed;
        else c.x += c.speed;
      }
    } else if (c.state === 'return') {
      // 返回原位
      if (abs(c.x - c.originalX) < c.speed) {
        c.x = c.originalX;
        c.state = 'idle';
      } else {
        if (c.x > c.originalX) c.x -= c.speed;
        else c.x += c.speed;
      }
    }

    // --- 動畫選擇 ---
    if (c.state === 'attack') {
      c.animIndex += 0.1; // 攻擊時加快動畫速度
    } else {
      c.animIndex += 0.1; // 一般動畫速度
    }
    let currentAnim = char5Anim;
    let maxFrames = char5FramesCount;

    if (c.state === 'run_to_player' || c.state === 'return') {
      currentAnim = char5RunAnim;
      maxFrames = char5RunFramesCount;
    } else if (c.state === 'attack') {
      currentAnim = char5AttackAnim;
      maxFrames = char5AttackFramesCount;
      
      // 在倒數第二張圖片時觸發受擊
      if (!c.hasHit && floor(c.animIndex) >= maxFrames - 2) {
        c.hasHit = true;
        if (currentHealth > 0) currentHealth--;
        saveGameState();

        if (currentHealth <= 0) {
          // 生命歸零，觸發死亡
          isDying = true;
          dieFrame = 0;
          isAttacking = false;
        } else {
          // 還有生命，觸發受擊
          isHit = true;
          hitFrame = 0;
          isAttacking = false;
        }
      }

      // 攻擊動畫播放完畢後
      if (floor(c.animIndex) >= maxFrames) {
        if (c.attackReason === 'force_pass') {
          // 判斷玩家是否還在阻擋區域 (未退回)
          let targetX;
          if (questionTarget === 2) targetX = newCharX;
          else if (questionTarget === 3) targetX = char3X;
          else if (questionTarget === 4) targetX = char4X;
          
          let barrierX = targetX - 50;

          if (charX >= barrierX - 10) {
            // 玩家未退回，繼續攻擊
            c.state = 'run_to_player';
            char5Message = "還不退後！";
            setTimeout(() => { char5Message = ""; }, 1000);
          } else {
            // 玩家已退回，返回原位
            c.state = 'return';
          }
        } else {
          c.state = 'return';
        }
        c.animIndex = 0;
      }
    }

    let frameIndex = floor(c.animIndex) % maxFrames;
    
    push();
    translate(c.x, c.y);
    // 根據目標位置決定面向
    let targetX = (c.state === 'return') ? c.originalX : charX;
    if (targetX < c.x) {
      scale(-1, 1); // 角色1在左邊，翻轉面向左 (原圖面向右)
    } else {
      scale(1, 1); // 角色1在右邊，正常面向右
    }
    image(currentAnim[frameIndex], 0, 0);
    pop();

    // 繪製角色5的回饋訊息
    if (char5Message) {
      push();
      textSize(20);
      let msgWidth = textWidth(char5Message);
      rectMode(CENTER);
      fill('#f0f0f0');
      rect(c.x, c.y - 60, msgWidth + 20, 40);
      textAlign(CENTER, CENTER);
      fill(0);
      text(char5Message, c.x, c.y - 60);
      pop();
    }
  }

  // --- 更新與繪製投射物 ---
  for (let i = projectiles.length - 1; i >= 0; i--) {
    let p = projectiles[i];
    p.x += p.speed * p.facing;

    push();
    translate(p.x, p.y);
    scale(p.facing, 1);
    let currentFrame = floor((frameCount / 3) % projectileFramesCount);
    image(projectileAnim[currentFrame], 0, 0);
    pop();

    // 碰撞偵測：投射物與角色2
    // 簡單的距離偵測，距離小於 100 像素視為擊中 (考慮到角色2放大了1.5倍)
    if (!isChar2Hit && dist(p.x, p.y, newCharX, newCharY) < 100) {
      isChar2Hit = true;
      char2HitStartFrame = frameCount; // 紀錄開始播放跌倒動畫的時間點
      projectiles.splice(i, 1); // 移除投射物

      // 觸發角色5攻擊
      if (char5Objects.length > 0) {
        let c5 = char5Objects[0];
        c5.state = 'run_to_player';
        c5.attackReason = 'protect_char2';
        char5Message = "不准欺負人！";
        setTimeout(() => { char5Message = ""; }, 2000);
      }

      continue; // 跳過這次迴圈的後續處理
    }

    // 碰撞偵測：投射物與角色3
    if (!isChar3Hit && dist(p.x, p.y, char3X, char3Y) < 100) {
      isChar3Hit = true;
      char3HitStartFrame = frameCount;
      projectiles.splice(i, 1);

      // 觸發角色5攻擊
      if (char5Objects.length > 0) {
        let c5 = char5Objects[0];
        c5.state = 'run_to_player';
        c5.attackReason = 'protect_char3';
        char5Message = "不准欺負人！";
        setTimeout(() => { char5Message = ""; }, 2000);
      }

      continue;
    }

    // 碰撞偵測：投射物與角色4
    if (!isChar4Hit && dist(p.x, p.y, char4X, char4Y) < 100) {
      isChar4Hit = true;
      char4HitStartFrame = frameCount;
      projectiles.splice(i, 1);

      // 觸發角色5攻擊
      if (char5Objects.length > 0) {
        let c5 = char5Objects[0];
        c5.state = 'run_to_player';
        c5.attackReason = 'protect_char4';
        char5Message = "不准欺負人！";
        setTimeout(() => { char5Message = ""; }, 2000);
      }

      continue;
    }

    // 如果投射物飛出畫面，則將其從陣列中移除
    if (p.x > width + 50 || p.x < -50) {
      projectiles.splice(i, 1);
    }
  }

  // --- 繪製生命值 (UI) ---
  for (let i = 0; i < maxHealth; i++) {
    let x = 50 + i * 40; // 起始 X 座標與間距
    let y = 50;          // Y 座標
    if (i < currentHealth) {
      image(lifeImage, x, y, 35, 35); // 顯示有生命的愛心
    } else {
      image(lifelessImage, x, y, 35, 35); // 顯示失去生命的愛心
    }
  }

  // --- 繪製關卡資訊 (UI) ---
  if (!isGameOver && !isGameWon && !isDying && isGameStarted) {
    push();
    textSize(24);
    fill(255);
    stroke(0);
    strokeWeight(3);
    textAlign(RIGHT, TOP);
    text(`關卡: ${completedRounds} / 3`, width - 30, 30);
    text(`進度: ${questionsAskedCount} / 2`, width - 30, 60);
    pop();
  }

  // --- 遊戲結束畫面 ---
  if (isGameOver) {
    drawGameOverScreen();
  }

  if (isGameWon) {
    drawGameWonScreen();
  }
}

function updateMessage() {
  if (isQuizFinished || currentQuestionIndex === -1 || isGameOver || isDying || isGameWon) return;

  let currentAns = quizTable.getString(currentQuestionIndex, 'answer');
  let userAns = this.value();

  if (userAns === "下一題") {
    questionsAskedCount--; // 保持當前提問者
    selectNewQuestion();
    this.value('');
    return;
  }
  
  let feedbackText = "";
  if (userAns === currentAns) {
    wrongAnswerCount = 0; // 答對重置錯誤計數
    // 答對了
    feedbackText = quizTable.getString(currentQuestionIndex, 'correct_feedback');
    let targetChanged = selectNewQuestion();

    if (targetChanged) {
      feedbackText = "答對了！去找下一個提問者！";
    }

    // 通過關卡後（切換提問者或遊戲通關），角色五停止攻擊
    if (targetChanged || isGameWon) {
      if (char5Objects.length > 0) {
        char5Objects[0].state = 'return';
        char5Message = "";
      }
    }

    // 答對時維持原有邏輯 (由角色2或3回答)
    let d2 = dist(charX, charY, newCharX, newCharY);
    let d3 = dist(charX, charY, char3X, char3Y);
    let d4 = dist(charX, charY, char4X, char4Y);

    if (d2 < d3 && d2 < d4) {
      char2Feedback = feedbackText;
      setTimeout(() => { char2Feedback = ""; }, 2000);
    } else if (d3 < d2 && d3 < d4) {
      char3Message = feedbackText;
      setTimeout(() => { char3Message = ""; }, 2000);
    } else {
      char4Feedback = feedbackText;
      setTimeout(() => { char4Feedback = ""; }, 2000);
    }
  } else {
    // 答錯了
    wrongAnswerCount++;
    saveGameState();
    let wrongFeedback = quizTable.getString(currentQuestionIndex, 'wrong_feedback');
    let hintMsg = quizTable.getString(currentQuestionIndex, 'hint');
    
    if (wrongAnswerCount === 1) {
      // 第一次答錯：提問者給反饋，角色5給提示
      if (questionTarget === 2) {
        char2Feedback = wrongFeedback;
        setTimeout(() => { char2Feedback = ""; }, 3000);
      } else if (questionTarget === 3) {
        char3Message = wrongFeedback;
        setTimeout(() => { char3Message = ""; }, 3000);
      } else if (questionTarget === 4) {
        char4Feedback = wrongFeedback;
        setTimeout(() => { char4Feedback = ""; }, 3000);
      }

      char5Message = hintMsg;
      setTimeout(() => { char5Message = ""; }, 3000);
    } else if (wrongAnswerCount >= 2) {
      // 連續答錯第二次：角色5攻擊
      char5Message = "你惹毛我了！";
      setTimeout(() => { char5Message = ""; }, 2000);
      if (char5Objects.length > 0) {
        char5Objects[0].state = 'run_to_player';
        char5Objects[0].attackReason = 'wrong_answer';
      }
      wrongAnswerCount = 0; // 攻擊後重置計數，避免無限攻擊
    }
  }

  this.value(''); // 不論對錯都清空輸入框
}

// 使用 keyPressed 處理單次按鍵事件
function keyPressed() {
  // 按下向上鍵且角色在地面上時觸發跳躍
  if (keyCode === UP_ARROW && !isJumping && !isAttacking && !isHit && !isDying && !isGameOver && !isGameWon) {
    isJumping = true;
    velocityY = jumpForce;
  }

  // 按下向下鍵且角色在地面上時觸發攻擊 (原本是空白鍵)
  if (keyCode === DOWN_ARROW && !isJumping && !isAttacking && !isHit && !isDying && !isGameOver && !isGameWon) {
    isAttacking = true;
    isWalking = false; // 攻擊時停止走路
    attackFrame = 0; // 重置攻擊動畫
  }
}

function spawnProjectile() {
  let p = {
    x: charX + (facing * 60), // 在角色前方產生
    y: charY - 20, // 調整Y軸位置
    facing: facing,
    speed: 12
  };
  projectiles.push(p);
}

// This function is called automatically whenever the browser window is resized.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawStartScreen() {
  push();
  fill(0, 0, 0, 150); // 半透明黑色背景
  rectMode(CORNER);
  rect(0, 0, width, height);

  // --- 跑馬燈說明文字 ---
  let instructions = [
    "遊戲說明",
    "",
    "1. 操作：左右鍵移動，上鍵跳躍，下鍵攻擊",
    "2. 規則：共三關，每關需答對兩題才可通過",
    "3. 互動：靠近角色輸入答案按Enter，答對前進",
    "4. 懲罰：答錯兩次或強行闖關會受到守衛攻擊",
    "5. 勝負：生命值歸零失敗，完成所有關卡獲勝"
  ];

  let lineHeight = 50;
  let totalHeight = instructions.length * lineHeight;

  // 更新捲動位置
  instructionScrollY -= 1.5; // 捲動速度
  if (instructionScrollY < -totalHeight) {
    instructionScrollY = height; // 循環播放
  }

  textAlign(CENTER, CENTER);
  textSize(28);
  fill(255, 255, 200); // 淺黃色文字
  
  for (let i = 0; i < instructions.length; i++) {
    let y = instructionScrollY + i * lineHeight;
    // 只繪製在畫面範圍內的文字
    if (y > -50 && y < height + 50) {
      text(instructions[i], width / 2, y);
    }
  }

  // --- 中間跑步動畫 ---
  let runFrame = floor((frameCount / 4) % runFramesCount);
  
  if (isTransitioning) {
    loadingCharX += 10;
    transitionAlpha += 2.5;
  } else {
    loadingCharX = width / 2;
    transitionAlpha = 0;
  }
  image(runAnim[runFrame], loadingCharX, groundY + 50);

  // 開始按鈕
  if (!isTransitioning) {
    rectMode(CENTER);
    fill(100, 200, 100);
    stroke(255);
    strokeWeight(2);
    rect(width / 2, height - 100, 150, 50, 10);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text("開始遊戲", width / 2, height - 100);
  }

  if (isTransitioning) {
    push();
    fill(0, transitionAlpha);
    rectMode(CORNER);
    noStroke();
    rect(0, 0, width, height);
    pop();

    if (transitionAlpha >= 255) {
      isGameStarted = true;
      isTransitioning = false;
    }
  }
  pop();
}

function mousePressed() {
  if (!isGameStarted && !isTransitioning) {
    // 檢查是否點擊到開始按鈕 (寬150, 高50, 中心在 width/2, height - 100)
    if (mouseX > width / 2 - 75 && mouseX < width / 2 + 75 &&
        mouseY > height - 125 && mouseY < height - 75) {
      // 重置遊戲狀態
      removeItem('gameState');
      
      currentHealth = maxHealth;
      isGameOver = false;
      isGameWon = false;
      isQuizFinished = false;
      completedRounds = 0;
      wrongAnswerCount = 0;
      
      isDying = false;
      dieFrame = 0;
      isHit = false;
      hitFrame = 0;
      isAttacking = false;
      attackFrame = 0;
      isJumping = false;
      velocityY = 0;
      
      char5Message = "";
      char2Feedback = "";
      char3Message = "";
      char4Feedback = "";
      
      // 重置位置
      groundY = height / 2 + 20;
      newCharX = width / 2 - 400;
      newCharY = groundY + 50;
      char3X = width / 2 + 400;
      char3Y = groundY + 50;
      charX = newCharX - 200;
      charY = groundY + 50;
      char4X = width / 2;
      char4Y = groundY + 60;
      
      // 重置角色5
      char5Objects = [];
      char5Objects.push({
        x: width - 200,
        y: groundY + 60,
        originalX: width - 200,
        speed: 5,
        animIndex: 0,
        state: 'idle',
        hasHit: false,
        attackReason: ''
      });
      
      // 重置投射物
      projectiles = [];
      
      // 重置題目
      availableQuestions = [];
      if (quizTable.getRowCount() > 0) {
        for (let i = 0; i < quizTable.getRowCount(); i++) {
          availableQuestions.push(i);
        }
      }
      questionsAskedCount = 2;
      questionerSequence = [2, 4, 3];
      currentQuestionerIndex = -1;
      confetti = [];
      
      selectNewQuestion();

      isTransitioning = true;
    }
  }

  if (isGameOver) {
    // 檢查是否點擊到重新開始按鈕 (右下角)
    let btnX = width - 120;
    let btnY = height - 60;
    if (mouseX > btnX - 80 && mouseX < btnX + 80 &&
        mouseY > btnY - 25 && mouseY < btnY + 25) {
      removeItem('gameState');
      window.location.reload();
    }
  }

  if (isGameWon) {
    // 檢查是否點擊到重新開始按鈕 (右下角)
    let btnX = width - 120;
    let btnY = height - 60;
    if (mouseX > btnX - 80 && mouseX < btnX + 80 &&
        mouseY > btnY - 25 && mouseY < btnY + 25) {
      removeItem('gameState');
      window.location.reload();
    }
  }
}

function drawGameOverScreen() {
  push();
  fill(0, 0, 0, 150); // 半透明黑色背景
  rectMode(CORNER);
  rect(0, 0, width, height);

  fill(255, 50, 50);
  textAlign(CENTER, CENTER);
  textSize(64);
  text("GAME OVER", width / 2, height / 2);
  
  fill(255);
  textSize(32);
  text("重新整理頁面以重新開始", width / 2, height / 2 + 60);

  // 重新開始按鈕
  rectMode(CENTER);
  fill(100, 200, 100);
  let btnX = width - 120;
  let btnY = height - 60;
  rect(btnX, btnY, 160, 50, 10);
  
  fill(255);
  textSize(24);
  text("重新開始", btnX, btnY);
  pop();
}

function saveGameState() {
  let gameState = {
    availableQuestions: availableQuestions,
    questionsAskedCount: questionsAskedCount,
    questionTarget: questionTarget,
    completedRounds: completedRounds,
    currentHealth: currentHealth,
    currentQuestionIndex: currentQuestionIndex,
    wrongAnswerCount: wrongAnswerCount
  };
  storeItem('gameState', gameState);
}

function drawGameWonScreen() {
  push();
  fill(0, 0, 0, 200); // 加深背景顏色
  rectMode(CORNER);
  rect(0, 0, width, height);

  // --- 彩帶特效 ---
  if (confetti.length === 0) {
    for (let i = 0; i < 150; i++) {
      confetti.push({
        x: random(width),
        y: random(-height, 0),
        color: color(random(100, 255), random(100, 255), random(100, 255)),
        speed: random(2, 6),
        size: random(5, 10),
        angle: random(TWO_PI)
      });
    }
  }

  for (let p of confetti) {
    fill(p.color);
    noStroke();
    push();
    translate(p.x, p.y);
    rotate(p.angle);
    rect(0, 0, p.size, p.size);
    pop();
    p.y += p.speed;
    p.angle += 0.1;
    if (p.y > height) {
      p.y = random(-50, 0);
      p.x = random(width);
    }
  }

  // --- 勝利文字 ---
  textAlign(CENTER, CENTER);
  textSize(80);
  fill(255, 215, 0); // 金色
  stroke(255);
  strokeWeight(5);
  text("恭喜過關！", width / 2, height / 2 - 150);
  
  textSize(32);
  fill(255);
  noStroke();
  text("你真是太棒了！", width / 2, height / 2 - 80);

  // --- 角色慶祝動畫 ---
  // 角色2 (微笑)
  push();
  translate(width / 2, height / 2 + 50);
  scale(1.5, 1.5);
  let smileFrame = floor((frameCount / 5) % smileFramesCount);
  image(smileAnim[smileFrame], 0, 0);
  pop();
  
  // --- 重新開始按鈕 ---
  rectMode(CENTER);
  fill(100, 200, 100);
  stroke(255);
  strokeWeight(2);
  let btnX = width - 120;
  let btnY = height - 60;
  
  // 滑鼠懸停效果
  if (mouseX > btnX - 80 && mouseX < btnX + 80 &&
      mouseY > btnY - 25 && mouseY < btnY + 25) {
    fill(120, 220, 120);
  }

  rect(btnX, btnY, 160, 50, 10);
  
  fill(255);
  noStroke();
  textSize(24);
  text("重新開始", btnX, btnY);
  pop();
}
