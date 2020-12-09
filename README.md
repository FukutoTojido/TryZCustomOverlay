# A **[gosumemory](https://github.com/l3lackShark/gosumemory)** counter based on **[VictimCrasher](https://github.com/VictimCrasher)**'s Wave Tournament counter
## Special Thanks
#### **[13lackShark](https://github.com/l3lackShark/)** - Creator of [gosumemory](https://github.com/l3lackShark/gosumemory)
#### **[VictimCrasher](https://github.com/VictimCrasher)** - Creator of [Wave Tournament Overlay](https://github.com/l3lackShark/static/tree/master/WaveTournament)
#### **[Mune](https://github.com/truongthinh295)** - He did the API thing, really appreciated!!
#### **[Gr33ntii](https://github.com/gr33ntii)** - Cleanup my code and also optimize leaderboard. Very kul guy!!
## How to use?
- Install **[gosumemory](https://github.com/l3lackShark/gosumemory)** on your computer.
- Download and Extract TryZCustomOverlay.zip into a folder named TryZCustomOverlay.
- Copy and Paste TryZCustomOverlay folder to gosumemory's static folder on your computer.
- <del> Open index.js with Notepad++, look at line 2 (`let api = ""`), paste your osu!API key inside the quotes and the save the file. </del>(Removed because of 13lackShark's request)
- Run gosumemory, wait for it to finish loading and create a localhost URL (e.g. https://127.0.0.1:24050).
- Run OBS, add Browser Source, paste https://127.0.0.1:24050/TryZCustomOverlay into OBS and you're done!
## Changelog:
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
![Hidamari no Uta](https://i.imgur.com/E2wXoJq.png)
## Video: 
[![IMAGE ALT TEXT](https://img.youtube.com/vi/B2GcuRu0oII/0.jpg)](https://youtu.be/B2GcuRu0oII "Custom PP Counter Initial Release 0.0.1")
