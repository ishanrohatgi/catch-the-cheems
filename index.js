const screens = document.querySelectorAll('.screen');
const choose_cheems_btns=document.querySelectorAll('.choose-cheems-button');
const start_btn = document.getElementById('start-btn');
const game_container = document.getElementById('game-container');
const timeEl= document.getElementById('time');
const scoreEl= document.getElementById('score');
const messageEl= document.getElementById('message');

let seconds = 0;
let score =0;
let selected_cheem = {}
choose_cheems_btns.forEach(btn=>{
    start_btn.addEventListener('click',()=> screens[0].classList.add('up'))
    btn.addEventListener('click',()=>{
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt  = img.getAttribute('src');
        selected_cheem = {src, alt};
        screens[1].classList.add('up');
        setTimeout(createCheems, 1000)
        startGame();
    })
});

function createCheems(){
    const cheem = document.createElement('div');
    cheem.classList.add('cheems');
    const {x, y} = getRandomLocation();
    cheem.style.top = `${y}px`;
    cheem.style.left = `${x}px`;
    cheem.innerHTML = `<img src="${selected_cheem.src}" alt="${selected_cheem.alt}" style ="transform: rotate(${Math.random() * 360 }deg)" />`;
    cheem.addEventListener('click', catchCheems);
    game_container.appendChild(cheem);
} 
function getRandomLocation(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random()*(width -200) +100;
    const y = Math.random()*(height -200) +100;

    return {x, y};
}

function catchCheems(){
    increaseScore();
    this?.classList?.add('caught');
    setTimeout(()=>{
        this?.remove()
    },2000);
    addCheems();
}

function addCheems(){
    setTimeout(createCheems,1000);
    setTimeout(createCheems,1500);
}

function startGame(){
    setInterval(increaseTime,1000);
}

function increaseTime(){
    let m = Math.floor(seconds/60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`;
    seconds++;
}
function increaseScore(){
    score++;
    if(score>49){
        messageEl.classList.add('visible');
        setTimeout(()=>{
           location.reload();
        },5000)
    }
    scoreEl.innerHTML = `Score: ${score}`
}