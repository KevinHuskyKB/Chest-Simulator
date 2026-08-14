// Variables & Constants

let coinsLabel = document.getElementById("coinsLabel")
let openChestButton = document.getElementById("openChest")
let inventory = document.getElementById("inventory")
let closeButton = document.getElementById("closeButton")

let inventoryDiv = document.getElementById("inventoryDiv")
let inventoryItems = document.getElementById("inventoryItems")

let itemLabel = document.getElementById("itemLabel")
let itemAmountLabel = document.getElementById("itemAmount")

let fullInventory = document.getElementById("fullInventory")
let soldItem = document.getElementById("soldItem")

let coinsAmmount = Number(sessionStorage.getItem("coins")) || 1000;
let stuffInventory = JSON.parse(sessionStorage.getItem("inventory")) || [];

let itemAmount = stuffInventory.length;
itemAmountLabel.textContent = `Items: ${itemAmount}/12`;
coinsLabel.textContent = `Coins: ${coinsAmmount}`

let canOpenChest = true;
let soldItemTimeout; 

if (stuffInventory.length === 12) {
    fullInventory.textContent = "Your Inventory is full!";
    itemAmountLabel.style.color = "rgb(255, 0, 0)";
}

// Rarietes
const common = {
    name: "Common",
    chance: 45
}

const uncommon = {
    name: "Uncommon",
    chance: 30
}

const rare = {
    name: "Rare",
    chance: 15
}

const epic = {
    name: "Epic",
    chance: 8
}

const legendary = {
    name: "Legendary",
    chance: 2
}

// Items

const woodenSword = {
    name: "Wooden Sword",
    rarity: common,
    value: 40
}

const oldHelmet = {
    name: "Old Helmet",
    rarity: common,
    value: 20
}

const smallPotion = {
    name: "Small Potion",
    rarity: common,
    value: 30
}

const ironSword = {
    name: "IronSword",
    rarity: uncommon,
    value: 70
}

const knightHelment = {
    name: "Knight Helment",
    rarity: uncommon,
    value: 60
}

const largePotion = {
    name: "Large Potion",
    rarity: uncommon,
    value: 50
}

const crystalSword = {
    name: "Crystal Sword",
    rarity: rare,
    value: 140
}

const magicShield = {
    name: "Magic Shield",
    rarity: rare,
    value: 110
}

const goldenHelmet = {
    name: "Golden Helmet",
    rarity: rare,
    value: 90
}

const shadowSword = {
    name: "Shadow Sword",
    rarity: epic,
    value: 300
}

const dragonArmor = {
    name: "Dragon Armor",
    rarity: epic,
    value: 220
}

const excalibur = {
    name: "Excalibur",
    rarity: legendary,
    value: 1000
}

const dragonCrown = {
    name: "Dragon Crown",
    rarity: legendary,
    value: 750
}

const allItems = [
    woodenSword,
    oldHelmet,
    smallPotion,

    ironSword,
    knightHelment,
    largePotion,

    crystalSword,
    magicShield,
    goldenHelmet,

    shadowSword,
    dragonArmor,

    excalibur,
    dragonCrown
]

let rolledRarity;
openChestButton.onclick = function() {
    if (canOpenChest && coinsAmmount >= 100 && stuffInventory.length < 12) {
        coinsAmmount -= 100
        coinsLabel.textContent = `Coins: ${coinsAmmount}`

        canOpenChest = false;

        let randomNumber = Math.floor(Math.random() * 100) + 1
        console.log(randomNumber)  

        if (randomNumber <= 45) {
            console.log("Common")
            rolledRarity = common
        }
        else if (randomNumber <= 75) {
            console.log("Uncommon")
            rolledRarity = uncommon
        }
        else if (randomNumber <= 90) {
            console.log("Rare")
            rolledRarity = rare
        }
        else if (randomNumber <= 98) {
            console.log("Epic")
            rolledRarity = epic
        }
        else {
            console.log("LEGENDARY!")
            rolledRarity = legendary      
        }

        const possibleItems = allItems.filter(function(item) {
            return item.rarity === rolledRarity
        });
        let randomIndex = Math.floor(Math.random() * possibleItems.length)
        let item = possibleItems[randomIndex]

        console.log(item.name)
        itemLabel.style.display = "block";
        itemLabel.textContent = `You recieved: ${item.name}, ${item.rarity.name}, $${item.value}`

        stuffInventory.push(item)
        console.log(stuffInventory)

        sessionStorage.setItem("coins", coinsAmmount)
        sessionStorage.setItem("inventory", JSON.stringify(stuffInventory))

        itemAmount++
        itemAmountLabel.textContent = `Items: ${itemAmount}/12`

        if (stuffInventory.length === 12) {
            fullInventory.textContent = "Your Inventory is full!"
            itemAmountLabel.style.color = "rgb(255, 0, 0)"
        }


        setTimeout(() => {
            itemLabel.style.display = "none";
             canOpenChest = true;
        }, 1000);
    }

    else if (!canOpenChest) {
        console.log("Wait")
    }

    else {
        console.log("You don't have enough money!")
    }
}

inventory.onclick = function() {
    inventoryItems.innerHTML = "";

    stuffInventory.forEach(function(item) {
        let itemBox = document.createElement("div")

        let nameLabel = document.createElement("div")
        let rarityLabel = document.createElement("div")
        let valueLabel = document.createElement("div")

        itemBox.classList.add("itemBox")
        
        nameLabel.textContent = item.name
        rarityLabel.textContent = item.rarity.name
        valueLabel.textContent = `$${item.value}`

        let sellButton = document.createElement("button")
        sellButton.classList.add("sellButton")
        sellButton.textContent = "Sell"

        sellButton.onclick = function() {
            const index = stuffInventory.indexOf(item)

            if (index > -1) {
                stuffInventory.splice(index, 1)
            }

            if (stuffInventory.length <= 11) {
                fullInventory.textContent = ""
                itemAmountLabel.style.color = "rgb(255, 255, 255)"
                itemAmountLabel.style.textShadow = "black 2px 2px 2px"
            }

            coinsAmmount += item.value
            coinsLabel.textContent = `Coins: ${coinsAmmount}`
            console.log("Item Sold!")

            sessionStorage.setItem("coins", coinsAmmount)
            sessionStorage.setItem("inventory", JSON.stringify(stuffInventory))

            itemBox.style.display = "none"

            clearTimeout(soldItemTimeout)

            soldItem.textContent = `Sold ${item.name} for $${item.value}`

            soldItemTimeout = setTimeout(() => {
               soldItem.textContent = "" 
            }, 800);

            itemAmount--
            itemAmountLabel.textContent = `Items: ${itemAmount}/12`
        }

        if (item.rarity.name === "Common") {
            itemBox.style.backgroundColor = "rgb(128, 128, 128)"
        }
        else if (item.rarity.name === "Uncommon") {
            itemBox.style.backgroundColor = "rgb(50, 180, 70)"
        }
        else if (item.rarity.name === "Rare") {
            itemBox.style.backgroundColor = "rgb(50, 120, 230)"
        }
        else if (item.rarity.name === "Epic") {
            itemBox.style.backgroundColor = "rgb(160, 70, 220)"
        }
        else if (item.rarity.name === "Legendary") {
            itemBox.style.backgroundColor = "rgb(240, 190, 40)";
        }
            inventoryItems.appendChild(itemBox)

            itemBox.appendChild(nameLabel);
            itemBox.appendChild(rarityLabel);
            itemBox.appendChild(valueLabel);

            itemBox.appendChild(sellButton)
        })

    inventoryDiv.style.display = "block"
}

closeButton.onclick = function() {
    inventoryDiv.style.display = "none"
}

console.log(stuffInventory)