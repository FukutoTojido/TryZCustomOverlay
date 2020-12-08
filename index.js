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

let progressChart = document.getElementById("progress");
let strainGraph = document.getElementById("strainGraph");

//SLOT

let sloth300 = [],
    sloth100 = [],
    sloth50 = [],
    sloth0 = [],
    slota = [];
let slotN = [],
    slotS = [],
    slotC = [],
    slotR = [],
    slot = [];

let tempslotN = [],
    tempslotS = [],
    tempslotC = [];

let tempslot0r;
for (var i = 0; i <= 5; ++i) {
    slot[i] = document.querySelectorAll("[id^=slot]")[6 * i]; // map slot, count, n, s, c, r 
    slotN[i] = document.querySelectorAll("[id^=slot]")[2 + 6 * i];
    slotS[i] = document.querySelectorAll("[id^=slot]")[3 + 6 * i];
    slotC[i] = document.querySelectorAll("[id^=slot]")[4 + 6 * i];
    slotR[i] = document.querySelectorAll("[id^=slot]")[5 + 6 * i];

}


// SLOT 1
//let slot1 = document.getElementById("slot1");

socket.onopen = () => {
    console.log("Successfully Connected");
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

let animation = {
    acc: new CountUp('acc', 0, 0, 2, .2, {
        useEasing: true,
        useGrouping: false,
        separator: " ",
        decimal: ".",
        suffix: "%"
    }),
    score: new CountUp('score', 0, 0, 0, .2, {
        useEasing: true,
        useGrouping: true,
        separator: " ",
        decimal: "."
    }),
    combo: new CountUp('combo', 0, 0, 0, .2, {
        useEasing: true,
        useGrouping: true,
        separator: " ",
        decimal: ".",
        suffix: "x"
    }),
    starsCurrent: new CountUp('starsCurrent', 0, 0, 2, .2, {
        useEasing: true,
        useGrouping: true,
        separator: " ",
        decimal: ".",
        prefix: "Now: ",
        suffix: "*"
    }),
    stars: new CountUp('stars', 0, 0, 2, .2, {
        useEasing: true,
        useGrouping: true,
        separator: " ",
        decimal: ".",
        prefix: "Full: ",
        suffix: "*"
    }),
    /*pp: new CountUp('pp', 0, 0, 0, .2, {
        useEasing: true,
        useGrouping: true,
        separator: " ",
        decimal: ".",
        suffix: "pp"
    }),*/
    slot0s: new CountUp('slot0s', 0, 0, 0, .2, {
        useEasing: true,
        useGrouping: true,
        separator: " ",
        decimal: "."
    }),
    slot0c: new CountUp('slot0c', 0, 0, 0, .2, {
        useEasing: true,
        useGrouping: true,
        separator: " ",
        decimal: ".",
        suffix: "x"
    }),
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

let tempStrainBase;
let smoothOffset = 2;
let seek;
let fullTime;

socket.onmessage = event => {
    let data = JSON.parse(event.data);
    let getUser = async() => {
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
        // slot0a.style.backgroundImage = `url('https://a.ppy.sh/${tempUID}')`; useless for now
    }
    ava.style.backgroundSize = "100%";
    if (gameState !== data.menu.state) {
        gameState = data.menu.state;
        if (gameState == 2) {} else {
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

            slot[0].style.transform = "translateY(0)";
            slot[1].style.transform = "translateY(0)";
            slot[2].style.transform = "translateY(0)";
            slot[3].style.transform = "translateY(0)";
            slot[4].style.transform = "translateY(0)";
            slot[5].style.transform = "translateY(0)";


        }
    }
    if (tempUsername !== data.gameplay.name) {
        tempUsername = data.gameplay.name;
        slotN[5].innerHTML = tempUsername;
        username.innerHTML = tempUsername;
    }
    if (tempImg !== data.menu.bm.path.full) {
        tempImg = data.menu.bm.path.full;
        data.menu.bm.path.full = data.menu.bm.path.full.replace(/#/g, '%23').replace(/%/g, '%25').replace(/\\/g, '/');
        mapContainer.style.backgroundImage = `url('http://127.0.0.1:24050/Songs/${data.menu.bm.path.full}?a=${Math.random(10000)}')`;
        mapContainer.style.backgroundPosition = "50% 50%";
    }
    if (tempMapName !== data.menu.bm.metadata.title) {
        tempMapName = data.menu.bm.metadata.title;
        tempMapArtist = data.menu.bm.metadata.artist;
        mapTitle.innerHTML = tempMapArtist + ' - ' + tempMapName;
    }
    if (tempMapDiff !== '[' + data.menu.bm.metadata.difficulty + ']') {
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
        slotS[5].innerHTML = tempScore;
        score.innerHTML = tempScore;
        animation.score.update(score.innerHTML);
        animation.slot0s.update(slotS[5].innerHTML);
    }
    if (tempAcc !== data.gameplay.accuracy) {
        tempAcc = data.gameplay.accuracy;
        acc.innerHTML = tempAcc;
        animation.acc.update(acc.innerHTML);
    }
    if (tempCombo !== data.gameplay.combo.current) {
        tempCombo = data.gameplay.combo.current;
        if (data.gameplay.combo.current == data.gameplay.combo.max) {
            tempMaxCombo = data.gameplay.combo.max;
            slotC[5].innerHTML = tempMaxCombo;
        }
        combo.innerHTML = tempCombo;
        animation.combo.update(combo.innerHTML);
        animation.slot0c.update(slotC[5].innerHTML);
    }
    if (temp300 !== data.gameplay.hits[300]) {
        temp300 = data.gameplay.hits[300];
        h300.innerHTML = temp300;
    }
    if (temp100 !== data.gameplay.hits[100]) {
        temp100 = data.gameplay.hits[100];
        h100.innerHTML = temp100;
    }
    if (temp50 !== data.gameplay.hits[50]) {
        temp50 = data.gameplay.hits[50];
        h50.innerHTML = temp50;
    }
    if (temp0 !== data.gameplay.hits[0]) {
        temp0 = data.gameplay.hits[0];
        h0.innerHTML = temp0;
    }
    if (tempPP !== data.gameplay.pp.current) {
        tempPP = data.gameplay.pp.current;
        pp.innerHTML = tempPP + 'pp';
        //animation.pp.update(pp.innerHTML);
    }
    if (tempMods !== data.menu.mods.str) {
        if (data.menu.mods.num == 0) {
            tempsMods = "None";
        } else {
            tempsMods = data.menu.mods.str;
        }
        mods.innerHTML = 'Mods: ' + tempsMods;
    }

    if (gameState == 2 && data.menu.bm.time.current <= (data.menu.bm.time.firstObj + 1000)) {
        for (let z = 0; z < 5; z++) {
            tempslotN[z] = data.gameplay.leaderboard.slots[z].name;
            tempslotS[z] = data.gameplay.leaderboard.slots[z].score;
            tempslotC[z] = data.gameplay.leaderboard.slots[z].maxCombo;
            sloth300[z] = data.gameplay.leaderboard.slots[z].h300;
            sloth100[z] = data.gameplay.leaderboard.slots[z].h100;
            sloth50[z] = data.gameplay.leaderboard.slots[z].h50;
            sloth0[z] = data.gameplay.leaderboard.slots[z].h0;
            slota[z] = (sloth300[z] * (1) + sloth100[z] * (1 / 3) + sloth50[z] * (1 / 6)) / (sloth300[z] + sloth100[z] + sloth50[z] + sloth0[z]);
            switch (true) {
                case (slota[z] == 1):
                    slotR[z].innerHTML = "X";
                    slotR[z].style.color = "#f24671";
                    break;
                case (slota[z] > 0.9 && sloth50[z] / (sloth300[z] + sloth100[z] + sloth50[z] + sloth0[z]) < 0.01 && sloth0[z] == 0):
                    slotR[z].innerHTML = "S";
                    slotR[z].style.color = "#f2d646";
                    break;
                case ((slota[z] > 0.8 && slota[z] <= 0.9 && sloth0[z] == 0) || (sloth300[z] / (sloth300[z] + sloth100[z] + sloth50[z] + sloth0[z]) > 0.9)):
                    slotR[z].innerHTML = "A";
                    slotR[z].style.color = "#46f26e";
                    break;
                case ((slota[z] > 0.7 && slota[z] <= 0.8 && sloth0[z] == 0) || (sloth300[z] / (sloth300[z] + sloth100[z] + sloth50[z] + sloth0[z]) > 0.8)):
                    slotR[z].innerHTML = "B";
                    slotR[z].style.color = "#469cf2";
                    break;
                case ((sloth300[z] / (sloth300[z] + sloth100[z] + sloth50[z] + sloth0[z]) > 0.6) || (sloth300[z] / (sloth300[z] + sloth100[z] + sloth50[z] + sloth0[z]) <= 0.8)):
                    slotR[z].innerHTML = "C";
                    slotR[z].style.color = "#9f46f2";
                    break;
                case ((sloth300[z] / (sloth300[z] + sloth100[z] + sloth50[z] + sloth0[z]) <= 0.6)):
                    slotR[z].innerHTML = "D";
                    slotR[z].style.color = "#5c5c5c";
                    break;
            }
            slotN[z].innerHTML = tempslotN[z];
            slotS[z].innerHTML = numberWithCommas(tempslotS[z]);
            slotC[z].innerHTML = tempslotC[z] + 'x';
        }
    }
    if (tempslot0r !== data.gameplay.hits.grade.current) {
        tempslot0r = data.gameplay.hits.grade.current;
        switch (tempslot0r) {
            case "SS":
                slotR[5].innerHTML = "X";
                slotR[5].style.color = "#f24671";
                break;
            case "S":
                slotR[5].innerHTML = tempslot0r;
                slotR[5].style.color = "#f2d646";
                break;
            case "A":
                slotR[5].innerHTML = tempslot0r;
                slotR[5].style.color = "#46f26e";
                break;
            case "B":
                slotR[5].innerHTML = tempslot0r;
                slotR[5].style.color = "#469cf2";
                break;
            case "C":
                slotR[5].innerHTML = tempslot0r;
                slotR[5].style.color = "#9f46f2";
                break;
            case "D":
                slotR[5].innerHTML = tempslot0r;
                slotR[5].style.color = "#5c5c5c";
                break;
        }

    } else if (gameState == 2 && data.menu.bm.time.current > (data.menu.bm.time.firstObj + 1000)) {
        console.log(data.gameplay.leaderboard.isVisible);
        if (data.gameplay.leaderboard.ourplayer.position <= data.gameplay.leaderboard.slots[4].position && data.gameplay.leaderboard.ourplayer.position !== 0) {
            slot[5].style.transform = "translateY(-70px)";
            slot[4].style.transform = "translateY(70px)";
        }
        if (data.gameplay.leaderboard.ourplayer.position <= data.gameplay.leaderboard.slots[3].position && data.gameplay.leaderboard.ourplayer.position !== 0) {
            slot[5].style.transform = "translateY(-140px)";
            slot[3].style.transform = "translateY(70px)";
        }
        if (data.gameplay.leaderboard.ourplayer.position <= data.gameplay.leaderboard.slots[2].position && data.gameplay.leaderboard.ourplayer.position !== 0) {
            slot[5].style.transform = "translateY(-210px)";
            slot[2].style.transform = "translateY(70px)";
        }
        if (data.gameplay.leaderboard.ourplayer.position <= data.gameplay.leaderboard.slots[1].position && data.gameplay.leaderboard.ourplayer.position !== 0) {
            slot[5].style.transform = "translateY(-280px)";
            slot[1].style.transform = "translateY(70px)";
        }
        if (data.gameplay.leaderboard.ourplayer.position <= data.gameplay.leaderboard.slots[0].position && data.gameplay.leaderboard.ourplayer.position !== 0) {
            slot[5].style.transform = "translateY(-350px)";
            slot[0].style.transform = "translateY(70px)";
        }
        if ( /*data.gameplay.leaderboard.ourplayer.position < 6 && */ (data.gameplay.leaderboard.isVisible == false) && (data.gameplay.leaderboard.hasLeaderboard == true) && (data.gameplay.leaderboard.slots.length > 6)) {
            middle.style.opacity = 1;
            middle.style.transform = "translateX(0)";
        } else {
            middle.style.opacity = 0;
        }
    } else {
        slot[5].style.transform = "translateY(0)";
        slot[0].style.transform = "translateY(0)";
        slot[1].style.transform = "translateY(0)";
        slot[2].style.transform = "translateY(0)";
        slot[3].style.transform = "translateY(0)";
        slot[4].style.transform = "translateY(0)";
    }

    if (data.gameplay.hp.smooth > 0) {
        hp.style.transform = `scaleX(${data.gameplay.hp.smooth / 200})`;
    } else {
        hp.style.transform = `scaleX(1)`;
    }
    if (tempCountry !== user.country) {
        tempCountry = user.country;
        country.style.background = `url('https://osu.ppy.sh/images/flags/${tempCountry}.png') no-repeat`;
        country.style.backgroundSize = "22.5px 15px";
        country.style.backgroundPosition = "50% 50%";
    }
    if (tempRanks !== user.pp_rank) {
        tempRanks = user.pp_rank;
        ranks.innerHTML = "#" + tempRanks;
    }
    if (tempPlayerPP !== user.pp_raw) {
        tempPlayerPP = user.pp_raw;
        playerPP.innerHTML = Math.round(tempPlayerPP) + "pp";
    }
    if (tempTimeCurrent !== data.menu.bm.time.current || tempTimeFull !== data.menu.bm.time.mp3) {
        tempTimeCurrent = data.menu.bm.time.current;
        tempTimeFull = data.menu.bm.time.mp3;
        overlay.style.clipPath = `inset(0 ${(1 - (tempTimeCurrent / tempTimeFull)) * 100}% 0 0)`;
        if (gameState == 2) {
            interfaceID = data.settings.showInterface;
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
            mapContainer.style.transform = "translateX(700px)";
            if (interfaceID == 1) {
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
            } else {
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
    if (fullTime !== data.menu.bm.time.mp3) {
        fullTime = data.menu.bm.time.mp3;
        onepart = 490 / fullTime;
    }
    if (tempStrainBase != JSON.stringify(data.menu.pp.strains)) {
        tempLink = JSON.stringify(data.menu.pp.strains);
        smoothed = smooth(data.menu.pp.strains, smoothOffset);
        config.data.datasets[0].data = smoothed;
        config.data.labels = smoothed;
        configSecond.data.datasets[0].data = smoothed;
        configSecond.data.labels = smoothed;
        window.myLine.update();
        window.myLineSecond.update();
    }
    if (seek !== data.menu.bm.time.current && fullTime !== undefined && fullTime != 0) {
        seek = data.menu.bm.time.current;
        progressChart.style.width = onepart * seek + 'px';
    }
}
window.onload = function() {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);

    var ctxSecond = document.getElementById('canvasSecond').getContext('2d');
    window.myLineSecond = new Chart(ctxSecond, configSecond);
};

let config = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            borderColor: 'rgba(255, 255, 255, 0)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            data: [],
            fill: true,
        }]
    },
    options: {
        tooltips: { enabled: false },
        legend: {
            display: false,
        },
        elements: {
            line: {
                tension: 0.4,
                cubicInterpolationMode: 'monotone'
            },
            point: {
                radius: 0
            }
        },
        responsive: false,
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            }
        }
    }
};

let configSecond = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            borderColor: 'rgba(0, 0, 0, 0.3)',
            borderWidth: '2',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            data: [],
            fill: true,
        }]
    },
    options: {
        tooltips: { enabled: false },
        legend: {
            display: false,
        },
        elements: {
            line: {
                tension: 0.4,
                cubicInterpolationMode: 'monotone'
            },
            point: {
                radius: 0
            }
        },
        responsive: false,
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            }
        }
    }
};