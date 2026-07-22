const n=`#section Act 1 - 20"
Find and kill {kill|Hillock}
➞ {enter|1_1_town} #Lioneye's Watch
Hand in {quest|a1q1} #Enemy at the Gate

➞ {enter|1_1_2} #The Coast
    #sub Start → ➡️ / ↗️
    #sub Spawn facing ⬇️:  usually ⬆️  rare ⬇️ (south variant)
    #sub Handgun: can walk past ↘️ / ➡️ | can't walk past ⬆️
    #sub Cookie Bite: ↗️ wall indent = Long → reset
    #sub Generally Walk East / North-East to identify the direction the Layout is extending. Follow along the Coast and try to get a Layer down for each Layer that you go upwards. A Layer up is indicated by a Ledge / Slope.
    #sub {image|1_1_2 y_12|800}

#ifdef LEAGUE_START
    Get {waypoint_get}
#endif

➞ {enter|1_1_3} #The Mud Flats
    #sub S Variant: spawn facing ⬇️ + long wall >> ⬇️ Nest1 → ➡️ Nest2 → ➡️ Nest3
    #sub E Variant: zone open ⬆️ + ⬇️ >> ➡️ Nest1 → ➡️ Nest2 → ➡️ Nest3 → ↗️ or ↘️ Exit
    #sub N Variant: big rock above start 🪨 ↗️ Nest1 → ↗️ Nest2 → ↖️ Nest3 → ⬆️ or ↖️ Exit
    #sub {image|1_1_3 y_10|800} 

Find 3x{quest_text|Glyph}
    
➞ {enter|1_1_4_1} #The Submerged Passage
#ifdef LEAGUE_START
    {waypoint|1_1_2} #The Coast

    ➞ {enter|1_1_2a} lv 4 #The Tidal Island 
    #sub Start → go ⬅️ (best odds)
    #sub If ⬅️ hits ledge:  turn ➡️ (unless long-gap rule)
    #sub 2 Rocks layout: 2nd rock points ⬅️ → go ⬅️ | 2nd rock points ➡️ → go ➡️
    #sub {image|1_1_2a y_11|900} 

    Find and kill {kill|Hailrake}, take {quest_text|Medicine Chest}
         
    {logout}
    Hand in {quest|a1q5} #Mercy Mission
    Hand in {quest|a1q4} #Breaking Some Eggs
#endif
#ifndef LEAGUE_START
    {waypoint|1_1_town} #Lioneye's Watch
    Hand in {quest|a1q4} #Breaking Some Eggs
#endif

{waypoint|1_1_4_1} #The Submerged Passage
    #sub Waypoint room: only 1 exit (funnel) + no 2nd Room at ⬅️ → Bridge to ⬇️
    #sub Waypoint room: only 1 exit (funnel) + 2nd Room at ⬅️ → Bridge to ↘️
    #sub Zone opens ⬆️: Exit far ↖️
    #sub Zone opens ⬇️: Exit ↘️ or ↗️
    #sub {image|1_1_4_1 y_10|900}
Find bridge, place {portal|set}

➞ {enter|1_1_5} #The Ledge
    #sub Stick mountain wall 🪨 
    #sub After Goat Passage: Switch → follow water side 🌊
    #sub {image|1_1_5 y_2|800}

➞ {enter|1_1_6} #The Climb
    #sub From entrance → hug ⬅️ edge
    #sub {image|1_1_6 y_4|900}

➞ {enter|1_1_7_1} #The Lower Prison
{waypoint|1_1_town} #Lioneye's Watch
Take {portal|use}

➞ {enter|1_1_4_0} #The Flooded Depths
    #sub Mark directions where layout ENDS ⛔ → Boss = opposite direction
    #sub ex:. Ends ↙️ + ↘️ → go ⬆️
    #sub {image|1_1_4_0 y_8|600}

Find and kill {kill|The Dweller of the Deep} 

{logout}
Hand in {quest|a1q7} #The Dweller of the Deep
Hand in {quest|a1q2|a1q2b} #The Caged Brute

{waypoint|1_1_7_1} #The Lower Prison
    #sub Start read: Check ↗️ path first
    #sub ↗️ dead end: East variant → Exit ⬅️
    #sub ↗️ open + Trial straight from WP: Exit ↙️ → log to WP after trial
    #sub Trial faces ↖️ (same as WP side):  Exit far ➡️
    #sub Zone L-turn: Exit ↘️
    #sub ↗️ open but no Trial: Trial far ➡️
    #sub {image|1_1_7_1 y_12|800}

#ifdef LEAGUE_START
    Complete {trial}
#endif

➞ {enter|1_1_7_2} #The Upper Prison
    #sub Check ↗️ first: dead end = ⬅️ Layout | continues = ➡️ Layout
    #sub edge found fast ⬇️ → North variant
    #sub edge found fast ⬆️ → South variant 
    #sub {image|1_1_7_2 y_14|1100}

#ifdef LEAGUE_START
    Find {generic|Chemist's Strongbox}
        #sub Look for map icon, access with nearby switch
        #sub High chance for {generic|Quicksilver Flask}
        #sub Vendor {generic|Quicksilver Flask} + {generic|Orb of Augmentation} + Normal {generic|Boots}
        #sub Vendor {generic|Quicksilver Flask} + {generic|Orb of Augmentation} + Movement Speed {generic|Boots}
#endif
➞ {arena|The Warden's Quarters}, kill {kill|Brutus, Lord Incarcerator}
    #sub Recommended Level: 8
{logout}
Hand in {quest|a1q2|a1q2} #The Caged Brute

{waypoint|1_1_8} #Prisoner's Gate
    #sub Start read = Entrance facing + 1st tunnel
    #sub Facing ↘️ (SE): go ↗️ to 1st tunnel
    #sub Facing ↖️ (NW): go ⬆️ to ledge + tunnel
    #sub Facing ↗️ (NE): tunnel ⬇️ → go ➡️ | tunnel curves ➡️ → go ⬅️
    #sub {image|1_1_8 y_5|200} {image|1_1_8 y_6|200} {image|1_1_8 y_7|200} {image|1_1_8 y_8|200}

➞ {enter|1_1_9} #The Ship Graveyard
    #sub Follow cliff wall side 🪨
    #sub {image|1_1_9 y_5|200} {image|1_1_9 y_6|200} {image|1_1_9 y_7|200} {image|1_1_9 y_8|200} {image|1_1_9 y_9|200}
    #sub {image|1_1_9 y_10|200} {image|1_1_9 y_11|200} {image|1_1_9 y_12|200}

Find {area|1_1_9a}, place {portal|set} #The Ship Graveyard Cave
➞ {enter|1_1_11_1} #The Cavern of Wrath
{waypoint|1_1_town} #Lioneye's Watch
Take {portal|use}

➞ {enter|1_1_9a} #The Ship Graveyard Cave
    #sub Entrance ↔ Allflame = diagonal ↗️↙️
    #sub {image|1_1_9a y_1|200} {image|1_1_9a y_2|300} {image|1_1_9a y_3|250} {image|1_1_9a y_4|250} 

Find {quest_text|Slave Girl}, take {quest_text|Allflame}
➞ {enter|1_1_9}, kill {kill|Captain Fairgraves} #The Ship Graveyard
{logout}
Hand in {quest|a1q6} #The Marooned Mariner
Hand in {quest|a1q3} #The Siren's Cadence

{waypoint|1_1_11_1} #The Cavern of Wrath
    #sub Follow water 🌊
    #sub ↖️ or ↗️
    #sub {image|1_1_11_1 y_4|250} {image|1_1_11_1 y_5|200}
    
➞ {enter|1_1_11_2} #The Cavern of Anger
    #sub Follow water 🌊
    #sub Check upper bridge
    #sub Bridge = dead end: ⬆️ variant | Open: ⬇️ variant
    #sub {image|1_1_11_2 y_4|200} {image|1_1_11_2 y_5|300}
    

➞ {arena|Merveil's Lair}, kill {kill|Merveil, the Siren}
    #sub Follow the water
    #sub Recommended Level: 12

`;export{n as default};
