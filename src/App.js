import React, { useState, useRef } from 'react';

// Define player colors
const playerColors = {
  1: 'red',
  2: 'blue',
  3: 'green',
  4: 'orange'
};

// Tweaked position coordinates (0 to 39)
const positionCoordinates = [
  { top: '90%', left: '91%' }, // 0 (GO)
  { top: '90%', left: '81%' },
  { top: '90%', left: '75%' },
  { top: '90%', left: '66%' },
  { top: '90%', left: '59%' },
  { top: '90%', left: '50%' },
  { top: '90%', left: '42%' },
  { top: '90%', left: '34%' },
  { top: '90%', left: '25%' },
  { top: '90%', left: '17%' },
  { top: '90%', left: '5%' },  // 10: Jail
  { top: '83%', left: '5%' },
  { top: '74%', left: '5%' },
  { top: '63%', left: '5%' },
  { top: '59%', left: '5%' },
  { top: '49%', left: '5%' },
  { top: '42%', left: '5%' },
  { top: '33%', left: '5%' },
  { top: '25%', left: '5%' },
  { top: '18%', left: '5%' },
  { top: '5%', left: '5%' },
  { top: '5%', left: '17%' },
  { top: '5%', left: '26%' },
  { top: '5%', left: '27%' },
  { top: '5%', left: '42%' },
  { top: '5%', left: '50%' },
  { top: '5%', left: '58%' },
  { top: '5%', left: '63%' },
  { top: '5%', left: '75%' },
  { top: '5%', left: '83%' },
  { top: '5%', left: '90%' },
  { top: '17%', left: '90%' },
  { top: '24%', left: '90%' },
  { top: '32%', left: '90%' },
  { top: '36%', left: '90%' },
  { top: '45%', left: '90%' },
  { top: '54%', left: '90%' },
  { top: '63%', left: '90%' },
  { top: '72%', left: '90%' },
  { top: '81%', left: '90%' }
];

// Board data remains unchanged
const boardData = [
  { id: 0, name: "GO", type: "corner", position: 0 },
  { id: 1, name: "Random Yemek", type: "property", position: 1, price: 60, rents: [2,10,30,90,160,250], houseCost: 50, mortgageValue: 30, color: "brown", houses: 0, owner: null },
  { id: 2, name: "Community Chest", type: "chest", position: 2 },
  { id: 3, name: "Vinica Food Cafe", type: "property", position: 3, price: 60, rents: [4,20,60,180,320,450], houseCost: 50, mortgageValue: 30, color: "brown", houses: 0, owner: null },
  { id: 4, name: "Gelir Vergisi", type: "tax", position: 4, tax: 200 },
  { id: 5, name: "Minibüs", type: "transport", position: 5, price: 200, rent: 25, mortgageValue: 100, owner: null },
  { id: 6, name: "Beysos Döner", type: "property", position: 6, price: 100, rents: [6,30,90,270,400,550], houseCost: 50, mortgageValue: 50, color: "lightblue", houses: 0, owner: null },
  { id: 7, name: "Chance", type: "chance", position: 7 },
  { id: 8, name: "Hot Döner", type: "property", position: 8, price: 100, rents: [6,30,90,270,400,550], houseCost: 50, mortgageValue: 50, color: "lightblue", houses: 0, owner: null },
  { id: 9, name: "Elit Döner", type: "property", position: 9, price: 120, rents: [8,40,100,300,450,600], houseCost: 50, mortgageValue: 60, color: "lightblue", houses: 0, owner: null },
  { id: 10, name: "Jail", type: "corner", position: 10 },
  { id: 11, name: "Adıyaman Çiğköfte", type: "property", position: 11, price: 140, rents: [10,50,150,450,625,750], houseCost: 100, mortgageValue: 70, color: "pink", houses: 0, owner: null },
  { id: 12, name: "Armagaz", type: "utility", position: 12, price: 150, rent: 75, mortgageValue: 75, owner: null },
  { id: 13, name: "Ziyafet Çiğköfte", type: "property", position: 13, price: 140, rents: [10,50,150,450,625,750], houseCost: 100, mortgageValue: 70, color: "pink", houses: 0, owner: null },
  { id: 14, name: "Çiğköftem", type: "property", position: 14, price: 160, rents: [12,60,180,500,700,900], houseCost: 100, mortgageValue: 80, color: "pink", houses: 0, owner: null },
  { id: 15, name: "Minibüs", type: "transport", position: 15, price: 200, rent: 25, mortgageValue: 100, owner: null },
  { id: 16, name: "Kral Döner", type: "property", position: 16, price: 180, rents: [14,70,200,550,700,900], houseCost: 100, mortgageValue: 90, color: "orange", houses: 0, owner: null },
  { id: 17, name: "Community Chest", type: "chest", position: 17 },
  { id: 18, name: "Batu Döner", type: "property", position: 18, price: 180, rents: [14,70,200,550,700,950], houseCost: 100, mortgageValue: 90, color: "orange", houses: 0, owner: null },
  { id: 19, name: "Zerek Zurna Dürüm", type: "property", position: 19, price: 200, rents: [16,80,220,600,800,1000], houseCost: 100, mortgageValue: 100, color: "orange", houses: 0, owner: null },
  { id: 20, name: "Free Parking", type: "corner", position: 20 },
  { id: 21, name: "Beyoğlu Tantuni", type: "property", position: 21, price: 220, rents: [18,90,250,700,875,1050], houseCost: 150, mortgageValue: 110, color: "red", houses: 0, owner: null },
  { id: 22, name: "Chance", type: "chance", position: 22 },
  { id: 23, name: "Meydan Tantuni", type: "property", position: 23, price: 220, rents: [18,90,250,700,875,1050], houseCost: 150, mortgageValue: 110, color: "red", houses: 0, owner: null },
  { id: 24, name: "33 Mersin Tantuni", type: "property", position: 24, price: 240, rents: [20,100,300,750,925,1100], houseCost: 150, mortgageValue: 120, color: "red", houses: 0, owner: null },
  { id: 25, name: "Minibüs", type: "transport", position: 25, price: 200, rent: 25, mortgageValue: 100, owner: null },
  { id: 26, name: "Köfteci Yusuf", type: "property", position: 26, price: 260, rents: [22,110,330,800,975,1150], houseCost: 150, mortgageValue: 130, color: "yellow", houses: 0, owner: null },
  { id: 27, name: "Kaan's Burger", type: "property", position: 27, price: 260, rents: [22,110,330,800,975,1150], houseCost: 150, mortgageValue: 130, color: "yellow", houses: 0, owner: null },
  { id: 28, name: "Buski", type: "utility", position: 28, price: 150, rent: 75, mortgageValue: 75, owner: null },
  { id: 29, name: "Sezgin", type: "property", position: 29, price: 280, rents: [24,120,360,850,1025,1200], houseCost: 150, mortgageValue: 140, color: "yellow", houses: 0, owner: null },
  { id: 30, name: "Go To Toki", type: "gotojail", position: 30 },
  { id: 31, name: "Güler Kebap", type: "property", position: 31, price: 300, rents: [26,130,390,900,1100,1275], houseCost: 200, mortgageValue: 150, color: "green", houses: 0, owner: null },
  { id: 32, name: "Latife", type: "property", position: 32, price: 300, rents: [26,130,390,900,1100,1275], houseCost: 200, mortgageValue: 150, color: "green", houses: 0, owner: null },
  { id: 33, name: "Community Chest", type: "chest", position: 33 },
  { id: 34, name: "Kral Kokoreç", type: "property", position: 34, price: 320, rents: [28,150,450,1000,1200,1400], houseCost: 200, mortgageValue: 160, color: "green", houses: 0, owner: null },
  { id: 35, name: "Minibüs", type: "transport", position: 35, price: 200, rent: 25, mortgageValue: 100, owner: null },
  { id: 36, name: "Chance", type: "chance", position: 36 },
  { id: 37, name: "HT Çiğköfte", type: "property", position: 37, price: 350, rents: [35,175,500,1100,1300,1500], houseCost: 200, mortgageValue: 175, color: "blue", houses: 0, owner: null },
  { id: 38, name: "ÖTV", type: "tax", position: 38, tax: 100 },
  { id: 39, name: "Class Döner", type: "property", position: 39, price: 400, rents: [50,200,600,1400,1700,2000], houseCost: 200, mortgageValue: 200, color: "blue", houses: 0, owner: null }
];

// New Chance cards array
const chanceCards = [
  { id: 1, text: "Advance to Class.", action: "move", destination: 39 },
  { id: 2, text: "Advance to Go (Collect $200).", action: "move", destination: 0 },
  { id: 3, text: "Advance to 33 Mersin Tantuni. If you pass Go, collect $200.", action: "move", destination: 24 },
  { id: 4, text: "Advance to Adıyaman çiğköfte. If you pass Go, collect $200.", action: "move", destination: 11 },
  { id: 5, text: "Advance to the nearest minibüs. If unowned, you may buy it from the Bank. If owned, pay owner twice the rental.", action: "moveToNearestTransport" },
  { id: 7, text: "Advance token to nearest Utility. If unowned, you may buy it from the Bank.", action: "moveToNearestUtility" },
  { id: 8, text: "Bank pays you dividend of $50.", action: "collect", amount: 50 },
  { id: 9, text: "Get Out of Jail Free.", action: "getOutOfJail" },
  { id: 10, text: "Go Back 3 Spaces.", action: "moveBack", spaces: 3 },
  { id: 11, text: "Go to Jail. Go directly to Jail, do not pass Go, do not collect $200.", action: "jail" },
  { id: 12, text: "Make general repairs on all your property. For each house pay $25. For each hotel pay $100.", action: "repairs", houseCost: 25, hotelCost: 100 },
  { id: 13, text: "Speeding fine $15.", action: "pay", amount: 15 },
  { id: 15, text: "You have been elected Chairman of the Board. Pay each player $50.", action: "payEach", amount: 50 },
  { id: 16, text: "Your building loan matures. Collect $150.", action: "collect", amount: 150 }
];

// New Community Chest cards array
const communityChestCards = [
  { id: 1, text: "Advance to Go (Collect $200).", action: "move", destination: 0 },
  { id: 2, text: "Bank error in your favor. Collect $200.", action: "collect", amount: 200 },
  { id: 3, text: "Doctor’s fee. Pay $50.", action: "pay", amount: 50 },
  { id: 4, text: "From sale of stock you get $50.", action: "collect", amount: 50 },
  { id: 5, text: "Get Out of Jail Free.", action: "getOutOfJail" },
  { id: 6, text: "Go to Jail. Go directly to jail, do not pass Go, do not collect $200.", action: "jail" },
  { id: 7, text: "Holiday fund matures. Receive $100.", action: "collect", amount: 100 },
  { id: 8, text: "Income tax refund. Collect $20.", action: "collect", amount: 20 },
  { id: 9, text: "Your friends killed your cows Collect $20 from every player.", action: "birthday", amount: 20 },
  { id: 10, text: "Life insurance matures. Collect $100.", action: "collect", amount: 100 },
  { id: 11, text: "Pay hospital fees of $100.", action: "pay", amount: 100 },
  { id: 12, text: "Pay school fees of $50.", action: "pay", amount: 50 },
  { id: 13, text: "Receive $25 consultancy fee.", action: "collect", amount: 25 },
  { id: 14, text: "You are assessed for street repair. Pay $40 per house. $115 per hotel you own.", action: "repairsDetailed", houseCost: 40, hotelCost: 115 },
  { id: 15, text: "You have won second prize in a beauty contest. Collect $10.", action: "collect", amount: 10 },
  { id: 16, text: "You inherit $100.", action: "collect", amount: 100 },
  { id: 17, text: "You have banged Atakan's mother take 300.", action: "collect", amount: 300 }
];

// Helper: Render house/hotel icons
const renderHouseIcons = (houses) => {
  if (houses === 0) return null;
  if (houses < 5) {
    return Array.from({ length: houses }, (_, i) => <span key={i}>🏠</span>);
  }
  return <span>🏨</span>;
};

// Render player icon for board overlay
const renderPlayerIcon = (player) => (
  <div
    style={{
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: playerColors[player.id],
      color: 'white',
      textAlign: 'center',
      lineHeight: '24px',
      fontSize: '14px',
      border: '1px solid black'
    }}
  >
    {player.name[0]}
  </div>
);

const Orhangazipoly = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', position: 0, money: 1500, properties: [], jailStatus: { inJail: false, turns: 0 }, getOutOfJailCards: 0 },
    { id: 2, name: 'Player 2', position: 0, money: 1500, properties: [], jailStatus: { inJail: false, turns: 0 }, getOutOfJailCards: 0 },
    { id: 3, name: 'Player 3', position: 0, money: 1500, properties: [], jailStatus: { inJail: false, turns: 0 }, getOutOfJailCards: 0 },
    { id: 4, name: 'Player 4', position: 0, money: 1500, properties: [], jailStatus: { inJail: false, turns: 0 }, getOutOfJailCards: 0 }
  ]);
  const [boardProperties, setBoardProperties] = useState(boardData);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const currentPlayer = players[currentPlayerIndex];
  const [dice, setDice] = useState([1, 1]);
  const [sameRollCount, setSameRollCount] = useState(0);
  const rolledDoublesRef = useRef(false);
  const [gamePhase, setGamePhase] = useState('roll');
  const [gameMessage, setGameMessage] = useState('Welcome to Orhangazipoly! Roll the dice to start.');
  const [showAuctionModal, setShowAuctionModal] = useState(false);
  const [auctionProp, setAuctionProp] = useState(null);
  const [auctionBids, setAuctionBids] = useState({});
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeDetails, setTradeDetails] = useState({
    playerOffering: null,
    moneyOffered: 0,
    moneyRequested: 0,
    propertiesOffered: [],
    propertiesRequested: []
  });
  const [showBuildModal, setShowBuildModal] = useState(false);
  const [buildSelections, setBuildSelections] = useState({ propertyId: null, houses: 1 });
  const [showMortgageModal, setShowMortgageModal] = useState(false);

  const chanceCardsArray = chanceCards;
  const communityChestCardsArray = communityChestCards;

  // Save/Load game state functions
  const exportGame = () => {
    const saveData = {
      players,
      boardProperties,
      currentPlayerIndex,
      dice,
      sameRollCount,
      gamePhase,
      gameMessage
    };
    const json = JSON.stringify(saveData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'orhangazipoly_save.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importGame = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const saveData = JSON.parse(e.target.result);
        setPlayers(saveData.players);
        setBoardProperties(saveData.boardProperties);
        setCurrentPlayerIndex(saveData.currentPlayerIndex);
        setDice(saveData.dice);
        setSameRollCount(saveData.sameRollCount);
        setGamePhase(saveData.gamePhase);
        setGameMessage(saveData.gameMessage);
      } catch (error) {
        alert("Error loading save file.");
      }
    };
    reader.readAsText(file);
  };

  const finishAction = () => {
    if (!currentPlayer.jailStatus.inJail && rolledDoublesRef.current) {
      setGameMessage(prev => prev + " You've rolled doubles so roll again!");
      setGamePhase('roll');
      rolledDoublesRef.current = false;
    } else {
      setGamePhase('done');
    }
  };

  const ownsAllInGroup = (playerId, propertyId) => {
    const property = boardProperties.find(p => p.id === propertyId);
    if (!property || !property.color) return false;
    const colorGroups = {
      brown: [1, 3],
      lightblue: [6, 8, 9],
      pink: [11, 13, 14],
      orange: [16, 19],
      red: [18, 21, 23, 24],
      yellow: [26, 27, 29],
      green: [31, 32, 34],
      blue: [37, 39]
    };
    const group = colorGroups[property.color];
    if (!group) return false;
    return group.every(id => {
      const gp = boardProperties.find(p => p.id === id);
      return gp && gp.owner === playerId;
    });
  };

  const useGetOutOfJailCard = () => {
    if (currentPlayer.getOutOfJailCards > 0) {
      const newPlayers = [...players];
      newPlayers[currentPlayerIndex].getOutOfJailCards -= 1;
      newPlayers[currentPlayerIndex].jailStatus.inJail = false;
      newPlayers[currentPlayerIndex].jailStatus.turns = 0;
      setPlayers(newPlayers);
      setGameMessage(`Effect: ${currentPlayer.name} used a Get Out of Jail Free card.`);
      finishAction();
    }
  };

  const handleCardAction = (card) => {
    let newPlayers = [...players];
    switch (card.action) {
      case "move": {
        let newPos = card.destination;
        if (newPos < currentPlayer.position) {
          newPlayers[currentPlayerIndex].money += 200;
        }
        newPlayers[currentPlayerIndex].position = newPos;
        setPlayers(newPlayers);
        const landedOn = boardProperties.find(p => p.position === newPos);
        handleLanding(landedOn, false);
        break;
      }
      case "moveBack": {
        let newBackPos = (currentPlayer.position - card.spaces + 40) % 40;
        newPlayers[currentPlayerIndex].position = newBackPos;
        setPlayers(newPlayers);
        const landedOnBack = boardProperties.find(p => p.position === newBackPos);
        handleLanding(landedOnBack, false);
        break;
      }
      case "jail":
        sendToJail();
        setGameMessage(`Card Effect: "${card.text}" You are sent to Jail.`);
        setGamePhase('done');
        break;
      case "getOutOfJail":
        newPlayers[currentPlayerIndex].getOutOfJailCards += 1;
        setPlayers(newPlayers);
        setGameMessage(`Card Effect: "${card.text}" You received a Get Out of Jail Free card.`);
        finishAction();
        break;
      case "pay":
        newPlayers[currentPlayerIndex].money -= card.amount;
        setPlayers(newPlayers);
        setGameMessage(`Card Effect: "${card.text}" You paid $${card.amount}.`);
        finishAction();
        break;
      case "collect":
        newPlayers[currentPlayerIndex].money += card.amount;
        setPlayers(newPlayers);
        setGameMessage(`Card Effect: "${card.text}" You collected $${card.amount}.`);
        finishAction();
        break;
      case "moveToNearestTransport": {
        let pos = currentPlayer.position;
        let target = null;
        for (let i = pos + 1; i < 40; i++) {
          const sq = boardProperties.find(p => p.position === i && p.type === "transport");
          if (sq) { target = sq; break; }
        }
        if (!target) {
          for (let i = 0; i <= pos; i++) {
            const sq = boardProperties.find(p => p.position === i && p.type === "transport");
            if (sq) { target = sq; break; }
          }
        }
        if (target) {
          newPlayers[currentPlayerIndex].position = target.position;
          setPlayers(newPlayers);
          if (target.owner === null) {
            setGameMessage(`Card Effect: "${card.text}" You move to ${target.name}.`);
            setGamePhase('buy');
          } else if (target.owner !== currentPlayer.id) {
            const transportsOwned = boardProperties.filter(p => p.type === "transport" && p.owner === target.owner).length;
            let baseRent = 25;
            if (transportsOwned === 2) baseRent = 50;
            else if (transportsOwned === 3) baseRent = 100;
            else if (transportsOwned >= 4) baseRent = 200;
            const doubleRent = baseRent * 2;
            newPlayers[currentPlayerIndex].money -= doubleRent;
            const ownerIndex = newPlayers.findIndex(p => p.id === target.owner);
            newPlayers[ownerIndex].money += doubleRent;
            setPlayers(newPlayers);
            setGameMessage(`Card Effect: "${card.text}" You move to ${target.name} and pay double rent of $${doubleRent}.`);
            finishAction();
          } else {
            setGameMessage(`Card Effect: "${card.text}" You move to your own ${target.name}.`);
            finishAction();
          }
        }
        break;
      }
      case "moveToNearestUtility": {
        let pos = currentPlayer.position;
        let target = null;
        for (let i = pos + 1; i < 40; i++) {
          const sq = boardProperties.find(p => p.position === i && p.type === "utility");
          if (sq) { target = sq; break; }
        }
        if (!target) {
          for (let i = 0; i <= pos; i++) {
            const sq = boardProperties.find(p => p.position === i && p.type === "utility");
            if (sq) { target = sq; break; }
          }
        }
        if (target) {
          newPlayers[currentPlayerIndex].position = target.position;
          setPlayers(newPlayers);
          if (target.owner === null) {
            setGameMessage(`Card Effect: "${card.text}" You move to ${target.name}.`);
            setGamePhase('buy');
          } else if (target.owner !== currentPlayer.id) {
            const diceSum = dice[0] + dice[1];
            const utilitiesOwned = boardProperties.filter(p => p.type === "utility" && p.owner === target.owner).length;
            const rent = diceSum * (utilitiesOwned === 1 ? 4 : 10);
            newPlayers[currentPlayerIndex].money -= rent;
            const ownerIndex = newPlayers.findIndex(p => p.id === target.owner);
            newPlayers[ownerIndex].money += rent;
            setPlayers(newPlayers);
            setGameMessage(`Card Effect: "${card.text}" You move to ${target.name} and pay rent of $${rent}.`);
            finishAction();
          } else {
            setGameMessage(`Card Effect: "${card.text}" You move to your own ${target.name}.`);
            finishAction();
          }
        }
        break;
      }
      case "repairs": {
        let totalHouses = 0;
        let totalHotels = 0;
        currentPlayer.properties.forEach(propId => {
          const prop = boardProperties.find(p => p.id === propId);
          if (prop) {
            if (prop.houses < 5) totalHouses += prop.houses;
            else if (prop.houses === 5) totalHotels += 1;
          }
        });
        const cost = totalHouses * card.houseCost + totalHotels * card.hotelCost;
        newPlayers[currentPlayerIndex].money -= cost;
        setPlayers(newPlayers);
        setGameMessage(`Card Effect: "${card.text}" You pay $${cost} in repairs.`);
        finishAction();
        break;
      }
      case "repairsDetailed": {
        let totalHouses = 0;
        let totalHotels = 0;
        currentPlayer.properties.forEach(propId => {
          const prop = boardProperties.find(p => p.id === propId);
          if (prop) {
            if (prop.houses < 5) totalHouses += prop.houses;
            else if (prop.houses === 5) totalHotels += 1;
          }
        });
        const cost = totalHouses * card.houseCost + totalHotels * card.hotelCost;
        newPlayers[currentPlayerIndex].money -= cost;
        setPlayers(newPlayers);
        setGameMessage(`Card Effect: "${card.text}" You pay $${cost} in repairs.`);
        finishAction();
        break;
      }
      case "payEach": {
        const amount = card.amount;
        const numOtherPlayers = players.length - 1;
        const totalCost = amount * numOtherPlayers;
        newPlayers[currentPlayerIndex].money -= totalCost;
        newPlayers = newPlayers.map(p => {
          if (p.id !== currentPlayer.id) return { ...p, money: p.money + amount };
          return p;
        });
        setPlayers(newPlayers);
        setGameMessage(`Card Effect: "${card.text}" You pay $${amount} to each player, totaling $${totalCost}.`);
        finishAction();
        break;
      }
      case "birthday": {
        const amount = card.amount;
        const numOtherPlayers = players.length - 1;
        const totalCollected = amount * numOtherPlayers;
        newPlayers[currentPlayerIndex].money += totalCollected;
        newPlayers = newPlayers.map(p => {
          if (p.id !== currentPlayer.id) return { ...p, money: p.money - amount };
          return p;
        });
        setPlayers(newPlayers);
        setGameMessage(`Card Effect: "${card.text}" You collect $${amount} from each player, totaling $${totalCollected}.`);
        finishAction();
        break;
      }
      default:
        finishAction();
    }
  };

  const drawChanceCardWrapper = () => {
    const idx = Math.floor(Math.random() * chanceCardsArray.length);
    const card = chanceCardsArray[idx];
    setGameMessage(`Chance Card: "${card.text}"`);
    handleCardAction(card);
  };

  const drawCommunityChestCardWrapper = () => {
    const idx = Math.floor(Math.random() * communityChestCardsArray.length);
    const card = communityChestCardsArray[idx];
    setGameMessage(`Community Chest: "${card.text}"`);
    handleCardAction(card);
  };
 // New: Declare Bankruptcy button function
 const declareBankruptcy = () => {
  const bankruptPlayer = currentPlayer;
  // Reset ownership of properties owned by this player
  const updatedBoard = boardProperties.map(prop => {
    if (prop.owner === bankruptPlayer.id) {
      return { ...prop, owner: null, houses: 0, mortgaged: false };
    }
    return prop;
  });
  setBoardProperties(updatedBoard);
  // Remove the player from the players list
  const remainingPlayers = players.filter(p => p.id !== bankruptPlayer.id);
  if (remainingPlayers.length === 0) {
    setGameMessage("All players have gone bankrupt. Game Over!");
    setPlayers([]);
  } else {
    // Update currentPlayerIndex appropriately
    let newIndex = currentPlayerIndex;
    if (newIndex >= remainingPlayers.length) {
      newIndex = 0;
    }
    setPlayers(remainingPlayers);
    setCurrentPlayerIndex(newIndex);
    setGameMessage(`${bankruptPlayer.name} has declared bankruptcy and is removed from the game.`);
  }
  setGamePhase('done');
};

  // Next player turn (manual via End Turn button)
  const nextPlayer = () => {
    setSameRollCount(0);
    rolledDoublesRef.current = false;
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextIndex);
    setGamePhase('roll');
    setGameMessage(`${players[nextIndex].name}'s turn. Roll the dice!`);
  };

  // Roll dice
  const rollDice = () => {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    setDice([die1, die2]);
    const isDoubles = die1 === die2;
    rolledDoublesRef.current = isDoubles;
    if (currentPlayer.jailStatus.inJail) {
      handleJailRoll(die1, die2);
    } else {
      if (isDoubles) {
        const newCount = sameRollCount + 1;
        setSameRollCount(newCount);
        if (newCount === 3) {
          setGameMessage(`${currentPlayer.name} rolled doubles three times. You are sent to Jail!`);
          sendToJail();
          setSameRollCount(0);
          setGamePhase('done');
          return;
        }
      } else {
        setSameRollCount(0);
      }
      movePlayer(die1 + die2, isDoubles);
    }
  };

  // Handle dice roll if in jail
  const handleJailRoll = (d1, d2) => {
    const newPlayers = [...players];
    if (d1 === d2) {
      newPlayers[currentPlayerIndex].jailStatus.inJail = false;
      newPlayers[currentPlayerIndex].jailStatus.turns = 0;
      setPlayers(newPlayers);
      setGameMessage(`${currentPlayer.name} rolled doubles and got out of jail!`);
      movePlayer(d1 + d2, false);
    } else {
      newPlayers[currentPlayerIndex].jailStatus.turns += 1;
      setPlayers(newPlayers);
      if (newPlayers[currentPlayerIndex].jailStatus.turns >= 3) {
        setGameMessage(`${currentPlayer.name} has failed to roll doubles 3 times. You may pay $50 to get out.`);
      } else {
        setGameMessage(`${currentPlayer.name} failed to roll doubles. You remain in jail.`);
      }
    }
  };

  // Pay $50 to get out of jail
  const pay50ToGetOutOfJail = () => {
    const newPlayers = [...players];
    newPlayers[currentPlayerIndex].money -= 50;
    newPlayers[currentPlayerIndex].jailStatus.inJail = false;
    newPlayers[currentPlayerIndex].jailStatus.turns = 0;
    setPlayers(newPlayers);
    setGameMessage(`Effect: ${currentPlayer.name} paid $50 and got out of jail.`);
    finishAction();
  };

  // Send player to Jail (position 10)
  const sendToJail = () => {
    const newPlayers = [...players];
    newPlayers[currentPlayerIndex].position = 10;
    newPlayers[currentPlayerIndex].jailStatus.inJail = true;
    newPlayers[currentPlayerIndex].jailStatus.turns = 0;
    setPlayers(newPlayers);
  };

  // Move player by spaces
  const movePlayer = (spaces, isDoubles) => {
    let newPlayers = [...players];
    let newPosition = (currentPlayer.position + spaces) % 40;
    if (newPosition < currentPlayer.position) {
      newPlayers[currentPlayerIndex].money += 200;
      setGameMessage(`Effect: ${currentPlayer.name} passed Go and collected $200!`);
    }
    newPlayers[currentPlayerIndex].position = newPosition;
    setPlayers(newPlayers);
    const landedOn = boardProperties.find(p => p.position === newPosition);
    handleLanding(landedOn, isDoubles);
  };

  // Handle landing on a square
  const handleLanding = (property, isDoubles) => {
    if (!property) return;
    if (property.type === "corner") {
      setGameMessage(`Effect: ${currentPlayer.name} landed on ${property.name} (No effect).`);
      finishAction();
      return;
    }
    if (property.type === "chance") {
      setGameMessage(`${currentPlayer.name} landed on Chance! Drawing a card...`);
      drawChanceCardWrapper();
      return;
    }
    if (property.type === "chest") {
      setGameMessage(`${currentPlayer.name} landed on Community Chest! Drawing a card...`);
      drawCommunityChestCardWrapper();
      return;
    }
    if (property.type === "tax") {
      setGameMessage(`Effect: ${currentPlayer.name} landed on ${property.name} and must pay $${property.tax}.`);
      payTax(property.tax);
      return;
    }
    if (property.type === "gotojail") {
      setGameMessage(`Effect: ${currentPlayer.name} landed on Go To Toki! You are sent to Jail.`);
      sendToJail();
      setGamePhase('done');
      return;
    }
    if (property.type === "utility" || property.type === "transport" || property.type === "property") {
      setGameMessage(`${currentPlayer.name} landed on ${property.name}.`);
      if (property.owner === null) {
        setGamePhase('buy');
      } else if (property.owner !== currentPlayer.id) {
        setGamePhase('askRent');
      } else {
        finishAction();
      }
    }
  };

  // Pay tax
  const payTax = (amount) => {
    const newPlayers = [...players];
    newPlayers[currentPlayerIndex].money -= amount;
    setPlayers(newPlayers);
    setGameMessage(`Effect: ${currentPlayer.name} paid $${amount} in taxes.`);
    finishAction();
  };

  // Buy property
  const buyProperty = () => {
    const property = boardProperties.find(p => p.position === currentPlayer.position);
    if (currentPlayer.money >= property.price) {
      const newPlayers = [...players];
      newPlayers[currentPlayerIndex].money -= property.price;
      newPlayers[currentPlayerIndex].properties.push(property.id);
      setPlayers(newPlayers);
      const updatedBoard = boardProperties.map(p =>
        p.id === property.id ? { ...p, owner: currentPlayer.id } : p
      );
      setBoardProperties(updatedBoard);
      let msg = `Effect: ${currentPlayer.name} bought ${property.name} for $${property.price}.`;
      if (rolledDoublesRef.current) {
        msg += " You've rolled doubles so roll again!";
        setGamePhase('roll');
      } else {
        setGamePhase('done');
      }
      setGameMessage(msg);
    } else {
      setGameMessage(`Effect: ${currentPlayer.name} doesn't have enough money to buy ${property.name}.`);
    }
  };

  // Decline buying => Auction
  const declineBuy = () => {
    const property = boardProperties.find(p => p.position === currentPlayer.position);
    setAuctionProp(property);
    setShowAuctionModal(true);
  };

  // Pay rent with special rules for utilities and transports
  const payRent = () => {
    const property = boardProperties.find(p => p.position === currentPlayer.position);
    const propertyOwner = players.find(p => p.id === property.owner);
    if (!propertyOwner) return;
    let rent = 0;
    if (property.type === "utility") {
      const diceSum = dice[0] + dice[1];
      const utilitiesOwned = boardProperties.filter(p => p.type === "utility" && p.owner === propertyOwner.id).length;
      rent = diceSum * (utilitiesOwned === 1 ? 4 : 10);
    } else if (property.type === "transport") {
      const transportsOwned = boardProperties.filter(p => p.type === "transport" && p.owner === propertyOwner.id).length;
      if (transportsOwned === 1) rent = 25;
      else if (transportsOwned === 2) rent = 50;
      else if (transportsOwned === 3) rent = 100;
      else if (transportsOwned >= 4) rent = 200;
    } else if (property.type === "property") {
      rent = property.rents[property.houses];
      if (property.houses === 0 && ownsAllInGroup(propertyOwner.id, property.id)) {
        rent *= 2;
      }
    }
    const newPlayers = [...players];
    newPlayers[currentPlayerIndex].money -= rent;
    const ownerIndex = newPlayers.findIndex(p => p.id === propertyOwner.id);
    newPlayers[ownerIndex].money += rent;
    setPlayers(newPlayers);
    let msg = `Effect: ${currentPlayer.name} paid $${rent} rent to ${propertyOwner.name}.`;
    if (rolledDoublesRef.current) {
      msg += " You've rolled doubles so roll again!";
      setGamePhase('roll');
    } else {
      setGamePhase('done');
    }
    setGameMessage(msg);
  };

  // Auction
  const conductAuction = () => {
    const highestBid = Math.max(...Object.values(auctionBids));
    const highestBidderId = parseInt(Object.keys(auctionBids).find(key => auctionBids[key] === highestBid));
    if (highestBid > 0 && highestBidderId) {
      const newPlayers = [...players];
      const buyerIndex = newPlayers.findIndex(p => p.id === highestBidderId);
      newPlayers[buyerIndex].money -= highestBid;
      newPlayers[buyerIndex].properties.push(auctionProp.id);
      setPlayers(newPlayers);
      const updatedBoard = boardProperties.map(p =>
        p.id === auctionProp.id ? { ...p, owner: highestBidderId } : p
      );
      setBoardProperties(updatedBoard);
      setGameMessage(`Effect: ${newPlayers[buyerIndex].name} won the auction for ${auctionProp.name} at $${highestBid}.`);
    } else {
      setGameMessage('Effect: No bids were placed. The property remains unowned.');
    }
    setShowAuctionModal(false);
    setAuctionProp(null);
    setAuctionBids({});
    setGamePhase('done');
  };

  // Build Houses Menu
  const openBuildMenu = () => {
    setShowBuildModal(true);
    setBuildSelections({ propertyId: null, houses: 1 });
  };

  const confirmBuildHouses = () => {
    const { propertyId, houses } = buildSelections;
    if (!propertyId || houses < 1) return;
    const property = boardProperties.find(p => p.id === propertyId);
    if (!property) return;
    if (property.owner !== currentPlayer.id) {
      setGameMessage("Effect: You don't own that property!");
      return;
    }
    if (property.mortgaged) {
      setGameMessage("Effect: Cannot build on a mortgaged property!");
      return;
    }
    const newHouseCount = property.houses + houses;
    if (newHouseCount > 5) {
      setGameMessage("Effect: Cannot exceed a hotel (5 houses)!");
      return;
    }
    const totalCost = property.houseCost * houses;
    if (currentPlayer.money < totalCost) {
      setGameMessage("Effect: Not enough money to build that many houses!");
      return;
    }
    const newPlayers = [...players];
    newPlayers[currentPlayerIndex].money -= totalCost;
    setPlayers(newPlayers);
    const updatedBoard = boardProperties.map(p => {
      if (p.id === propertyId) {
        return { ...p, houses: p.houses + houses };
      }
      return p;
    });
    setBoardProperties(updatedBoard);
    setGameMessage(`Effect: ${currentPlayer.name} built ${houses} house(s) on ${property.name}.`);
    setShowBuildModal(false);
    setGamePhase('done');
  };

  // Mortgage Menu
  const openMortgageMenu = () => {
    setShowMortgageModal(true);
  };

  const mortgageProperty = (propId) => {
    const property = boardProperties.find(p => p.id === propId);
    if (!property || property.owner !== currentPlayer.id || ((property.houses || 0) !== 0) || property.mortgaged) {
      return;
    }
    const newPlayers = [...players];
    newPlayers[currentPlayerIndex].money += property.mortgageValue;
    setPlayers(newPlayers);
    const updatedBoard = boardProperties.map(p =>
      p.id === propId ? { ...p, mortgaged: true } : p
    );
    setBoardProperties(updatedBoard);
    setGameMessage(`Effect: ${currentPlayer.name} mortgaged ${property.name} for $${property.mortgageValue}.`);
    setGamePhase('done');
  };

  const unmortgageProperty = (propId) => {
    const property = boardProperties.find(p => p.id === propId);
    if (!property || property.owner !== currentPlayer.id || !property.mortgaged) {
      return;
    }
    const cost = Math.ceil(property.mortgageValue * 1.1);
    if (currentPlayer.money < cost) {
      setGameMessage("Effect: Not enough money to unmortgage!");
      return;
    }
    const newPlayers = [...players];
    newPlayers[currentPlayerIndex].money -= cost;
    setPlayers(newPlayers);
    const updatedBoard = boardProperties.map(p =>
      p.id === propId ? { ...p, mortgaged: false } : p
    );
    setBoardProperties(updatedBoard);
    setGameMessage(`Effect: ${currentPlayer.name} unmortgaged ${property.name} for $${cost}.`);
    setGamePhase('done');
  };

  // Handle Trade
  const handleTrade = () => {
    if (!tradeDetails.playerOffering) {
      alert("Select a player to trade with.");
      return;
    }
    const offeringPlayer = currentPlayer;
    const receivingPlayer = players.find(p => p.id === tradeDetails.playerOffering);
    const confirmMsg = `${receivingPlayer.name}, do you accept this trade?
Money offered: $${tradeDetails.moneyOffered}, requested: $${tradeDetails.moneyRequested}.`;
    const accepted = window.confirm(confirmMsg);
    if (accepted) {
      let newPlayers = players.map(p => ({ ...p, properties: [...p.properties] }));
      const offP = newPlayers.find(p => p.id === offeringPlayer.id);
      const recP = newPlayers.find(p => p.id === receivingPlayer.id);
      offP.money -= tradeDetails.moneyOffered;
      recP.money += tradeDetails.moneyOffered;
      recP.money -= tradeDetails.moneyRequested;
      offP.money += tradeDetails.moneyRequested;
      tradeDetails.propertiesOffered.forEach(id => {
        const i = offP.properties.indexOf(id);
        if (i > -1) {
          offP.properties.splice(i, 1);
          if (!recP.properties.includes(id)) recP.properties.push(id);
        }
      });
      tradeDetails.propertiesRequested.forEach(id => {
        const i = recP.properties.indexOf(id);
        if (i > -1) {
          recP.properties.splice(i, 1);
          if (!offP.properties.includes(id)) offP.properties.push(id);
        }
      });
      const newBoard = boardProperties.map(prop => {
        if (tradeDetails.propertiesOffered.includes(prop.id)) {
          return { ...prop, owner: recP.id };
        }
        if (tradeDetails.propertiesRequested.includes(prop.id)) {
          return { ...prop, owner: offP.id };
        }
        return prop;
      });
      setPlayers(newPlayers);
      setBoardProperties(newBoard);
      setGameMessage("Effect: Trade completed.");
    } else {
      setGameMessage("Effect: Trade declined.");
    }
    setShowTradeModal(false);
    setTradeDetails({
      playerOffering: null,
      moneyOffered: 0,
      moneyRequested: 0,
      propertiesOffered: [],
      propertiesRequested: []
    });
    setGamePhase('done');
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '20px'
    }}>
      {/* Top Controls */}
      <div style={{ width: '100%', maxWidth: '800px', marginBottom: '20px', textAlign: 'center' }}>
        <h1>Orhangazipoly</h1>
        <p>{gameMessage}</p>
        <p>
          <strong>Dice:</strong> ({dice[0]}, {dice[1]})
        </p>
        <div>
          {currentPlayer.jailStatus.inJail && (
            <button onClick={pay50ToGetOutOfJail} style={{ marginRight: '10px' }}>
              Pay $50 to Get Out of Jail
            </button>
          )}
          {gamePhase === 'roll' && (
            <button onClick={rollDice} style={{ marginRight: '10px' }}>Roll Dice</button>
          )}
          {gamePhase === 'buy' && (
            <>
              <button onClick={buyProperty} style={{ marginRight: '10px' }}>Buy Property</button>
              <button onClick={declineBuy} style={{ marginRight: '10px' }}>Decline (Auction)</button>
            </>
          )}
          {gamePhase === 'askRent' && (
            <button onClick={payRent} style={{ marginRight: '10px' }}>Charge Rent</button>
          )}
          <button onClick={openBuildMenu} style={{ marginRight: '10px' }}>Build Houses/Hotel</button>
          <button onClick={openMortgageMenu} style={{ marginRight: '10px' }}>Mortgage/Unmortgage</button>
          <button onClick={() => setShowTradeModal(true)} style={{ marginRight: '10px' }}>Trade</button>
          <button onClick={useGetOutOfJailCard} style={{ marginRight: '10px' }}>Use Get Out of Jail Card</button>
          <button onClick={declareBankruptcy} style={{ marginRight: '10px', backgroundColor: 'crimson', color: 'white' }}>
            Declare Bankruptcy
          </button>
          <button onClick={nextPlayer}>End Turn</button>
        </div>
      </div>

      {/* Board */}
      <div
        style={{
          position: 'relative',
          width: '800px',
          height: '800px',
          backgroundImage: 'url("/orhangazipoly_final_final.png")',
          backgroundSize: 'cover',
          border: '1px solid black',
          marginBottom: '20px'
        }}
      >
        {players.map(player => {
          const coords = positionCoordinates[player.position] || { top: '50%', left: '50%' };
          return (
            <div
              key={player.id}
              style={{
                position: 'absolute',
                top: coords.top,
                left: coords.left,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {renderPlayerIcon(player)}
            </div>
          );
        })}
      </div>

      {/* Bottom Save/Load Controls */}
      <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={exportGame} style={{ marginRight: '10px' }}>Export Save</button>
        <input
          type="file"
          accept="application/json"
          onChange={importGame}
          style={{ marginRight: '10px' }}
        />
      </div>

      {/* Auction Modal */}
      {showAuctionModal && auctionProp && (
        <div className="modal" style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', border: '1px solid black', padding: '20px'
        }}>
          <h2>Auction for {auctionProp.name}</h2>
          <div>
            {players.map(p => (
              <div key={p.id}>
                <label>{p.name} bid: </label>
                <input type="number" onChange={(e) => {
                  setAuctionBids({ ...auctionBids, [p.id]: parseInt(e.target.value) || 0 });
                }} />
              </div>
            ))}
          </div>
          <button onClick={conductAuction}>Submit Auction</button>
        </div>
      )}

      {/* Trade Modal */}
      {showTradeModal && (
        <div className="modal" style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', border: '1px solid black', padding: '20px', maxWidth: '400px'
        }}>
          <h2>Trade Offer</h2>
          <div>
            <label>Trade with: </label>
            <select
              value={tradeDetails.playerOffering || ""}
              onChange={(e) => setTradeDetails({ ...tradeDetails, playerOffering: parseInt(e.target.value) })}
            >
              <option value="">Select Player</option>
              {players.filter(p => p.id !== currentPlayer.id).map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Money Offered: </label>
            <input
              type="number"
              value={tradeDetails.moneyOffered}
              onChange={(e) => setTradeDetails({ ...tradeDetails, moneyOffered: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label>Money Requested: </label>
            <input
              type="number"
              value={tradeDetails.moneyRequested}
              onChange={(e) => setTradeDetails({ ...tradeDetails, moneyRequested: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <strong>Properties Offered:</strong>
            {currentPlayer.properties.length ? (
              boardProperties.filter(p => currentPlayer.properties.includes(p.id)).map(prop => (
                <div key={prop.id}>
                  <input
                    type="checkbox"
                    value={prop.id}
                    checked={tradeDetails.propertiesOffered.includes(prop.id)}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      let arr = [...tradeDetails.propertiesOffered];
                      if (arr.includes(val)) arr = arr.filter(x => x !== val);
                      else arr.push(val);
                      setTradeDetails({ ...tradeDetails, propertiesOffered: arr });
                    }}
                  />
                  <label>{prop.name}</label>
                </div>
              ))
            ) : <p>No properties.</p>}
          </div>
          <div style={{ marginTop: '10px' }}>
            <strong>Properties Requested:</strong>
            {tradeDetails.playerOffering && players.find(p => p.id === tradeDetails.playerOffering).properties.length ? (
              boardProperties.filter(pr => players.find(pl => pl.id === tradeDetails.playerOffering).properties.includes(pr.id)).map(prop => (
                <div key={prop.id}>
                  <input
                    type="checkbox"
                    value={prop.id}
                    checked={tradeDetails.propertiesRequested.includes(prop.id)}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      let arr = [...tradeDetails.propertiesRequested];
                      if (arr.includes(val)) arr = arr.filter(x => x !== val);
                      else arr.push(val);
                      setTradeDetails({ ...tradeDetails, propertiesRequested: arr });
                    }}
                  />
                  <label>{prop.name}</label>
                </div>
              ))
            ) : <p>No properties.</p>}
          </div>
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleTrade}>Send Trade Offer</button>
            <button onClick={() => setShowTradeModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Build Houses Modal */}
      {showBuildModal && (
        <div className="modal" style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', border: '1px solid black', padding: '20px', maxWidth: '400px'
        }}>
          <h2>Build Houses/Hotel</h2>
          <p>Select a property you own and how many houses to build.</p>
          <div>
            <label>Property: </label>
            <select
              value={buildSelections.propertyId || ""}
              onChange={(e) => setBuildSelections({ ...buildSelections, propertyId: parseInt(e.target.value) })}
            >
              <option value="">Select property</option>
              {currentPlayer.properties.map(propId => {
                const prop = boardProperties.find(p => p.id === propId);
                if (!prop) return null;
                return (
                  <option key={prop.id} value={prop.id}>
                    {prop.name} ({prop.houses} built)
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Number of houses: </label>
            <input
              type="number"
              value={buildSelections.houses}
              onChange={(e) => setBuildSelections({ ...buildSelections, houses: parseInt(e.target.value) || 1 })}
              min="1"
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <button onClick={confirmBuildHouses}>Build</button>
            <button onClick={() => setShowBuildModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Mortgage Modal */}
      {showMortgageModal && (
        <div className="modal" style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', border: '1px solid black', padding: '20px', maxWidth: '400px'
        }}>
          <h2>Mortgage / Unmortgage</h2>
          <p>Select properties to mortgage or unmortgage.</p>
          <div style={{ marginBottom: '10px' }}>
            <strong>Mortgage:</strong>
            {currentPlayer.properties.filter(id => {
              const prop = boardProperties.find(p => p.id === id);
              return prop && !prop.mortgaged && ((prop.houses || 0) === 0);
            }).map(id => {
              const prop = boardProperties.find(p => p.id === id);
              return (
                <div key={prop.id}>
                  <button onClick={() => mortgageProperty(prop.id)}>
                    Mortgage {prop.name} (Get $ {prop.mortgageValue})
                  </button>
                </div>
              );
            })}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Unmortgage:</strong>
            {currentPlayer.properties.filter(id => {
              const prop = boardProperties.find(p => p.id === id);
              return prop && prop.mortgaged;
            }).map(id => {
              const prop = boardProperties.find(p => p.id === id);
              const cost = Math.ceil(prop.mortgageValue * 1.1);
              return (
                <div key={prop.id}>
                  <button onClick={() => unmortgageProperty(prop.id)}>
                    Unmortgage {prop.name} (Cost $ {cost})
                  </button>
                </div>
              );
            })}
          </div>
          <button onClick={() => setShowMortgageModal(false)}>Close</button>
        </div>
      )}

      {/* Players List */}
      <div style={{ width: '100%', maxWidth: '800px', marginTop: '40px' }}>
        <h2>Players</h2>
        {players.map(p => (
          <div key={p.id} style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {renderPlayerIcon(p)}
              <h3 style={{ marginLeft: '10px' }}>
                {p.name} {p.jailStatus.inJail && <span style={{ color: 'red' }}>(In Jail)</span>}
              </h3>
            </div>
            <p><strong>Money:</strong> $ {p.money}</p>
            <p><strong>Properties:</strong></p>
            {p.properties.length ? (
              <ul>
                {p.properties.map(propId => {
                  const prop = boardProperties.find(bp => bp.id === propId);
                  if (!prop) return null;
                  const rentDisplay = prop.rents ? prop.rents[prop.houses] : prop.rent || "N/A";
                  return (
                    <li key={prop.id}>
                      <strong>{prop.name}</strong> {prop.mortgaged && <span style={{ color: 'red' }}>[MORTGAGED]</span>}
                      <br />
                      Rent: {rentDisplay} {renderHouseIcons(prop.houses)}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No properties.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orhangazipoly;
