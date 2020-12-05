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

socket.onopen = () => {
    console.log("Successfully Connected");
};

let animation = {
    acc:  new CountUp('acc', 0, 0, 2, .2, {useEasing: true, useGrouping: false,   separator: " ", decimal: ".", suffix:"%" }),
    score:  new CountUp('score', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." }),
    combo:  new CountUp('combo', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." , suffix:"x"}),
    starsCurrent:  new CountUp('starsCurrent', 0, 0, 2, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." , prefix: "Now: ", suffix:"*"}),
    stars:  new CountUp('stars', 0, 0, 2, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: ".", prefix: "Full: ", suffix: "*"}),
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

let tempTimeCurrent;
let tempTimeFull;

socket.onmessage = event => {
    let data = JSON.parse(event.data);
    if(gameState !== data.menu.state){
        gameState = data.menu.state;
        if (gameState == 2){
            score.style.transform = "translateX(0)";
            acc.style.transform = "translateX(0)";
            combo.style.transform = "translateX(0)";
            pp.style.transform = "translateX(0)";
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
            accInfo.style.transform = "translateX(-500px)";
            ava.style.transform = "translateY(-300px)";
            playerPP.style.transform = "translateY(-300px)";
            username.style.transform = "translateY(-300px)";
            country.style.transform = "translateY(-300px)";
            ranks.style.transform = "translateY(-300px)";
            hp.style.opacity = 0;
            mapContainer.style.transform = "translateX(0px)";
        }
    }
    if(tempUsername !== data.gameplay.name){
        tempUsername = data.gameplay.name;
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
    let gerUser = async () => {
        try {
            const response = await axios.get("/get_user", {
                baseURL: "https://osu.ppy.sh/api",
                params: {
                    k: "",
                    u: `${data.gameplay.name}`,
                },
            });
            return response.data[0];
            } catch (error) {
            console.error(error);
        }
    };
    Promise.resolve(gerUser()).then((data) => Object.assign(user, data));
	if (tempUID !== user.user_id) {
        tempUID = user.user_id;
		ava.style.backgroundImage = `url('https://a.ppy.sh/${tempUID}')`;
    }
    ava.style.backgroundSize = "100%";
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