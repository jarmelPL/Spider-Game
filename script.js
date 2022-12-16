const startBtn = document.querySelector('.start')
const highscoreBtn = document.querySelector('.highscore')
const instructionBtn = document.querySelector('.instruction')
const spiderImg = document.querySelectorAll('.spider-img')
const menuBtns = document.querySelector('.menu__btns')
const backBtn1 = document.querySelectorAll('.back1')
const backBtn2 = document.querySelector('.back2')
const difficulty = document.querySelector('.menu__difficulty')
const easyBtn = document.querySelector('.easy')
const hardBtn = document.querySelector('.hard')
const playBtn = document.querySelector('.play')
const nameMenu = document.querySelector('.menu__name')
const nameInput = document.querySelector('.menu__name-input')
const highscores = document.querySelector('.menu__highscores')
const instructionMenu = document.querySelector('.menu__instruction')
const menu = document.querySelector('.menu')
const appArea = document.querySelector('.app-area')
const gameOverMenu = document.querySelector('.game__gameover')
const restartBtn = document.querySelector('.game__gameover-btn')
const gameOverNewHighscore = document.querySelector('.game__gameover-highscore')

const player = document.querySelector('.game__player')
const game = document.querySelector('.game')
const time = document.querySelector('.inventory__time-seconds')
const score = document.querySelector('.current-points')
const returnToMenu = document.querySelector('.inventory__menu-return')
const addedPoints = document.querySelector('.added-points')

let position = {
    x: 50,
    y: 50,
}

let startMoving = false;
let speed;
let currentScore=0;
let remainingTime=29;

let nickName;
let finalScore;
let gameResult={};
let highscoreTable=[];

let rightInterval;
let leftInterval;
let downInterval;
let upInterval;
let countdownInterval;
let goalInterval;
let bonusGoalInterval;
let bonusGoalTimeout;


let flags = {
    right: false,
    left: false,
    down: false,
    up: false,
    time: false,
    start: false,
    gameOver: false,
}

const clearAll = () => {
    clearMoveIntervals()
    clearInterval(goalInterval)
    clearInterval(bonusGoalInterval)
    clearInterval(countdownInterval)
    clearTimeout(bonusGoalTimeout)
}

const clearMoveIntervals = () => {
    clearInterval(leftInterval)
    clearInterval(rightInterval)
    clearInterval(downInterval)
    clearInterval(upInterval)
}

const resetGame = () => {
    clearAll()

    game.style.backgroundColor='rgba(180, 245, 245, .5)'
    game.classList.remove('game-over')
    gameOverMenu.classList.remove('game-over2')

    position = {
        x: 50,
        y: 50,
    }
    player.style.left=`${position.x}%`
    player.style.top=`${position.y}%`

    flags.right=false
    flags.left=false
    flags.down=false
    flags.up=false
    flags.time=false
    flags.gameOver=false

    startMoving=false

    currentScore=0;
    score.textContent=currentScore
    remainingTime=29;
    time.textContent=remainingTime+1
    player.style.transform='rotateZ(0deg)'

    const target = document.querySelector('.game__target')
    game.removeChild(target)
    createTarget()
    const bonusTarget = document.querySelector('.game__target-bonus')
    game.removeChild(bonusTarget)
}

// MENU

const backToMenu = () => {
    menuBtns.style.display='block'
    spiderImg[0].style.display='block'
    spiderImg[1].style.display='block'
    difficulty.style.display='none'
    highscores.style.display='none'
    instructionMenu.style.display='none'
}

const backToDifficulty = () => {
    difficulty.style.display='block'
    nameMenu.style.display='none'
    nameInput.value=''
}

const selectDifficulty = () => {
    menuBtns.style.display='none'
    difficulty.style.display='block'
    playGame()
}

const playGame = () => {
    easyBtn.addEventListener('click', () => {
        speed = 100;
        difficulty.style.display='none'
        nameMenu.style.display='block'
    })
    hardBtn.addEventListener('click', () => {
        speed = 60;
        difficulty.style.display='none'
        nameMenu.style.display='block'
    })
    playBtn.addEventListener('click', () => {
        if (nameInput.value!='') {
            menu.style.display='none'
            appArea.style.display='flex'
            nickName=nameInput.value
            flags.start=true;
        } else {
            nameInput.classList.add('game-over')
            setTimeout(removeInputClass,200)
        }
    })
}

const removeInputClass = () => {
    nameInput.classList.remove('game-over')
}

const showHighscores = () => {
    menuBtns.style.display='none';
    spiderImg[0].style.display='none'
    spiderImg[1].style.display='none'
    highscores.style.display='block';
}

const showInstruction = () => {
    menuBtns.style.display='none';
    spiderImg[0].style.display='none'
    spiderImg[1].style.display='none'
    instructionMenu.style.display='block';
}

const exitGame = () => {
    menu.style.display='block'
    menuBtns.style.display='block'
    difficulty.style.display='none'
    nameMenu.style.display='none'
    appArea.style.display='none'
    flags.start=false;
    resetGame()
}

const restartGame = () => {
    flags.start=true;
    resetGame()
}

// MOVE

const right = () => {
    if (position.x!=90) {
        player.style.left=`${position.x+10}%`
        position.x += 10 }
    else {
        gameOver()
    }

    if (flags.up==true || flags.down==true) {
        player.style.transform='rotateZ(0deg)'
    }

    flags.right=true;
    flags.up=false;
    flags.down=false;
}

const moveRight = () => {
    rightInterval = setInterval(right,speed);
    startMoving=true;
}


const left = () => {
    
    if (position.x!=0) {
        player.style.left=`${position.x-10}%`
        position.x -= 10 }
    else {
        gameOver()
    }

    if (flags.up==true || flags.down==true) {
        player.style.transform='rotateZ(180deg)'
    } 

    flags.left=true;
    flags.up=false;
    flags.down=false;
}

const moveLeft = () => {
    leftInterval = setInterval(left,speed)
}


const down = () => {
    if (position.y!=90) {
        player.style.top=`${position.y+10}%`
        position.y += 10 }
    else {
        gameOver()
    }

    if (flags.left==true || flags.right==true) {
        player.style.transform='rotateZ(90deg)'
    }

    flags.down=true;
    flags.left=false;
    flags.right=false;
}

const moveDown = () => {
    downInterval = setInterval(down,speed)
    if (startMoving==false) {
        player.style.transform='rotateZ(90deg)'
    }
    startMoving=true;
}


const up = () => {
    if (position.y!=0) {
        player.style.top=`${position.y-10}%`
        position.y -= 10 }
    else {
        gameOver()
    }

    if (flags.left==true || flags.right==true) {
        player.style.transform='rotateZ(-90deg)'
    }

    flags.up=true;
    flags.left=false;
    flags.right=false;
}

const moveUp = () => {
    upInterval = setInterval(up,speed)
    if (startMoving==false) {
        player.style.transform='rotateZ(-90deg)'
    }
    startMoving=true;
}


const move = e => {
    if (flags.gameOver==false && flags.start==true) {
        switch (e.key) {
            case 'd': 
            case 'ArrowRight':
                if (flags.left==false) {
                    clearMoveIntervals()
                    moveRight() }
            break;
            case 'a': 
            case 'ArrowLeft':
                if (flags.right==false && startMoving==true) {
                    clearMoveIntervals()
                    moveLeft() }
            break;
            case 's': 
            case 'ArrowDown':
                if (flags.up==false) {
                    clearMoveIntervals()
                    moveDown() }
            break;
            case 'w': 
            case 'ArrowUp':
                if (flags.down==false) {
                    clearMoveIntervals()
                    moveUp() }
            break;   
        }
    }
}

// CREATE TARGET

const createTarget = () => {
    const target = document.createElement('div')
    target.classList.add('game__target')
    game.appendChild(target)
    target.style.left=`${10*Math.floor((Math.floor(Math.random()*100))/10)}%`
    target.style.top=`${10*Math.floor((Math.floor(Math.random()*100))/10)}%`
}

const createBonusTarget = () => {
    if (flags.gameOver==false) {
        const bonusTarget = document.createElement('div')
        bonusTarget.classList.add('game__target-bonus')
        game.appendChild(bonusTarget)
        bonusTarget.style.left=`${10*Math.floor((Math.floor(Math.random()*100))/10)}%`
        bonusTarget.style.top=`${10*Math.floor((Math.floor(Math.random()*100))/10)}%`

        bonusGoalInterval=setInterval(bonusGoal,speed)
    }
}


// GAME


const goal = () => {
    const target = document.querySelector('.game__target')
    if (target.style.left===`${position.x}%` && target.style.top===`${position.y}%`) {
        game.removeChild(target)
        createTarget()
        currentScore+=5
        score.textContent=currentScore

        addActive(5)
    } 
}

const bonusGoal = () => {
    const bonusTarget = document.querySelector('.game__target-bonus')
    if (bonusTarget.style.left===`${position.x}%` && bonusTarget.style.top===`${position.y}%`) {
        game.removeChild(bonusTarget)
        currentScore+=25
        score.textContent=currentScore
        clearInterval(bonusGoalInterval)

        addActive( 25)
    }
}

const addActive = x => {

    addedPoints.textContent=` +${x} !`
    addedPoints.classList.add('active')
    setTimeout(removeActive,500)
}

const removeActive = () => {
    addedPoints.textContent=''
    addedPoints.classList.remove('active')
}

const gameOver = () => {
        game.style.backgroundColor='red'
        game.classList.add('game-over')

        gameOverMenu.classList.add('game-over2')

        flags.gameOver=true;

        startMoving=false;

        toHighscoreTable()

        clearAll()
    }

const toHighscoreTable = () => {
    finalScore=currentScore;

    gameResult = {
        player: nickName,
        score: finalScore,
    }
    highscoreTable.push(gameResult)
    highscoreTable.sort(function(a,b) {return (b.score - a.score)})

    if (finalScore>0) {
        if (highscoreTable.length==1 || finalScore>highscoreTable[1].score) { // samo 'finalScore>highscoreTable[1].score' stworzy przy pierwszej próbie od razu tablicę z dwoma elementami ( [0] i [1] z warunku)
            gameOverNewHighscore.style.opacity=1;
        } else {
            gameOverNewHighscore.style.opacity=0;
        }
    }

    const name_1 = document.querySelector('#name_1')
    const score_1 = document.querySelector('#score_1')
    const name_2 = document.querySelector('#name_2')
    const score_2 = document.querySelector('#score_2')
    const name_3 = document.querySelector('#name_3')
    const score_3 = document.querySelector('#score_3')
    const name_4 = document.querySelector('#name_4')
    const score_4 = document.querySelector('#score_4')
    const name_5 = document.querySelector('#name_5')
    const score_5 = document.querySelector('#score_5')


    switch (highscoreTable.length) {
        case 1:
            name_1.textContent=highscoreTable[0].player
            score_1.textContent=highscoreTable[0].score
        break;
        case 2:
            name_1.textContent=highscoreTable[0].player
            score_1.textContent=highscoreTable[0].score
            name_2.textContent=highscoreTable[1].player
            score_2.textContent=highscoreTable[1].score
        break;
        case 3:
            name_1.textContent=highscoreTable[0].player
            score_1.textContent=highscoreTable[0].score
            name_2.textContent=highscoreTable[1].player
            score_2.textContent=highscoreTable[1].score
            name_3.textContent=highscoreTable[2].player
            score_3.textContent=highscoreTable[2].score
        break;
        case 4:
            name_1.textContent=highscoreTable[0].player
            score_1.textContent=highscoreTable[0].score;
            name_2.textContent=highscoreTable[1].player
            score_2.textContent=highscoreTable[1].score
            name_3.textContent=highscoreTable[2].player
            score_3.textContent=highscoreTable[2].score
            name_4.textContent=highscoreTable[3].player
            score_4.textContent=highscoreTable[3].score
        break;
        default:
            name_1.textContent=highscoreTable[0].player
            score_1.textContent=highscoreTable[0].score;
            name_2.textContent=highscoreTable[1].player
            score_2.textContent=highscoreTable[1].score
            name_3.textContent=highscoreTable[2].player
            score_3.textContent=highscoreTable[2].score
            name_4.textContent=highscoreTable[3].player
            score_4.textContent=highscoreTable[3].score
            name_5.textContent=highscoreTable[4].player
            score_5.textContent=highscoreTable[4].score;
    }
    
    // for (let i=1;i<highscoreTable.length; i++) {
    //     name_[i].textContent=highscoreTable[i-1].player;
    //     score_i.textContent=highscoreTable[i-1].score;
    //     }
}


// COUNTDOWN

const startGame = e => {
    switch (e.key) {
        case 'd':
        case 's':
        case 'w':
        case 'ArrowRight':
        case 'ArrowDown':
        case 'ArrowUp':    
            if (flags.time==false && flags.start==true) {

                flags.time=true 
                countdownInterval=setInterval(countdown,1000)  
                goalInterval=setInterval(goal,speed); 
                bonusGoalTimeout=setTimeout(createBonusTarget, remainingTime*300)
            }         
        break;   
    }
}

const countdown = () => {
    if (remainingTime!=-1) {
    time.textContent=remainingTime;
    remainingTime-- }
    else {
        gameOver()
    }
}


// LISTENERS

for(let i=0; i<backBtn1.length; i++) {
    backBtn1[i].addEventListener('click', backToMenu)
}
backBtn2.addEventListener('click',backToDifficulty)
startBtn.addEventListener('click', selectDifficulty)
highscoreBtn.addEventListener('click',showHighscores)
instructionBtn.addEventListener('click',showInstruction)
returnToMenu.addEventListener('click',exitGame)
window.addEventListener('load', createTarget)
window.addEventListener('keydown',move)
window.addEventListener('keydown',startGame)
restartBtn.addEventListener('click',restartGame)