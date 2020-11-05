const fs = require("fs");

let rawdata = fs.readFileSync("data.json");
let data = JSON.parse(rawdata);

// sort the array
shuffle(data);

// draw it
draw(data);

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function draw(array) {
  let existing = [];
  let draw = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    let randomIndex = -1;
    let tries = 0;
    while (randomIndex !== index) {
      randomIndex = Math.floor(Math.random() * (array.length - 0) + 0);
      if (
        array[index].partner === array[randomIndex].name ||
        existing.includes(randomIndex) ||
        randomIndex === index
      ) {
        randomIndex = -1;
        tries = tries + 1;
      } else {
        existing.push(randomIndex);
        tries = 0;
        break;
      }

      // start again, if it's a stalemate.
      if (tries > 20) {
        index = 0;
        draw = [];
        existing = [];
        randomIndex = 0;
      }
    }

    if (array[randomIndex]) {
      draw.push({
        name: element.name,
        partner: element.partner,
        draw: array[randomIndex].name,
      });
    }
  }
  console.table(draw);
  fs.writeFileSync("draw.json", JSON.stringify(draw));
}
