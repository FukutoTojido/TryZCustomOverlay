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
let upperPart = document.getElementById("top");
let score = document.getElementById("score");
let acc = document.getElementById("acc");
let combo = document.getElementById("combo")

// ACCURACY INFO
let lowerPart = document.getElementById("lowerPart");
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
let slot1r = document.getElementById("slot1r");
let slot1h300;
let slot1h100;
let slot1h50;
let slot1h0;
let slot1a;
// SLOT 2
let slot2 = document.getElementById("slot2");
let slot2n = document.getElementById("slot2n");
let slot2s = document.getElementById("slot2s");
let slot2c = document.getElementById("slot2c");
let slot2r = document.getElementById("slot2r");
let slot2h300;
let slot2h100;
let slot2h50;
let slot2h0;
let slot2a;
// SLOT 3
let slot3 = document.getElementById("slot3");
let slot3n = document.getElementById("slot3n");
let slot3s = document.getElementById("slot3s");
let slot3c = document.getElementById("slot3c");
let slot3r = document.getElementById("slot3r");
let slot3h300;
let slot3h100;
let slot3h50;
let slot3h0;
let slot3a;
// SLOT 4
let slot4 = document.getElementById("slot4");
let slot4n = document.getElementById("slot4n");
let slot4s = document.getElementById("slot4s");
let slot4c = document.getElementById("slot4c");
let slot4r = document.getElementById("slot4r");
let slot4h300;
let slot4h100;
let slot4h50;
let slot4h0;
let slot4a;
// SLOT 5
let slot5 = document.getElementById("slot5");
let slot5n = document.getElementById("slot5n");
let slot5s = document.getElementById("slot5s");
let slot5c = document.getElementById("slot5c");
let slot5r = document.getElementById("slot5r");
let slot5h300;
let slot5h100;
let slot5h50;
let slot5h0;
let slot5a;
// OUR PLAYER
let slot0 = document.getElementById("slot0");
let slot0n = document.getElementById("slot0n");
let slot0s = document.getElementById("slot0s");
let slot0c = document.getElementById("slot0c");
let slot0r = document.getElementById("slot0r");
let slot0h300;
let slot0h100;
let slot0h50;
let slot0h0;
let slot0a;
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
let interfaceID;

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

let tempslot0r;

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
            
            middle.style.opacity = 1;
            middle.style.transform = "translateX(0)";
            
            mapContainer.style.transform = "translateX(700px)";
        }
        else {
            upperPart.style.transform = "translateX(0)";
            score.style.opacity = 1;
            acc.style.opacity = 1;
            hp.style.opacity = 1;
            combo.style.opacity = 1;
            playerPP.style.transform = "scale(1)";
            playerPP.style.width = 100;
            playerPP.style.zIndex = 0;                    
            ranks.style.transform = "scale(1)";
            ranks.style.width = 100;
            ranks.style.zIndex = 0;                
            pp.style.width = "150px";
            pp.style.transform = "translateX(0px)";
            pp.style.borderTopLeftRadius = "0px";
            pp.style.borderBottomLeftRadius = "0px";
            pp.style.backgroundColor = "white";
            pp.style.color = "#161616";
            lowerPart.style.transform = "translateX(0)";
            
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
        if (interfaceID !== data.settings.showInterface && gameState == 2){
            interfaceID = data.settings.showInterface;
            if (interfaceID == 1){
                upperPart.style.transform = "translateX(-710px) translateY(30px)";
                score.style.opacity = 0;
                acc.style.opacity = 0;
                hp.style.opacity = 0;
                combo.style.opacity = 0;
                playerPP.style.transform = "scale(1.28) translateY(-50px) translateX(40px)";
                playerPP.style.width = 200;
                playerPP.style.zIndex = -2;                    
                ranks.style.transform = "scale(1.28) translateY(-50px) translateX(-40px)";
                ranks.style.width = 200;
                ranks.style.zIndex = -2;
                pp.style.width = "300px";
                pp.style.transform = "translateX(-140px)";
                pp.style.borderTopLeftRadius = "25px";
                pp.style.borderBottomLeftRadius = "25px";
                pp.style.backgroundColor = "#161616";
                pp.style.color = "white";
                lowerPart.style.transform = "translateX(1492px) translateY(-130px)";
            }
            else{
                upperPart.style.transform = "translateX(0)";
                score.style.opacity = 1;
                acc.style.opacity = 1;
                hp.style.opacity = 1;
                combo.style.opacity = 1;
                playerPP.style.transform = "scale(1)";
                playerPP.style.width = 100;
                playerPP.style.zIndex = 0;                    
                ranks.style.transform = "scale(1)";
                ranks.style.width = 100;
                ranks.style.zIndex = 0;                
                pp.style.width = "150px";
                pp.style.transform = "translateX(0px)";
                pp.style.borderTopLeftRadius = "0px";
                pp.style.borderBottomLeftRadius = "0px";
                pp.style.backgroundColor = "white";
                pp.style.color = "#161616";
                lowerPart.style.transform = "translateX(0)";
            }
        }
    }
    if (tempAcc !== data.gameplay.accuracy) {
        tempAcc = data.gameplay.accuracy;
        acc.innerHTML = tempAcc;
        animation.acc.update(acc.innerHTML);
    }
    if (tempCombo !== data.gameplay.combo.current) {
        tempCombo = data.gameplay.combo.current;
        tempMaxCombo = data.gameplay.combo.max;
        slot0c.innerHTML = tempMaxCombo;
        combo.innerHTML = tempCombo;
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
        slot1h300 = data.gameplay.leaderboard.slots[0].h300;
        slot1h100 = data.gameplay.leaderboard.slots[0].h100;
        slot1h50 = data.gameplay.leaderboard.slots[0].h50;
        slot1h0 = data.gameplay.leaderboard.slots[0].h0;
        slot1a = (slot1h300 * (1) + slot1h100 * (1/3) + slot1h50 * (1/6)) / (slot1h300 + slot1h100 + slot1h50 + slot1h0);
        switch (true){
            case (slot1a == 1):
            slot1r.innerHTML = "X";
            slot1r.style.color = "#f24671";
            break;
            case (slot1a > 0.9 && slot1h50 / (slot1h300 + slot1h100 + slot1h50 + slot1h0) < 0.01 && slot1h0 == 0):
            slot1r.innerHTML = "S";
            slot1r.style.color = "#f2d646";
            break;            
            case ((slot1a > 0.8 && slot1a <= 0.9 && slot1h0 == 0) || (slot1h300 / (slot1h300 + slot1h100 + slot1h50 + slot1h0) > 0.9)):
            slot1r.innerHTML = "A";
            slot1r.style.color = "#46f26e";
            break;            
            case ((slot1a > 0.7 && slot1a <= 0.8 && slot1h0 == 0) || (slot1h300 / (slot1h300 + slot1h100 + slot1h50 + slot1h0) > 0.8)):
            slot1r.innerHTML = "B";
            slot1r.style.color = "#469cf2";
            break;
            case ((slot1h300 / (slot1h300 + slot1h100 + slot1h50 + slot1h0) > 0.6) || (slot1h300 / (slot1h300 + slot1h100 + slot1h50 + slot1h0) <= 0.8)):
            slot1r.innerHTML = "C";
            slot1r.style.color = "#9f46f2";
            break;
            case ((slot1h300 / (slot1h300 + slot1h100 + slot1h50 + slot1h0) <= 0.6)):
            slot1r.innerHTML = "D";
            slot1r.style.color = "#5c5c5c";
            break;
        } 
        slot1n.innerHTML = tempslot1n;
        slot1s.innerHTML = numberWithCommas(tempslot1s);
        slot1c.innerHTML = tempslot1c + 'x';
        
        tempslot2n = data.gameplay.leaderboard.slots[1].name;
        tempslot2s = data.gameplay.leaderboard.slots[1].score;
        tempslot2c = data.gameplay.leaderboard.slots[1].maxCombo;
        slot2h300 = data.gameplay.leaderboard.slots[1].h300;
        slot2h100 = data.gameplay.leaderboard.slots[1].h100;
        slot2h50 = data.gameplay.leaderboard.slots[1].h50;
        slot2h0 = data.gameplay.leaderboard.slots[1].h0;
        slot2n.innerHTML = tempslot2n;
        slot2s.innerHTML = numberWithCommas(tempslot2s);
        slot2c.innerHTML = tempslot2c + 'x';
        slot2a = (slot2h300 * (1) + slot2h100 * (1/3) + slot2h50 * (1/6)) / (slot2h300 + slot2h100 + slot2h50 + slot2h0);
        switch (true){
            case (slot2a == 1):
            slot2r.innerHTML = "X";
            slot2r.style.color = "#f24671";
            break;
            case (slot2a > 0.9 && slot2h50 / (slot2h300 + slot2h100 + slot2h50 + slot2h0) < 0.01 && slot2h0 == 0):
            slot2r.innerHTML = "S";
            slot2r.style.color = "#f2d646";
            break;            
            case ((slot2a > 0.8 && slot2a <= 0.9 && slot2h0 == 0) || (slot2h300 / (slot2h300 + slot2h100 + slot2h50 + slot2h0) > 0.9)):
            slot2r.innerHTML = "A";
            slot2r.style.color = "#46f26e";
            break;            
            case ((slot2a > 0.7 && slot2a <= 0.8 && slot2h0 == 0) || (slot2h300 / (slot2h300 + slot2h100 + slot2h50 + slot2h0) > 0.8)):
            slot2r.innerHTML = "B";
            slot2r.style.color = "#469cf2";
            break;
            case ((slot2h300 / (slot2h300 + slot2h100 + slot2h50 + slot2h0) > 0.6) || (slot2h300 / (slot2h300 + slot2h100 + slot2h50 + slot2h0) <= 0.8)):
            slot2r.innerHTML = "C";
            slot2r.style.color = "#9f46f2";
            break;
            case ((slot2h300 / (slot2h300 + slot2h100 + slot2h50 + slot2h0) <= 0.6)):
            slot2r.innerHTML = "D";
            slot2r.style.color = "#5c5c5c";
            break;
        }
        
        tempslot3n = data.gameplay.leaderboard.slots[2].name;
        tempslot3s = data.gameplay.leaderboard.slots[2].score;
        tempslot3c = data.gameplay.leaderboard.slots[2].maxCombo;
        slot3h300 = data.gameplay.leaderboard.slots[2].h300;
        slot3h100 = data.gameplay.leaderboard.slots[2].h100;
        slot3h50 = data.gameplay.leaderboard.slots[2].h50;
        slot3h0 = data.gameplay.leaderboard.slots[2].h0;
        slot3n.innerHTML = tempslot3n;
        slot3s.innerHTML = numberWithCommas(tempslot3s);
        slot3c.innerHTML = tempslot3c + 'x';
        slot3a = (slot3h300 * (1) + slot3h100 * (1/3) + slot3h50 * (1/6)) / (slot3h300 + slot3h100 + slot3h50 + slot3h0);
        switch (true){
            case (slot3a == 1):
            slot3r.innerHTML = "X";
            slot3r.style.color = "#f24671";
            break;
            case (slot3a > 0.9 && slot3h50 / (slot3h300 + slot3h100 + slot3h50 + slot3h0) < 0.01 && slot3h0 == 0):
            slot3r.innerHTML = "S";
            slot3r.style.color = "#f2d646";
            break;            
            case ((slot3a > 0.8 && slot3a <= 0.9 && slot3h0 == 0) || (slot3h300 / (slot3h300 + slot3h100 + slot3h50 + slot3h0) > 0.9)):
            slot3r.innerHTML = "A";
            slot3r.style.color = "#46f26e";
            break;            
            case ((slot3a > 0.7 && slot3a <= 0.8 && slot3h0 == 0) || (slot3h300 / (slot3h300 + slot3h100 + slot3h50 + slot3h0) > 0.8)):
            slot3r.innerHTML = "B";
            slot3r.style.color = "#469cf2";
            break;
            case ((slot3h300 / (slot3h300 + slot3h100 + slot3h50 + slot3h0) > 0.6) || (slot3h300 / (slot3h300 + slot3h100 + slot3h50 + slot3h0) <= 0.8)):
            slot3r.innerHTML = "C";
            slot3r.style.color = "#9f46f2";
            break;
            case ((slot3h300 / (slot3h300 + slot3h100 + slot3h50 + slot3h0) <= 0.6)):
            slot3r.innerHTML = "D";
            slot3r.style.color = "#5c5c5c";
            break;
        }
        
        tempslot4n = data.gameplay.leaderboard.slots[3].name;
        tempslot4s = data.gameplay.leaderboard.slots[3].score;
        tempslot4c = data.gameplay.leaderboard.slots[3].maxCombo;
        slot4h300 = data.gameplay.leaderboard.slots[3].h300;
        slot4h100 = data.gameplay.leaderboard.slots[3].h100;
        slot4h50 = data.gameplay.leaderboard.slots[3].h50;
        slot4h0 = data.gameplay.leaderboard.slots[3].h0;
        slot4n.innerHTML = tempslot4n;
        slot4s.innerHTML = numberWithCommas(tempslot4s);
        slot4c.innerHTML = tempslot4c + 'x';
        slot4a = (slot4h300 * (1) + slot4h100 * (1/3) + slot4h50 * (1/6)) / (slot4h300 + slot4h100 + slot4h50 + slot4h0);
        switch (true){
            case (slot4a == 1):
            slot4r.innerHTML = "X";
            slot4r.style.color = "#f24671";
            break;
            case (slot4a > 0.9 && slot4h50 / (slot4h300 + slot4h100 + slot4h50 + slot4h0) < 0.01 && slot4h0 == 0):
            slot4r.innerHTML = "S";
            slot4r.style.color = "#f2d646";
            break;            
            case ((slot4a > 0.8 && slot4a <= 0.9 && slot4h0 == 0) || (slot4h300 / (slot4h300 + slot4h100 + slot4h50 + slot4h0) > 0.9)):
            slot4r.innerHTML = "A";
            slot4r.style.color = "#46f26e";
            break;            
            case ((slot4a > 0.7 && slot4a <= 0.8 && slot4h0 == 0) || (slot4h300 / (slot4h300 + slot4h100 + slot4h50 + slot4h0) > 0.8)):
            slot4r.innerHTML = "B";
            slot4r.style.color = "#469cf2";
            break;
            case ((slot4h300 / (slot4h300 + slot4h100 + slot4h50 + slot4h0) > 0.6) || (slot4h300 / (slot4h300 + slot4h100 + slot4h50 + slot4h0) <= 0.8)):
            slot4r.innerHTML = "C";
            slot4r.style.color = "#9f46f2";
            break;
            case ((slot4h300 / (slot4h300 + slot4h100 + slot4h50 + slot4h0) <= 0.6)):
            slot4r.innerHTML = "D";
            slot4r.style.color = "#5c5c5c";
            break;
        }
        
        tempslot5n = data.gameplay.leaderboard.slots[4].name;
        tempslot5s = data.gameplay.leaderboard.slots[4].score;
        tempslot5c = data.gameplay.leaderboard.slots[4].maxCombo;
        slot5h300 = data.gameplay.leaderboard.slots[4].h300;
        slot5h100 = data.gameplay.leaderboard.slots[4].h100;
        slot5h50 = data.gameplay.leaderboard.slots[4].h50;
        slot5h0 = data.gameplay.leaderboard.slots[4].h0;
        slot5n.innerHTML = tempslot5n;
        slot5s.innerHTML = numberWithCommas(tempslot5s);
        slot5c.innerHTML = tempslot5c + 'x';   
        slot5a = (slot5h300 * (1) + slot5h100 * (1/3) + slot5h50 * (1/6)) / (slot5h300 + slot5h100 + slot5h50 + slot5h0);
        switch (true){
            case (slot5a == 1):
            slot5r.innerHTML = "X";
            slot5r.style.color = "#f24671";
            break;
            case (slot5a > 0.9 && slot5h50 / (slot5h300 + slot5h100 + slot5h50 + slot5h0) < 0.01 && slot5h0 == 0):
            slot5r.innerHTML = "S";
            slot5r.style.color = "#f2d646";
            break;            
            case ((slot5a > 0.8 && slot5a <= 0.9 && slot5h0 == 0) || (slot5h300 / (slot5h300 + slot5h100 + slot5h50 + slot5h0) > 0.9)):
            slot5r.innerHTML = "A";
            slot5r.style.color = "#46f26e";
            break;            
            case ((slot5a > 0.7 && slot5a <= 0.8 && slot5h0 == 0) || (slot5h300 / (slot5h300 + slot5h100 + slot5h50 + slot5h0) > 0.8)):
            slot5r.innerHTML = "B";
            slot5r.style.color = "#469cf2";
            break;
            case ((slot5h300 / (slot5h300 + slot5h100 + slot5h50 + slot5h0) > 0.6) || (slot5h300 / (slot5h300 + slot5h100 + slot5h50 + slot5h0) <= 0.8)):
            slot5r.innerHTML = "C";
            slot5r.style.color = "#9f46f2";
            break;
            case ((slot5h300 / (slot5h300 + slot5h100 + slot5h50 + slot5h0) <= 0.6)):
            slot5r.innerHTML = "D";
            slot5r.style.color = "#5c5c5c";
            break;
        }
    }
    if (tempslot0r !== data.gameplay.hits.grade.current){
        tempslot0r = data.gameplay.hits.grade.current;
        switch (tempslot0r){
            case "SS":
            slot0r.innerHTML = "X";
            slot0r.style.color = "#f24671";
            break;
            case "S":
            slot0r.innerHTML = tempslot0r;
            slot0r.style.color = "#f2d646";
            break;
            case "A":
            slot0r.innerHTML = tempslot0r;
            slot0r.style.color = "#46f26e";
            break;
            case "B":
            slot0r.innerHTML = tempslot0r;
            slot0r.style.color = "#469cf2";
            break;
            case "C":
            slot0r.innerHTML = tempslot0r;
            slot0r.style.color = "#9f46f2";
            break;
            case "D":
            slot0r.innerHTML = tempslot0r;
            slot0r.style.color = "#5c5c5c";
            break;
        }
    }
    if (gameState == 2 && data.menu.bm.time.current > (data.menu.bm.time.firstObj + 1000)){
        if (data.gameplay.leaderboard.ourplayer.position <= data.gameplay.leaderboard.slots[4].position && data.gameplay.leaderboard.ourplayer.position !== 0){
            slot0.style.transform = "translateY(-70px)";
            slot5.style.transform = "translateY(70px)";
        }
        if (data.gameplay.leaderboard.ourplayer.position <= data.gameplay.leaderboard.slots[3].position && data.gameplay.leaderboard.ourplayer.position !== 0){
            slot0.style.transform = "translateY(-140px)";
            slot4.style.transform = "translateY(70px)";
        }
        if (data.gameplay.leaderboard.ourplayer.position <= data.gameplay.leaderboard.slots[2].position && data.gameplay.leaderboard.ourplayer.position !== 0){
            slot0.style.transform = "translateY(-210px)";
            slot3.style.transform = "translateY(70px)";
        }
        if (data.gameplay.leaderboard.ourplayer.position <= data.gameplay.leaderboard.slots[1].position && data.gameplay.leaderboard.ourplayer.position !== 0){
            slot0.style.transform = "translateY(-280px)";
            slot2.style.transform = "translateY(70px)";
        }
        if (data.gameplay.leaderboard.ourplayer.position <= data.gameplay.leaderboard.slots[0].position && data.gameplay.leaderboard.ourplayer.position !== 0){
            slot0.style.transform = "translateY(-350px)";
            slot1.style.transform = "translateY(70px)";
        }
        if (data.gameplay.leaderboard.ourplayer.position < 6 && (data.gameplay.leaderboard.isVisible == false)){
            middle.style.opacity = 1;
            middle.style.transform = "translateX(0)";
        }
        else{
            middle.style.opacity = 0;
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