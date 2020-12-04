let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
let mapid = document.getElementById('mapid');

// NOW PLAYING
let mapContainer = document.getElementById("mapContainer");
let mapTitle = document.getElementById("mapTitle");
let mapArtist = document.getElementById("mapArtist");
let mapDifficulty = document.getElementById("mapDifficulty");
let mapper = document.getElementById("mapper");
let stars = document.getElementById("stars");
let nowPlayingContainer = document.getElementById("nowPlayingContainer");

// PLAYING SCORE
let score = document.getElementById("score");
let acc = document.getElementById("acc");
let combo = document.getElementById("combo")

// ACCURACY INFO
let accInfo = document.getElementById("accInfo");
let h300 = document.getElementById("h300");
let h100 = document.getElementById("h100");
let h50 = document.getElementById("h50");
let h0 = document.getElementById("h0");

// PERFORMANCE POINTS
let pp = document.getElementById("pp");

socket.onopen = () => {
    console.log("Successfully Connected");
};

let animation = {
    acc:  new CountUp('acc', 0, 0, 2, .2, {useEasing: true, useGrouping: false,   separator: " ", decimal: ".", suffix:"%" }),
    score:  new CountUp('score', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." }),
    combo:  new CountUp('combo', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." , suffix:"x"}),
    stars:  new CountUp('stars', 0, 0, 2, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." , prefix:"Star Rating: "}),
    pp:  new CountUp('pp', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." , suffix:"pp"}),
}

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};

socket.onerror = error => {
    console.log("Socket Error: ", error);
};

let tempImg;
let tempMapArtist;
let tempMapName;
let tempMapDiff;
let tempMapper;
let tempStars;

let gameState;
let tempScore;
let tempAcc;
let tempCombo;

let temp300;
let temp100;
let temp50;
let temp0;

let tempPP;

socket.onmessage = event => {
    let data = JSON.parse(event.data);
    if(gameState !== data.menu.state){
        gameState = data.menu.state;
        if (gameState == 2){
            score.style.transform = "translateX(0)";
            acc.style.transform = "translateX(0)";
            combo.style.transform = "translateY(0)";
            accInfo.style.transform = "translateY(0)";
            accInfo.style.transform = "translateY(0)";
            pp.style.transform = "translateY(0)";
        }
        else {
            score.style.transform = "translateX(+500px)";
            acc.style.transform = "translateX(-500px)";
            combo.style.transform = "translateY(-20px) translateX(200px)";
            accInfo.style.transform = "translateY(200px)";
            pp.style.transform = "translateY(-20px) translateX(-200px)";
        }
    }
	if(tempImg !== data.menu.bm.path.full){
        tempImg = data.menu.bm.path.full;
        data.menu.bm.path.full = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25').replace(/\\/g,'/');
        mapContainer.style.backgroundImage = `url('http://127.0.0.1:24050/Songs/${data.menu.bm.path.full}?a=${Math.random(10000)}')`;
        mapContainer.style.backgroundPosition = "50% 50%";
    }
    if(tempMapArtist !== data.menu.bm.metadata.artist){
        tempMapArtist = data.menu.bm.metadata.artist;
        mapArtist.innerHTML = 'Artist: ' + tempMapArtist;
    }
    if(tempMapName !== data.menu.bm.metadata.title){
        tempMapName = data.menu.bm.metadata.title;
        mapTitle.innerHTML = 'Title: ' + tempMapName;
    }
    if(tempMapDiff !== '[' + data.menu.bm.metadata.difficulty + ']'){
        tempMapDiff = '[' + data.menu.bm.metadata.difficulty + ']';
        mapDifficulty.innerHTML = 'Difficulty: ' + tempMapDiff;
    }
    if (tempMapper !== data.menu.bm.metadata.mapper) {
        tempMapper = data.menu.bm.metadata.mapper;
        mapper.innerHTML = 'Mapper: ' + tempMapper;
    }
    if (tempStars !== data.menu.bm.stats.fullSR) {
        tempStars = data.menu.bm.stats.fullSR;
        stars.innerHTML = tempStars;
        animation.stars.update(stars.innerHTML);
    }
    if (tempScore !== data.gameplay.score) {
        tempScore = data.gameplay.score;
        score.innerHTML = tempScore;
        animation.score.update(score.innerHTML);
    }
    if (tempAcc !== data.gameplay.accuracy) {
        tempAcc = data.gameplay.accuracy;
        acc.innerHTML = tempAcc;
        animation.acc.update(acc.innerHTML);
    }
    if (tempCombo !== data.gameplay.combo.current) {
        tempCombo = data.gameplay.combo.current;
        combo.innerHTML = tempCombo;
        animation.combo.update(combo.innerHTML);
    }
    if (temp300 !== data.gameplay.hits[300]){
        temp300 = data.gameplay.hits[300];
        h300.innerHTML = temp300;
    }   
    if (temp100 !== data.gameplay.hits[100]){
        temp100 = data.gameplay.hits[100];
        h100.innerHTML = temp100;
    }    
    if (temp50 !== data.gameplay.hits[50]){
        temp50 = data.gameplay.hits[50];
        h50.innerHTML = temp50;
    }    
    if (temp0 !== data.gameplay.hits[0]){
        temp0 = data.gameplay.hits[0];
        h0.innerHTML = temp0;
    }
    if (tempPP !== data.gameplay.pp.current ){
        tempPP = data.gameplay.pp.current ;
        pp.innerHTML = tempPP;
        animation.pp.update(pp.innerHTML);
    }
}