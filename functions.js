let dID;
let dealerValue = 0;
let playerValue = 0;
let dealdraw = true;

function Draw()
{
  fetch('https://deckofcardsapi.com/api/deck/'+ dID + '/draw/?count=1', {
  method: "GET"
  })
  .then(res => res.json())
  .then(function (display)
  {
    let cardI = document.createElement("img");
    let cardD = document.createElement("div");
    cardI.src = display.cards[0].image;
    cardD.appendChild(cardI);
    cardD.setAttribute("class", "card")
    document.getElementById("playerhand").appendChild(cardD);
    if(display.cards[0].value == "KING" || display.cards[0].value == "QUEEN" || display.cards[0].value == "JACK")
    {
      playerValue = playerValue + 10;
    }
    else if(display.cards[0].value == "ACE")
    {
      playerValue = playerValue + 11;
    }
    else
    {
      playerValue = playerValue + Number(display.cards[0].value);
    }
    if(playerValue >= 21)
    {
      Fold();
    }
  })
  .catch(error => console.error('Error:',error));
}

function Shuffle()
{
  dealdraw = true;
  dealerValue = 0;
  playerValue = 0;
  document.getElementById("hitB").style.display = "inline";
  document.getElementById("foldB").style.display = "inline";
  document.getElementById("resultsB").style.display = "none";
  document.getElementById("playerhand").innerHTML = "";
  document.getElementById("dealerhand").innerHTML = "";
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', {
  method: "GET"
  })
  .then(res => res.json())
  .then(function (display)
  {
    dID = display.deck_id;
    PCards();
    DCards();
  })
  .catch(error => console.error('Error:',error));
}

function PCards()
{
  fetch('https://deckofcardsapi.com/api/deck/'+ dID + '/draw/?count=2', {
  method: "GET"
  })
  .then(res => res.json())
  .then(function (display)
  {
    for(let i = 0; i < 2; i++)
    {
      let cardI = document.createElement("img");
      let cardD = document.createElement("div");
      cardI.src = display.cards[i].image;
      cardD.appendChild(cardI);
      cardD.setAttribute("class", "card")
      document.getElementById("playerhand").appendChild(cardD);
      if(display.cards[i].value == "KING" || display.cards[i].value == "QUEEN" || display.cards[i].value == "JACK")
      {
        playerValue = playerValue + 10;
      }
      else if(display.cards[i].value == "ACE")
      {
        playerValue = playerValue + 11;
      }
      else
      {
        playerValue = playerValue + Number(display.cards[i].value);
      }
    }
    if(playerValue == 22)
    {
      Fold();
    }
  })
  .catch(error => console.error('Error:',error));
}

function DCards()
{
  fetch('https://deckofcardsapi.com/api/deck/'+ dID + '/draw/?count=2', {
  method: "GET"
  })
  .then(res => res.json())
  .then(function (display)
  {
    for(let i = 0; i < 2; i++)
    {
      let cardI = document.createElement("img");
      let cardD = document.createElement("div");
      cardI.src = display.cards[i].image;
      cardD.appendChild(cardI);
      cardD.setAttribute("class", "card")
      document.getElementById("dealerhand").appendChild(cardD);
      if(display.cards[i].value == "KING" || display.cards[i].value == "QUEEN" || display.cards[i].value == "JACK")
      {
        dealerValue = dealerValue + 10;
      }
      else if(display.cards[i].value == "ACE")
      {
        dealerValue = dealerValue + 11;
      }
      else
      {
        dealerValue = dealerValue + Number(display.cards[i].value);
      }
    }
  })
  .catch(error => console.error('Error:',error));
}

function Fold()
{
  document.getElementById("hitB").style.display = "none";
  document.getElementById("foldB").style.display = "none";
  document.getElementById("resultsB").style.display = "inline";
  if(playerValue > 21)
  {
    alert("You busted, you lose!");
  }
  else
  {
    DealerDraw();
  }
}

function DealerDraw()
{
  fetch('https://deckofcardsapi.com/api/deck/'+ dID + '/draw/?count=7', {
  method: "GET"
  })
  .then(res => res.json())
  .then(function (display)
  {
    let j = 0;
    if(dealerValue <= 19)
    {
      while(dealdraw)
      {
        if(dealerValue > playerValue && dealerValue <= 21)
        {
          dealdraw = false;
          break;
        }
        let cardI = document.createElement("img");
        let cardD = document.createElement("div");
        cardI.src = display.cards[j].image;
        cardD.appendChild(cardI);
        cardD.setAttribute("class", "card")
        document.getElementById("dealerhand").appendChild(cardD);
        if(display.cards[j].value == "KING" || display.cards[j].value == "QUEEN" || display.cards[j].value == "JACK")
        {
          dealerValue = dealerValue + 10;
        }
        else if(display.cards[j].value == "ACE")
        {
          dealerValue = dealerValue + 11;
        }
        else
        {
          dealerValue = dealerValue + Number(display.cards[j].value);
        }
        if(dealerValue >= 21)
        {
          dealdraw = false;
        }
        if(j < 7)
        {
          j++;
        }
      }
    }
  })
  .catch(error => console.error('Error:',error));
}

function Results()
{
  if(dealerValue == playerValue == 21)
  {
    alert("Tie, the House wins!");
  }
  if(dealerValue == playerValue)
  {
    alert("Tie, the House wins!");
  }
  else if(dealerValue > 21)
  {
    alert("The House busted, you win!")
  }
  else if(playerValue > 21)
  {
    alert("You busted, you lose!");
  }
  else if(dealerValue > playerValue)
  {
    alert("The House wins!")
  }
  else
  {
    alert("You win!")
  }
}
