// PASTE YOUR API HERE
let api = "";

// START
let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
let mapid = document.getElementById('mapid');
let axios = window.axios;
let user = {};

// NOW PLAYING
let mapContainer = document.getElementById("mapContainer");
let mapTitle = document.getElementById("mapTitle");
let mapDesc = document.getElementById("mapDesc")
let stars = document.getElementById("stars");
let starsCurrent = document.getElementById("starsCurrent");
let nowPlayingContainer = document.getElementById("nowPlayingContainer");
let overlay = document.getElementById("overlay");
let mods = document.getElementById("mods");

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

// PLAYER INFO
let ava = document.getElementById("ava");
let username = document.getElementById("username");
let country = document.getElementById("country");
let ranks = document.getElementById("ranks");
let playerPP = document.getElementById("playerPP");

// HP BAR
let hp = document.getElementById("hp");

// LEADERBOARD
let middle = document.getElementById("middle");
// SLOT 1
let slot1 = document.getElementById("slot1");
let slot1n = document.getElementById("slot1n");
let slot1s = document.getElementById("slot1s");
let slot1c = document.getElementById("slot1c");
// SLOT 2
let slot2 = document.getElementById("slot2");
let slot2n = document.getElementById("slot2n");
let slot2s = document.getElementById("slot2s");
let slot2c = document.getElementById("slot2c");
// SLOT 3
let slot3 = document.getElementById("slot3");
let slot3n = document.getElementById("slot3n");
let slot3s = document.getElementById("slot3s");
let slot3c = document.getElementById("slot3c");
// SLOT 4
let slot4 = document.getElementById("slot4");
let slot4n = document.getElementById("slot4n");
let slot4s = document.getElementById("slot4s");
let slot4c = document.getElementById("slot4c");
// SLOT 5
let slot5 = document.getElementById("slot5");
let slot5n = document.getElementById("slot5n");
let slot5s = document.getElementById("slot5s");
let slot5c = document.getElementById("slot5c");
// OUR PLAYER
let slot0 = document.getElementById("slot0");
let slot0n = document.getElementById("slot0n");
let slot0s = document.getElementById("slot0s");
let slot0c = document.getElementById("slot0c");
socket.onopen = () => {
    console.log("Successfully Connected");
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

let animation = {
    acc:  new CountUp('acc', 0, 0, 2, .2, {useEasing: true, useGrouping: false,   separator: " ", decimal: ".", suffix:"%" }),
    score:  new CountUp('score', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." }),
    combo:  new CountUp('combo', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." , suffix:"x"}),
    starsCurrent:  new CountUp('starsCurrent', 0, 0, 2, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." , prefix: "Now: ", suffix:"*"}),
    stars:  new CountUp('stars', 0, 0, 2, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: ".", prefix: "Full: ", suffix: "*"}),
    pp:  new CountUp('pp', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." , suffix:"pp"}),
    slot0s:  new CountUp('slot0s', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "."}),
    slot0c:  new CountUp('slot0c', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." , suffix:"x"}),
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
let tempStarsCurrent;

let gameState;
let tempScore;
let tempAcc;
let tempCombo;

let temp300;
let temp100;
let temp50;
let temp0;

let tempPP;

let tempUsername;
let tempUID;
let tempCountry;
let tempRanks;
let tempPlayerPP;

let tempHP;
let tempMods;

let tempTimeCurrent;
let tempTimeFull;

let tempslot1n;
let tempslot1s;
let tempslot1c;

let tempslot2n;
let tempslot2s;
let tempslot2c;

let tempslot3n;
let tempslot3s;
let tempslot3c;

let tempslot4n;
let tempslot4s;
let tempslot4c;

let tempslot5n;
let tempslot5s;
let tempslot5c;

let tempslot0n;
let tempslot0s;
let tempslot0c;

socket.onmessage = event => {
    let data = JSON.parse(event.data);
    let getUser = async () => {
        try {
            const response = await axios.get("/get_user", {
                baseURL: "https://osu.ppy.sh/api",
                params: {
                    k: `${api}`,
                    u: `${data.gameplay.name}`,
                },
            });
            return response.data[0];
            } catch (error) {
            console.error(error);
        }
    };    
    Promise.resolve(getUser()).then((data) => Object.assign(user, data));  
    if (tempUID !== user.user_id) {
        tempUID = user.user_id;
        ava.style.backgroundImage = `url('https://a.ppy.sh/${tempUID}')`;
        slot0a.style.backgroundImage = `url('https://a.ppy.sh/${tempUID}')`;
    }
    ava.style.backgroundSize = "100%";
    if(gameState !== data.menu.state){
        gameState = data.menu.state;
        if (gameState == 2){
            score.style.transform = "translateX(0)";
            acc.style.transform = "translateX(0)";
            
            combo.style.transform = "translateX(0)";
            pp.style.transform = "translateX(0)";
            mods.style.transform = "translateX(0)";
            accInfo.style.transform = "translateX(0)";
            
            ava.style.transform = "translateY(0)";
            playerPP.style.transform = "translateY(0)";
            username.style.transform = "translateY(0)";
            country.style.transform = "translateY(0)";
            ranks.style.transform = "translateY(0)";
            hp.style.opacity = 1;
            
            mapContainer.style.transform = "translateX(700px)";
        }
        else {
            score.style.transform = "translateX(-1000px)";
            acc.style.transform = "translateX(1000px)";
            
            combo.style.transform = "translateX(-500px)";
            pp.style.transform = "translateX(-500px)";
            mods.style.transform = "translateX(-500px)";
            accInfo.style.transform = "translateX(-500px)";
            
            ava.style.transform = "translateY(-300px)";
            playerPP.style.transform = "translateY(-300px)";
            username.style.transform = "translateY(-300px)";
            country.style.transform = "translateY(-300px)";
            ranks.style.transform = "translateY(-300px)";
            hp.style.opacity = 0;
            
            mapContainer.style.transform = "translateX(0px)";
            
            middle.style.opacity = 0;
            middle.style.transform = "translateX(-500px)";
            
            slot0.style.transform = "translateY(0)";
            slot1.style.transform = "translateY(0)";
            slot2.style.transform = "translateY(0)";
            slot3.style.transform = "translateY(0)";
            slot4.style.transform = "translateY(0)";
            slot5.style.transform = "translateY(0)";
        }
    }
    if(tempUsername !== data.gameplay.name){
        tempUsername = data.gameplay.name;
        slot0n.innerHTML = tempUsername;
        username.innerHTML = tempUsername;
    }
	if(tempImg !== data.menu.bm.path.full){
        tempImg = data.menu.bm.path.full;
        data.menu.bm.path.full = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25').replace(/\\/g,'/');
        mapContainer.style.backgroundImage = `url('http://127.0.0.1:24050/Songs/${data.menu.bm.path.full}?a=${Math.random(10000)}')`;
        mapContainer.style.backgroundPosition = "50% 50%";
    }
    if(tempMapName !== data.menu.bm.metadata.title){
        tempMapName = data.menu.bm.metadata.title;
        tempMapArtist = data.menu.bm.metadata.artist;
        mapTitle.innerHTML = tempMapArtist + ' - ' + tempMapName;
    }
    if(tempMapDiff !== '[' + data.menu.bm.metadata.difficulty + ']'){
        tempMapDiff = '[' + data.menu.bm.metadata.difficulty + ']';
        tempMapper = data.menu.bm.metadata.mapper;
        mapDesc.innerHTML = 'Difficulty: ' + tempMapDiff + " by " + tempMapper;
    }
    if (tempStarsCurrent !== data.menu.bm.stats.SR) {
        tempStarsCurrent = data.menu.bm.stats.SR;
        starsCurrent.innerHTML = tempStarsCurrent;
        animation.starsCurrent.update(starsCurrent.innerHTML);
    }
    if (tempStars !== data.menu.bm.stats.fullSR) {
        tempStars = data.menu.bm.stats.fullSR;
        stars.innerHTML = tempStars;
        animation.stars.update(stars.innerHTML);
    }
    if (tempScore !== data.gameplay.score) {
        tempScore = data.gameplay.score;
        slot0s.innerHTML = tempScore;
        score.innerHTML = tempScore;
        animation.score.update(score.innerHTML);
        animation.slot0s.update(slot0s.innerHTML);
    }
    if (tempAcc !== data.gameplay.accuracy) {
        tempAcc = data.gameplay.accuracy;
        acc.innerHTML = tempAcc;
        animation.acc.update(acc.innerHTML);
    }
    if (tempCombo !== data.gameplay.combo.current) {
        tempCombo = data.gameplay.combo.current;
        tempMaxCombo = data.gameplay.combo.max;
        slot0c.innerHTML = tempCombo;
        combo.innerHTML = tempMaxCombo;
        animation.combo.update(combo.innerHTML);
        animation.slot0c.update(slot0c.innerHTML);
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
    if (tempMods !== data.menu.mods.str){
        if (data.menu.mods.num == 0){
            tempsMods = "None";
        }
        else {
            tempsMods = data.menu.mods.str;
        }
        mods.innerHTML = 'Mods: ' +tempsMods;
    }  
    
    if ((gameState == 2) && (data.menu.bm.time.current < (data.menu.bm.time.firstObj + 1000))){
        tempslot1n = data.gameplay.leaderboard.slots[0].name;
        tempslot1s = data.gameplay.leaderboard.slots[0].score;
        tempslot1c = data.gameplay.leaderboard.slots[0].maxCombo;
        slot1n.innerHTML = tempslot1n;
        slot1s.innerHTML = numberWithCommas(tempslot1s);
        slot1c.innerHTML = tempslot1c + 'x';
        
        tempslot2n = data.gameplay.leaderboard.slots[1].name;
        tempslot2s = data.gameplay.leaderboard.slots[1].score;
        tempslot2c = data.gameplay.leaderboard.slots[1].maxCombo;
        slot2n.innerHTML = tempslot2n;
        slot2s.innerHTML = numberWithCommas(tempslot2s);
        slot2c.innerHTML = tempslot2c + 'x';
        
        tempslot3n = data.gameplay.leaderboard.slots[2].name;
        tempslot3s = data.gameplay.leaderboard.slots[2].score;
        tempslot3c = data.gameplay.leaderboard.slots[2].maxCombo;
        slot3n.innerHTML = tempslot3n;
        slot3s.innerHTML = numberWithCommas(tempslot3s);
        slot3c.innerHTML = tempslot3c + 'x';
        
        tempslot4n = data.gameplay.leaderboard.slots[3].name;
        tempslot4s = data.gameplay.leaderboard.slots[3].score;
        tempslot4c = data.gameplay.leaderboard.slots[3].maxCombo;
        slot4n.innerHTML = tempslot4n;
        slot4s.innerHTML = numberWithCommas(tempslot4s);
        slot4c.innerHTML = tempslot4c + 'x';
        
        tempslot5n = data.gameplay.leaderboard.slots[4].name;
        tempslot5s = data.gameplay.leaderboard.slots[4].score;
        tempslot5c = data.gameplay.leaderboard.slots[4].maxCombo;
        slot5n.innerHTML = tempslot5n;
        slot5s.innerHTML = numberWithCommas(tempslot5s);
        slot5c.innerHTML = tempslot5c + 'x';      
    }
    if (gameState == 2 && data.menu.bm.time.current > (data.menu.bm.time.firstObj + 1000)){
        if (data.gameplay.score >= data.gameplay.leaderboard.slots[4].score){
            slot0.style.transform = "translateY(-70px)";
            slot5.style.transform = "translateY(70px)";
        }
        if (data.gameplay.score >= data.gameplay.leaderboard.slots[3].score){
            slot0.style.transform = "translateY(-140px)";
            slot4.style.transform = "translateY(70px)";
        }
        if (data.gameplay.score >= data.gameplay.leaderboard.slots[2].score){
            slot0.style.transform = "translateY(-210px)";
            slot3.style.transform = "translateY(70px)";
        }
        if (data.gameplay.score >= data.gameplay.leaderboard.slots[1].score){
            slot0.style.transform = "translateY(-280px)";
            slot2.style.transform = "translateY(70px)";
        }
        if (data.gameplay.score >= data.gameplay.leaderboard.slots[0].score){
            slot0.style.transform = "translateY(-350px)";
            slot1.style.transform = "translateY(70px)";
        }
        if (data.gameplay.leaderboard.ourplayer.position < 6){
            middle.style.opacity = 1;
            middle.style.transform = "translateX(0)";
        }
    }
    else {
        slot0.style.transform = "translateY(0)";
        slot1.style.transform = "translateY(0)";
        slot2.style.transform = "translateY(0)";
        slot3.style.transform = "translateY(0)";
        slot4.style.transform = "translateY(0)";
        slot5.style.transform = "translateY(0)";
    }
    
	if (data.gameplay.hp.smooth > 0) {
        hp.style.transform = `scaleX(${data.gameplay.hp.smooth / 200})`;
    } 
    else {
        hp.style.transform = `scaleX(1)`;
    }
    if (tempCountry !== user.country){
        tempCountry = user.country;
        country.style.background = `url('https://osu.ppy.sh/images/flags/${tempCountry}.png') no-repeat`;
        country.style.backgroundSize = "22.5px 15px";
        country.style.backgroundPosition = "50% 50%";
    }    
    if (tempRanks !== user.pp_rank){
        tempRanks = user.pp_rank;
        ranks.innerHTML = "#" + tempRanks;
    }
    if (tempPlayerPP !== user.pp_raw){
        tempPlayerPP = user.pp_raw;
        playerPP.innerHTML = Math.round(tempPlayerPP) + "pp";
    }
    if (tempTimeCurrent !== data.menu.bm.time.current || tempTimeFull !== data.menu.bm.time.full) {
        tempTimeCurrent = data.menu.bm.time.current;
        tempTimeFull = data.menu.bm.time.full;
        overlay.style.clipPath = `inset(0 ${(1 - (tempTimeCurrent / tempTimeFull)) * 100}% 0 0)`;
    } 
}    