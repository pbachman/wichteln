const fs = require("fs");

let rawdata = fs.readFileSync("data.json");
let data = JSON.parse(rawdata);

// sort the array
shuffle(data);

// draw
draw(data);

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function draw(array) {
  let newarray = [];
  let draw = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    let randomIndex = -1;
    let tries = 0;
    while (randomIndex !== index) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * (array.length - 0) + 0);
      if (
        array[index].partner === array[randomIndex].name ||
        newarray.includes(randomIndex) ||
        randomIndex === index
      ) {
        randomIndex = -1;
        tries = tries + 1;
        console.log(tries);
      } else {
        newarray.push(randomIndex);
        tries = 0;
        break;
      }
    }
    //console.log(element.name + " -> " + array[randomIndex].name);
    draw.push({
      name: element.name,
      partner: element.partner,
      draw: array[randomIndex].name
    });
  }
  fs.writeFileSync('draw.json', JSON.stringify(draw));
}
