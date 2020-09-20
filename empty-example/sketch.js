let file1Select, file2Select, file3Select;
let file1og, file2og, file3og;
let file1, file2, file3;
let addButton, commitButton, pushButton;
let commitMessage;
let checked, changes;
let stagePanelItems, localRepoItems, remoteRepoItems;
let gitImg;

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

  //create "files"
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
  addButton.style('border', 'none');
  addButton.mousePressed(doAdd);
  commitButton = createButton('git commit -m "______"');
  commitButton.position(buffer*2 + width + 10, 520);
  commitButton.style('border', 'none');
  commitButton.mousePressed(doCommit);
  pushButton = createButton('git push');
  pushButton.position(buffer*3 + width*2 + 10, 520);
  pushButton.style('border', 'none');
  pushButton.mousePressed(doPush);

  //create panel labels
  textFont('Arial');
  fill(255);
  textSize(17);
  text('working directory', 100, 80);
  text('staging area', 410, 80);
  text('local repository', 690, 80);
  text('remote repository', 970, 80);
  
  //create computer and git labels
  noFill();
  stroke(255);
  arc(460, 570, 750, 70, 0, PI, OPEN);
  fill(255);
  noStroke();
  text('your computer!', 410, 630);

  loadImage('http://pngimg.com/uploads/github/github_PNG40.png', img => {
    console.log('here')
    image(img, 970, 630, 50, 50);
  });
  loadImage('computer.png', img1 => {
    image(img1, 970, 630);
  });
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
    if (totaltxt.length > file1og.length) {
      let changed = totaltxt.replace(file1og, "");
      file1og = totaltxt;
      changes.push("+ " + changed);
    } else {
      let changed = file1og.replace(totaltxt, '');
      file1og = totaltxt;
      changes.push('- ' + changed);
    }
  }
  if (addButton.html().includes("file2.txt")) {
    let totaltxt = file2.value();
    if (totaltxt.length > file2og.length) {
      let changed = totaltxt.replace(file2og, "");
      file2og = totaltxt;
      changes.push("+ " + changed);
    } else {
      let changed = file2og.replace(totaltxt, '');
      file2og = totaltxt;
      changes.push('- ' + changed);
    }
  }
  if (addButton.html().includes("file3.txt")) {
    let totaltxt = file3.value();
    if (totaltxt.length > file3og.length) {
      let changed = totaltxt.replace(file3og, "");
      file3og = totaltxt;
      changes.push("+ " + changed);
    } else {
      let changed = file3og.replace(totaltxt, '');
      file3og = totaltxt;
      changes.push('- ' + changed);
    }
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

let commitX = 655;
let commitStart = 120;
let commitBuffer = 20;
function doCommit() {
  //get rid of everything in the staging panel
  while (stagePanelItems.length > 0) {
    stagePanelItems[0].remove();
    stagePanelItems.splice(0, 1);
  }

  //copy commit message into the local repo panel
  let message = commitMessage.value();
  let commitTrack = createButton(message);
  commitTrack.style('border', 'none', 'color', '#D3D3D3', 'border-radius', '12px');
  commitTrack.position(commitX, commitStart + 15);
  
  //the copy for the remote repo
  let commitCopy = createButton(message);
  commitCopy.style('border', 'none', 'color', '#D3D3D3', 'border-radius', '12px');
  localRepoItems.push(commitTrack);
  remoteRepoItems.push(commitCopy);
  commitStart += commitBuffer;

  //empty out the commit input 
  commitMessage.value('');
}

let pushX = 940;
let pushStart = 120;
let pushBuffer = 20;
let pushed = 0;
function doPush() {
  // copy everything from the local repo panel to the remote repo panel
  for (let i=pushed; i<localRepoItems.length; i++) {
    remoteRepoItems[i].position(pushX, pushStart + 15);
    pushStart += pushBuffer;
  }
  pushed += 1;
}

let textTracker = "git add";
function add1() { 
  if (file1Select.checked()) {
    checked += 1;
    let newText = addButton.html() + ' file1.txt';
    textTracker = newText;
    //change the text of addButton
    if (checked == 3) {
      addButton.html('git add --all');
    } else {
      addButton.html(newText);
    }
  } else {
    let newText;
    if (checked == 3) {
      newText = textTracker.replace('file1.txt', '');
    } else {
      newText = addButton.html().replace('file1.txt', '');
    }
    checked -= 1;
    //change the text of addButton
    textTracker = newText;
    addButton.html(newText);
  }
}

function add2() {
  if (file2Select.checked()) {
    checked += 1;
    let newText = addButton.html() + ' file2.txt';
    textTracker = newText;
    //change the text of addButton
    if (checked == 3) {
      addButton.html('git add --all');
    } else {
      addButton.html(newText);
    }
  } else {
    let newText;
    if (checked == 3) {
      newText = textTracker.replace('file2.txt', '');
    } else {
      newText = addButton.html().replace('file2.txt', '');
    }
    checked -= 1;
    //change the text of addButton
    textTracker = newText;
    addButton.html(newText);
  }
}

function add3() {
  if (file3Select.checked()) {
    checked += 1;
    let newText = addButton.html() + ' file3.txt';
    textTracker = newText;
    //change the text of addButton
    if (checked == 3) {
      addButton.html('git add --all');
    } else {
      addButton.html(newText);
    }
  } else {
    let newText;
    if (checked == 3) {
      newText = textTracker.replace('file3.txt', '');
    } else {
      newText = addButton.html().replace('file3.txt', '');
    }
    checked -= 1;
    //change the text of addButton
    textTracker = newText;
    addButton.html(newText);
  }
}

function draw() { // loops over and over again
  // put drawing code here
}