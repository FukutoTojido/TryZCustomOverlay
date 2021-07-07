# A **[gosumemory](https://github.com/l3lackShark/gosumemory)** counter based on **[VictimCrasher](https://github.com/VictimCrasher)**'s Wave Tournament counter
## Special Thanks
#### **[13lackShark](https://github.com/l3lackShark/)** - Creator of [gosumemory](https://github.com/l3lackShark/gosumemory)
#### **[VictimCrasher](https://github.com/VictimCrasher)** - Creator of [Wave Tournament Overlay](https://github.com/l3lackShark/static/tree/master/WaveTournament)
#### **[Mune](https://github.com/truongthinh295)** - He did the API thing, really appreciated!!
#### **[Gr33ntii](https://github.com/gr33ntii)** - Cleanup my code and also optimize leaderboard. Very kul guy!!
#### **[Kuroni](https://github.com/kuroni)** - He helped me with the Hit Error Meter thing. Also this man is really good at osu!. One of the best VN No Mod Players \o/
## I WILL NOT PROVIDE ANY SUPPORT FOR CHANGING THE POSITION, SIZE AND ANYTHING RELATED TO THE ELEMENTS INSIDE THE OVERLAY. IF YOU WANT TO CHANGE ANYTHING, DO IT YOURSELF.
## Hold up!
- If you are encountering the scorebar being like below:
![scorebar](https://i.imgur.com/ImKmPG7.png)
- Then most likely you didn't add your API key in `config.json` or the username fetched from the play/replay simply doesn't exist on Bancho server. If you don't like this avatar of [a little cutie Herrscher of Flame by Marin Liekuriva](https://www.hoyolab.com/HI3rd/article/519648), you can change it by replacing `gamer.png` in `TryZCustomOverlay\static\` to your image (reminder that your image name must be `gamer.png`).
## How to use?
- Install **[gosumemory](https://github.com/l3lackShark/gosumemory)** on your computer.
- Download and Extract TryZCustomOverlay.zip into a folder named TryZCustomOverlay.
- Copy and Paste TryZCustomOverlay folder to gosumemory's static folder on your computer.
- Add your API key in config.json file.
- Run gosumemory, wait for it to finish loading and create a localhost URL (e.g. https://127.0.0.1:24050).
- Run OBS, add Browser Source, paste https://127.0.0.1:24050/TryZCustomOverlay into OBS and you're done!
## Some extra features that no one asked in config.json
- `leaderboardEnable`: Turn Leaderboard on or off pernamently
- `leaderboardTab`: Turn on or off the function of Tab button to show or hide Leaderboard (The default value is 0 so you have to turn this on by hand :P ) 
## Changelog:
> #### **1.0.0**
> - Added API. Go to config.json to add the API key.
> - Leaderboard rework, can support full 50-player leaderboard. Also added the way to turn it on or off in config.json.
> - Hit Error Meter rework.
> - UI Redesign
> #### **0.0.3**
> - Removal of API on 13lackShark's request.
> - Odometer Effect added for Combo, Accuracy Stats and PP.
> - Add Hit Error Meter (I died for this), UR Stats.
> - Add Strain Graph above Map Container.
> #### **0.0.2.2**
> - Leaderboard is now optimized thanks to gr33ntii. It will also not depend on player's position on the leaderboard anymore but In-game Leaderboard Visibility.
> - Game Interface has a bug where it won't change its status. Fixed it lol.
> #### **0.0.2.1**
> - Grades is now in the Gameplay Leaderboard :)
> - Gameplay Leaderboard will be hidden when In-game Leaderboard is turned on.
> - Game Interface Awareness - Score, Accuracy, Combo will be hidden when Game Interface is turned on. Avatar, Username, Ranks, Player's PP, Current PP, Mods Combination, Accuracy Stats will change their position to avoid overlapping Game Interface.
> #### **0.0.2**
> - **Gameplay Leaderboard!**: The leaderboard will appear when your ranking is less than 6.
> - **API is now easier to find in index.js!**: Instead of finding the API line somewhere at line 210 zzz, which is kinda succ, you can see it right at the top of index.js.
> - **The code now looks like spaghetti!**: :((((
> #### **0.0.1**
> - Top elements: Score, Accuracy, HP Bar, Username <del>, Avatar, Country, Rank, PP
> - Bottom elements: Accuracy Stats, Combo, PP Counter, Mods Combination, Now Playing, SR
> - Automatically hides top elements when not in gameplay (such as Result Screen, Song Select)
## Screenshot:
![Hidamari no Uta](https://i.imgur.com/d16ZoVf.jpeg)
## Video: 
[![IMAGE ALT TEXT](http://i3.ytimg.com/vi/zCsYjmV4EZU/hqdefault.jpg)](https://www.youtube.com/watch?v=zCsYjmV4EZU "Custom PP Counter 1.0")
[![IMAGE ALT TEXT](https://img.youtube.com/vi/OLJ--b5kam8/0.jpg)](https://www.youtu.be/OLJ--b5kam8
 "Custom PP Counter Initial Release 0.0.1")
