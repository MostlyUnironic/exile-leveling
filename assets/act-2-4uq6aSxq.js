const e=`#section Act 2
➞ {enter|1_2_1} #The Southern Forest
    #sub Follow cliff / east edge ➡️
    #sub {image|1_2_1 y_1|250}

➞ {enter|1_2_town} #The Forest Encampment

➞ {enter|1_2_2} #The Old Fields
    #sub Follow road {dir|45} → Crossroads
    #sub Place portal near Den
    #sub {image|1_2_2 y_1|500}

#ifdef LEAGUE_START
    Find {area|1_2_2a}, place {portal|set} #The Den
#endif

➞ {enter|1_2_3} #The Crossroads
    #sub From WP:
    #sub ↖️ Chamber of Sins
    #sub ↗️ Broken Bridge
    #sub ↘️ Fellshrine Ruins
    #sub XP option: Yellow path → Breach
    #sub {image|1_2_3 y_1|250}

Get {waypoint_get}


{waypoint|1_2_town} #The Forest Encampment

Take {portal|use}

➞ {enter|1_2_2a} #The Den

Find and kill {kill|The Great White Beast}

{logout}

Hand in {quest|a2q10} #The Great White Beast

{waypoint|1_2_3} #The Crossroads
    #sub From WP:
    #sub ↖️ Chamber of Sins
    #sub XP option: Yellow path → Breach
    #sub {image|1_2_3 y_1|250}

➞ {enter|1_2_6_1} #The Chamber of Sins Level 1
    #sub {waypoint} always next to Sins 2 passage
    #sub Start → move ↘️ to find top corner of inner room
    #sub If WP seen → go opposite direction
    #sub If no WP → follow wall around inner room
    #sub {image|1_2_6_1 y_1|700}

➞ {enter|1_2_6_2} #The Chamber of Sins Level 2
    #sub {image|1_2_6_2 y_1|600}

#ifdef LEAGUE_START
    Complete {trial}
#endif

Kill {kill|Fidelitas, the Mourning}, take {quest_text|Baleful Gem}
    #sub Recommended Level: 14-15

{logout}

Hand in {quest|a2q6} #Intruders in Black

➞ {enter|1_2_7} #The Riverways
    #sub Follow road: Forest Encampment ↔ Western Forest
    #sub If WP appears immediately after entering: reset instance from WP (faster layout)
    #sub Wetlands ↖️ from WP
    #sub {image|1_2_7 y_1|750}

Get {waypoint_get}

➞ {enter|1_2_9} #The Western Forest
    #sub Follow road: Blackguard Camp
    #sub Weaver = opposite side of road from WP
    #sub Alira = same side as WP
    #sub {image|1_2_9 y_1|550}

Get {waypoint_get}

➞ {enter|1_2_10} #The Weaver's Chambers
    #sub Follow left wall from entrance ⬅️
    #sub Search the side of road opposite {waypoint}
    #sub {image|1_2_10 y_1|650}

➞ {arena|The Weaver's Nest}, kill {kill|The Weaver}, take {quest_text|Maligaro's Spike}
    #sub Try go {dir|270}, if it's blocked go {dir|45}
    #sub Recommended Level: 16

{logout}

Hand in {quest|a2q4} #Sharp and Cruel

{waypoint|1_2_3} #The Crossroads
    #sub ↗️ Broken Bridge
    #sub {image|1_2_3 y_1|250}

➞ {enter|1_2_4} #The Broken Bridge
    #sub Follow road {dir|45}
    #sub {image|1_2_4 y_1|600}

Kill {kill|Kraityn, Scarbearer}, take {quest_text|Kraityn's Amulet}
    #sub Follow the road

{logout}

{waypoint|1_2_7} #The Riverways
    #sub Follow road: Western Forest ↔ Forest Encampment
    #sub If WP appears very early: reset instance from WP (faster layout)
    #sub Wetlands exit = north-west of waypoint ↖️
    #sub {image|1_2_7 y_1|500}

➞ {enter|1_2_12} #The Wetlands
    #sub Move ↖️ to find Oak
    #sub {image|1_2_12 y_1|600}

Find and kill {kill|Oak, Skullbreaker}, take {quest_text|Oak's Amulet}

Get {waypoint_get}

{waypoint|1_2_9} #The Western Forest
    #sub Follow road: Blackguard Camp
    #sub Alira = same side as WP
    #sub {image|1_2_9 y_1|500}

Kill {kill|Alira Darktongue}, take {quest_text|Alira's Amulet}
    #sub Go {dir|180} look for the torch touching the road
    #sub Follow the trail in the direction of the torch

Kill {kill|Captain Arteri}
    #sub Follow the road {dir|225}

Take {quest_text|Thaumetic Emblem}, activate {quest_text|Thaumetic Seal}

{logout}

Hand in {quest|a2q7}, take {quest_text|The Apex} #Deal with the Bandits

{waypoint|1_1_town} #Lioneye's Watch

Hand in {quest|a1q9} #The Way Forward

{waypoint|1_2_3} #The Crossroads

➞ {enter|1_2_15} #The Fellshrine Ruins
    #sub #sub Follow the road {dir|135}
    #sub {image|1_2_15 y_1|250}

➞ {enter|1_2_5_1} #The Crypt Level 1
    #sub Draw horizontal line through start room
    #sub Waypoint below line ⬇️: Follow opposite wall of Waypoint
    #sub Waypoint above line ⬆️: Follow wall behind Waypoint   
    #sub {image|1_2_5_1 y_1|750}

#ifdef LEAGUE_START
    Complete {trial}
#endif

➞ {enter|1_2_5_2} #The Crypt Level 2
    #sub {image|1_2_5_2 y_1|750}

Find {quest_text|Altar}, take {quest_text|Golden Hand}

{portal|use}

Hand in {quest|a2q5} #Through Sacred Ground

{waypoint|1_2_12} #The Wetlands

Poison the {quest_text|Tree Roots} 

➞ {enter|1_2_11} #The Vaal Ruins
    #sub Walk forward
    #sub Dead end / edge → turn where zone continues
    #sub Continue forward
    #sub {image|1_2_11 y_1|600}

➞ {enter|1_2_8} #The Northern Forest
    #sub follow waterside east edge ⬆️
    #sub {image|1_2_8 y_1|500}

➞ {enter|1_2_14_2} #The Caverns
    #sub Secret door → rubble room | Room has 2 fallen rubble walls
    #sub {image|1_2_14_2 y_1|700}

Get {crafting}

➞ {enter|1_2_14_3} #The Ancient Pyramid
    #sub Stairs always diagonal ↗️↙️ from entrance

➞ {arena|Pyramid Apex}, kill {kill|Vaal Oversoul}
    #sub First floor exit will be in one of the 3 corners
    #sub Remaining floors will have the exit diagonally across from the entrance
    #sub Recommended Level: 20-22

Get {crafting}   

{logout}`;export{e as default};
