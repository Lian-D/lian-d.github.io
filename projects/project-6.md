---
layout: project
type: project
image: images/Walmariomaker.png
title: Walmark Mario Maker
permalink: projects/Walmariomaker
# All dates must be YYYY-MM-DD format!
date: 2022-10-22
labels:
  - TypeScript
  - D3
  - Antler
  - DSL
  - React
summary: A DSL that allows users to create platformer games in a JSON-like manner 
---

# Walmart Mario Maker
Walmart Mario Maker is a tool that allows users to create 2d platformer levels with a simple domain specific language.

## How do I run the project?
To run this project perform the following steps: <br>
1. Navigate to platformer-game directory and run ``` npm install ``` <br>
2. Run ``` tsc ```
3. Run ``` npm start ``` <br>
4. Open another terminal and navigate to the backend directory, and run ``` npm install ``` <br>
5. Run ``` npm run build ``` to compile the backend <br>
6. Run ``` npm run start ``` to start the server
7. A react project should open in your browser <br>
8. Create a text file using our language and save it with a ``` .gregor ``` extension <br>
9. Upload the file into the file selector in the react project <br>
10. If the input file is correct, you will be redirected to the game, otherwise an error message will appear on the home page

----
# Documentation for a .gregor file
<p>A .gregor file is composed entirely of objects. We have pre-defined object types like terrain and enemies that will
be placed within a special object type: the level.</p>

__NOTE: THE ORDER OF DECLARATIONS DOES MATTER.__

Our levels must be defined
at the very end of the file, after all other objects are declared. The player will start in the first level defined.

Example  file:
```
Player player: {
    speed: 1
    health: 4
}
Enemy Slime: {
    Behaviour: STILL
    Speed: 2
    colour: #042b2b
    image: https://media.discordapp.net/attachments/969645894616096858/1028893886124412949/theTriangle.png
}

Enemy Goblin: {
    Behaviour: FOLLOW
    Speed: 0.4
    colour: #042b2b
    image: https://media.discordapp.net/attachments/969645894616096858/1028893886124412949/theTriangle.png
}

Terrain terrainType1: {
    image: none
    colour: #042b2b
}

Platform platformType1: {
    image: none
    colour: #008080
}

Door doorType1: {
    image: https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/33142/door-clipart-md.png
    key: none
}

Door doorType2: {
    image: https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/33142/door-clipart-md.png
    key: buttonType1
}

Coin coinType1: {
    image: https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Racket-logo.svg/1200px-Racket-logo.svg.png
    value: 1
}

Button buttonType1: {
    image: https://media.discordapp.net/attachments/1017526051989106740/1027763213896515615/key-png-11.png
}

Level level1 {
    player: (200, 50)
    height: 900
    width: 3000
    background: https://media.discordapp.net/attachments/1019466411044765716/1029542966185971822/bg.png
    Terrain: 
        terrainType1: [
            (terrain1, 1500, 300, 500), 
            (terrain2, 0,0, 500),
            (terrain3, 1000,0, 2000)
            ]
    Platform:
        platformType1: [
            (plat1, 1000,300,500),
            (plat2, 500,200,500),
            (plat3, 2000,300,500)
        ]
    Enemy: 
        Slime: [
            (slime1, 2500, 50)
        ]
        Goblin: [
            (Goblin1, 1500, 50) 
        ]
    Door: 
        doorType1: [
            (door1, level2, door2, 2000, 50)
        ]
    Button:
        buttonType1: [
            (button1, 100,100)
        ]
    Coin: 
        coinType1: [
            (c1, 1200,500),
            (c2, 700, 400)
        ]
    Checks: [
      IF: (MONEY > 1 OR buttonType1) {
            Door: Add (d1spawn, doorType1, 100, 90, level2, door2)
            Enemy: Add (gspawn1, Goblin, 10, 110)
        }
    ]
}

Level level2 {
    player: (500, 250)
    height: 900
    width: 2000
    background: https://media.discordapp.net/attachments/1019466411044765716/1029542966185971822/bg.png
    Terrain: 
        terrainType1: [
            (terrain1, 1500, 300, 500), 
            (terrain2, 0,0, 500),
            (terrain3, 1000,0, 2000)
            ]
    Platform:
        platformType1: [
            (plat4, 900,300,400),
            (plat5, 500,200,400),
            (plat6, 1700,500,100),
            (plat7, 1300,650,100),
            (plat8, 750,800,200)
        ]
    Enemy: 
        Goblin: [
            (Goblin1, 1800, 350) 
        ]
    Door: 
        doorType1: [
            (door2, level1, door1, 200, 50)
        ]
        doorType2: [
            (door3, win, win, 1550, 50)
        ]
    Button:
        buttonType1: [
            (red1, 750,850)
        ]
    Coin: 
        coinType1: [
            (c1, 1200,500),
            (c2, 700, 400)
        ]
    Checks: [
   ]
}

```

# Objects
The basis of a .gregor file. An object is declared as following:

```
Type subtype: {
    property0: 1
    property1: 2
    property2: none
}
```

When declaring an object, ALL of its respective properties for the corresponding type of object
(see types below) must be defined: either with a value or `none`.

The `image` property will overwrite the colour property if given a valid image.

___
## Player
Only one of these may be defined. The thing the character controls.
### Properties
`speed` : Integer<br> 
- The speed of the character. Defined in tiles/tick (?)

`health`: Integer<br>
- The amount of hits our character can take.

### Example Usage
```
Player player: {
    speed: 1
    health: 4
}
```

___
## Enemy
<p>Hostile entities we can place within our level. If the player touches one, they take damage.</p>

### Properties
`behaviour`: Behaviour<br>
- How our enemy will function. Below are the current supported behaviours:
  - `STILL` - Enemy will not move
  - `FOLLOW` - Enemy will follow the player

`speed`: Integer<br>
- The speed of the given enemy. Only really matters if the behaviour is set to `FOLLOW`

`colour`: Hexidecimal colour value
- The colour of our enemy. If no image is given, the enemy will be a rectangle.

`image`: URL
- Image representing our enemy. Overwrites the `colour` property if url given is valid

### Example Usage
```
Enemy Slime: {
    behaviour: STILL
    speed: 2
    colour: #042b2b
    image: https://media.discordapp.net/attachments/969645894616096858/1028893886124412949/theTriangle.png
}
```
___

## Terrain
<p>Solid ground for our player. NOTE: it's advised that you spawn the player on this. Without it, you will immediately fall to the bottom of the screen and die.</p>

### Properties
`colour`: Hexidecimal colour value
- The colour of our terrain. If no image is given, the enemy will be a rectangle.

`image`: URL
- Image representing our terrain. Overwrites the `colour` property if url given is valid

### Example usage
```
Terrain terrainType1: {
    image: none
    colour: #042b2b
}
```
___

## Platform
<p>Platforms for our player. Unlike terrain, we can jump through the bottom of platforms.

### Properties
`colour`: Hexidecimal colour value
- The colour of our platform. If no image is given, the enemy will be a rectangle.

`image`: URL
- Image representing our platform. Overwrites the `colour` property if url given is valid

### Example usage
```
Platform platformType1: {
    image: none
    colour: #008080
}
```

___
## Door
A door leading to either a different level, or the win condition. The location the door leads to is defined in the `Level` object.

### Properties
`image`: URL
- Image representing our door. 

`key`: Button
- A key required for our door to open. If button given exists in the same level and is collected, the door will spawn and allow the player to go through. If specified as "none", then the door will be spawned in at game start or level load.

### Example usage
```
Door doorType1: {
    image: https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/33142/door-clipart-md.png
    key: buttonType1
}
```

___
## Coin
Collectable coins for our player. Collecting these will increase `MONEY` by `value`

### Properties
`image`: URL
- Image representing our coin.

`value`: Integer
- Amount that `MONEY` will increase by when collected.

### Example usage
```
Coin coinType1: {
    image: https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Racket-logo.svg/1200px-Racket-logo.svg.png
    value: 1
}
```
___
## Levels
While a level itself is technically an object and is defined the same way, they are special objects that essentially serve as the program.

### Properties
`player`: (Integer, Integer)
 - The spawn location for the player. If this is the first level defined, it is the start position. If not, then it is the location a player will be teleported to when entering a door that leads to this level. The first integer is starting x position, and the second integer is starting y position.

`height`: Integer
 - The height of the level in tiles.
 
`width`: Integer
 - The width of the level in tiles.

`background`: URL
 - Image that will be used as the level's background.

### Object Categories
These are "properties." They look similiar, but more serve to group things that will be spawned. Inside a category, we will
use the name of an object with the same type as the category as a subcategory.
Inside a subcategory will be an array with individual instances of that object in question:

```
Type: 
    subtype: [
        (name0, value, value), 
        (name1, value, value, value),
        (name2, value, value, value)
        ]
    subtype: [
        (name0, value, value), 
        (name1, value, value, value),
        (name2, value, value, value)
        ]
```

`Terrain` : (name, XPOS, YPOS, LENGTH)
 - Categorizer for terrain.
   - Example Usage:
   ```    
     Terrain: 
          terrainType1: [
              (terrain1, 1500, 300, 500), 
              (terrain2, 0,0, 500),
              (terrain3, 1000,0, 2000)
              ]
      ```

`Platform` : (name, XPOS, YPOS, LENGTH)
- Categorizer for platforms.
- Example Usage:
    ```
      Platform:
        platformType1: [
            (plat4, 900,300,400),
            (plat5, 500,200,400),
            (plat6, 1700,500,100),
            (plat7, 1300,650,100),
            (plat8, 750,800,200)
        ]
  ```
  
`Enemy` : (name, XPOS, YPOS)
- Categorizer for enemies.
- Example Usage:
  ```
      Enemy: 
        Slime: [
            (slime1, 2500, 50)
        ]
        Goblin: [
            (goblin1, 1500, 50) 
        ]
  ```
  
`Door` : (name, exit level, exit door, XPOS, YPOS)
- Categorizer for doors. If a player enters a given door, they will be teleported to an instance of `exit door` in the `exit level`. Note that in order to place a door that will result in the player winning when they go through it, `exit level` and `exit door` MUST both be `win`. An example is provided below with doorType2.  
- Example Usage:
  ```
      Door: 
        doorType1: [
            (door2, level1, door1, 200, 50)
        ]
        doorType2: [
            (door3, win, win, 1550, 50)
        ]
  ```
  
`Button` : (name, XPOS, YPOS)
- Categorizier for buttons.
- Example Usage:
  ```
      Button:
        buttonType1: [
            (red1, 750,850)
        ]
  ```
  
`Coin` : (name, XPOS, YPOS)
- Categorizer for coins.
- Example Usage:
  ```
      Coin: 
        coinType1: [
            (c1, 1200,500),
            (c2, 700, 400)
        ]
  ```
  
### Checks
By using the keyword `IF` we can have actions be triggered by checks: either a button press or a value comparison.

`Checks`
  - We store our events here. An event is defined by first using the `IF` keyword. 
  

  - Conditionals
    - Following an `IF`, we put our conditional:
      - Up to a maximum of two conditions can be placed here, using an `OR` operator
        - A statement can be a logical comparison of values:
          - `CONST OP value`
            - supported `OP`s are: `<, >, <=, >=, ==`
            - supported `CONST`s are: `HEALTH, MONEY`
        - Or a button check:
          - `buttonName`
            - `buttonName` must be the name of a button already defined


  - Events
    - Follow a conditional, we can either `Add` or `Remove` objects. The general structure is as follows:
    - `Type: Add (name, sub type, XPOS, YPOS)`
      - What's in the parentheses depends on the type of object. See above for syntax.
    - `Type: Remove (name)`
  - Example usage:
    - In this example, a door is spawned and an enemy goblin1 is removed when the player has MONEY value greater than 1 or when the button buttonType1 is collected.
    ```
    Checks: [
      IF: (MONEY > 1 OR buttonType1) {
            Door: Add (d1spawn, doorType1, 100, 90, level2, door2)
            Enemy: Remove (goblin1)
        }
    ]
    ```
Finally, we can put everything together:
### Example usage
```
Level level1 {
    player: (200, 50)
    height: 900
    width: 3000
    background: https://media.discordapp.net/attachments/1019466411044765716/1029542966185971822/bg.png
    Terrain: 
        terrainType1: [
            (terrain1, 1500, 300, 500), 
            (terrain2, 0,0, 500),
            (terrain3, 1000,0, 2000)
            ]
    Platform:
        platformType1: [
            (plat1, 1000,300,500),
            (plat2, 500,200,500),
            (plat3, 2000,300,500)
        ]
    Enemy: 
        Slime: [
            (slime1, 2500, 50)
        ]
        Goblin: [
            (Goblin1, 1500, 50) 
        ]
    Door: 
        doorType1: [
            (door1, level2, door2, 2000, 50)
        ]
    Button:
        buttonType1: [
            (button1, 100,100)
        ]
    Coin: 
        coinType1: [
            (c1, 1200,500),
            (c2, 700, 400)
        ]
    Checks: [
      IF: (MONEY > 1 OR buttonType1) {
            Door: Add (d1spawn, doorType1, 100, 90, level2, door2)
            Enemy: Add (gspawn1, Goblin, 10, 110)
        }
    ]
}
```
   