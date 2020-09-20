let file1Select, file2Select, file3Select;
let file1og, file2og, file3og;
let file1, file2, file3;
let addButton, commitButton, pushButton;
let commitMessage;
let checked, changes;
let stagePanelItems, localRepoItems, remoteRepoItems;

function setup() { //set up goes in here
  checked = 0;
  file1og = ""; file2og = ""; file3og = "";
  changes = [];
  stagePanelItems = []; localRepoItems = []; remoteRepoItems = [];

  //create the working canvas
  createCanvas(1200, 800); 
  background(190); 
  textSize(11);
  textFont('Arial');

  //set up diagrams
  let width = 250;
  let height = 400;
  let curve = 30;
  let buffer = 40;
  noStroke();
  rect(buffer, 100, width, height, curve);
  rect(buffer*2 + width, 100, width, height, curve);
  rect(buffer*3 + width*2, 100, width, height, curve);
  rect(buffer*4 + width*3, 100, width, height, curve);

  //make "add" panel
  file1Select = createCheckbox('file1.txt', false);
  file1Select.style('font-size', '13px');
  file1Select.style('font-family', 'Arial');
  file1Select.position(140, 102);
  file1Select.changed(add1);
  file2Select = createCheckbox('file2.txt', false);
  file2Select.style('font-size', '13px');
  file2Select.style('font-family', 'Arial');
  file2Select.position(140, 232);
  file2Select.changed(add2);
  file3Select = createCheckbox('file3.txt', false);
  file3Select.style('font-size', '13px');
  file3Select.style('font-family', 'Arial');
  file3Select.position(140, 362);
  file3Select.changed(add3);

  file1 = createInput();
  file1.size(200, 100)
  file1.position(60, 120);
  file2 = createInput();
  file2.size(200, 100)
  file2.position(60, 250);
  file3 = createInput();
  file3.size(200, 100)
  file3.position(60, 380);

  // create buttons
  addButton = createButton('git add');
  addButton.position(buffer + 10, 520);
  addButton.mousePressed(doAdd);
  commitButton = createButton('git commit -m "______"');
  commitButton.position(buffer*2 + width + 10, 520);
  commitButton.mousePressed(doCommit);
  pushButton = createButton('git push');
  pushButton.position(buffer*3 + width*2 + 10, 520);
  pushButton.mousePressed(doPush);
}

function doAdd() {

  //uncheck everything
  file1Select.checked(false);
  file2Select.checked(false);
  file3Select.checked(false);

  //add stuff to the staging area
  if (addButton.html().includes("file1.txt")) {
    //get the changed value
    let totaltxt = file1.value();
    let changed = totaltxt.replace(file1og, "");
    file1og = totaltxt;
    changes.push("+" + changed);
  }
  if (addButton.html().includes("file2.txt")) {
    let totaltxt = file2.value();
    let changed = totaltxt.replace(file2og, "");
    file2og = totaltxt;
    changes.push("+" + changed);
  }
  if (addButton.html().includes("file3.txt")) {
    let totaltxt = file3.value();
    let changed = totaltxt.replace(file3og, "");
    file3og = totaltxt;
    changes.push("+ " + changed);
  }
  stage();

  //change the add button text back
  addButton.html('git add');

  //enable commit message
  text('commit message:', 345, 450);
  commitMessage = createInput();
  commitMessage.position(345, 460);
}

function stage() {
  console.log(changes);
  let x = 345;
  let startPos = 120;
  let buffer = 20;
  let height = 40;
  let width = 200;
  let curve = 20;
  
  let c = color(190);
  fill(c);
  noStroke();

  for (let i=0; i<checked; i++) {
    // c = color(190);
    // fill(c);
    // rect(x, startPos, width, height, curve);
    // c = color(0);
    // fill(c);
    // text(changes[i], x + 15, startPos + 15, width-20, height-20);
    // startPos += height + buffer;
    let change = createButton(changes[i]);
    change.style('border', 'none', 'color', '#D3D3D3', 'border-radius', '12px');
    change.position(x + 15, startPos + 15);
    stagePanelItems.push(change);
    startPos += height + buffer;
  }

  //reset values
  changes = [];
  checked = 0;
}

function doCommit() {
  //get rid of everything in the staging panel

  //copy commit message into the local repo panel
  let message = commitMessage.value();

  //empty out the commit input 
  commitMessage.value('');
}

function doPush() {
  //copy everything from the local repo panel to the remote repo panel
}

function add1() { 
  if (file1Select.checked()) {
    checked += 1;
    //change the text of addButton
    let newText = addButton.html() + ' file1.txt';
    addButton.html(newText);
  } else {
    checked -= 1;
    //change the text of addButton
    let newText = addButton.html().replace('file1.txt', '');
    addButton.html(newText);
  }
}

function add2() {
  if (file2Select.checked()) {
    checked += 1;
    //change the text of addButton
    let newText = addButton.html() + ' file2.txt';
    addButton.html(newText);
  } else {
    checked -= 1;
    //change the text of addButton
    let newText = addButton.html().replace('file2.txt', '');
    addButton.html(newText);
  }
}

function add3() {
  if (file3Select.checked()) {
    checked += 1;
    //change the text of addButton
    let newText = addButton.html() + ' file3.txt';
    addButton.html(newText);
  } else {
    checked -= 1;
    //change the text of addButton
    let newText = addButton.html().replace('file3.txt', '');
    addButton.html(newText);
  }
}

function draw() { // loops over and over again
  // put drawing code here
}