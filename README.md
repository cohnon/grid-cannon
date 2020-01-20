# Grid Cannon

## Objects

### Game
vars:
- int score : The current score
- Card[] cardsInStack : An array of available Card objects
- Card currentCard : The current card being placed

funcs:
- createNewStack : Randomly shuffles an array of cards
- placeRoyale : Place a royale adjacent to a similar card
- placeCard : Place a card onto a spot on the grid that is less than or equal in value
- fireCannon : Fire a shot(s) from a grid position and kill a royale if possible
- noMove : Add a card as armour to a royale

### Board
vars:
- Card[] gridTiles : An array representing the tiles on the board

funcs: 
- initBoard : Places cards in the grid removing any royale cards


### Card
vars:
- int value : The value of a vard
- int suite : 0 = Hearts, 1 = Diamonds, 2 = Clubs, 3 = Spades

funcs:
- takeDamage : Determines if royale dies based on the damage taken 

## Functions

