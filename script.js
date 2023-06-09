console.log("welcome to spotify");


let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName: "Isq wala Love", filepath:"songs/1.mp3",coverpath:"c/c1.png"},
    {songName: "Chandbaliyan", filepath:"songs/2.mp3",coverpath:"c/c2.png"},
    {songName: "London thumakdha", filepath:"songs/3.mp3",coverpath:"c/c3.png"},
    {songName: "Tumhe jo maine dekha", filepath:"songs/4.mp3",coverpath:"c/c4.png"},
    {songName: "Bones", filepath:"songs/5.mp3",coverpath:"c/c5.png"},
    {songName: "Khalibali", filepath:"songs/6.mp3",coverpath:"c/c6.png"}
]

songItems.forEach((Element, i)=>{
    Element.getElementsByTagName("img")[0].src= songs[i].coverpath;
    Element.getElementsByClassName("songName")[0].innerText= songs[i].songName;

})
//audioElement.play();

//handle play/pause clicks
masterplay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-circle-play'); 
        gif.style.opacity=0;  
    }
})
//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change',()=>{
    audioElement.currentTime = (myprogressbar.value * audioElement.duration/100);
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element)=>{
        Element.classList.remove('fa-pause');
        Element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element)=>{
    Element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-pause');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;  
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-pause');
    })
})


document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6){
        songIndex=0
    }
    else{
    songIndex+=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0
    }
    else{
    songIndex-=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-pause');
})