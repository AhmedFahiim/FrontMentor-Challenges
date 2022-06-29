let icons = document.querySelectorAll(".score i");
let userAvatar = document.getElementById("user-avatar");
let replayCom = document.querySelectorAll(".com-rep-box");
let replayRep = document.querySelectorAll(".rep-rep-box");
let replayComWord = document.querySelectorAll(".com-rep-box .replay-word");
let replayRepWord = document.querySelectorAll(".rep-rep-box .replay-word");
let allComments = document.querySelectorAll(".comment");
let allReplies = document.querySelectorAll(".replay");
let addReplay = document.getElementById("post-comment");
let currentUserName;
let currentUserImage;

// comment elemnts
let comScoreNum = document.querySelectorAll(".number");
let comImage = document.querySelectorAll(".avatar img");
let comUserName = document.querySelectorAll(".name");
let comDate = document.querySelectorAll(".date");
let comContent = document.querySelectorAll(".content");

// replies elemnts
let repScoreNum = document.querySelectorAll(".number-replay");
let repImage = document.querySelectorAll(".avatar-replay img");
let repUserName = document.querySelectorAll(".name-replay");
let repDate = document.querySelectorAll(".date-replay");
let repContent = document.querySelectorAll(".content-replay");
let repTo = document.querySelectorAll(".rep-to");

async function getData() {
  let data = (await fetch("data.json")).json();
  let dataRecieved = await data;

  currentUserName = dataRecieved.currentUser.username;
  currentUserImage = dataRecieved.currentUser.image.png;

  userAvatar.src = currentUserImage;

  // looping on data
  dataRecieved.comments.forEach((e, i) => {
    if (e.user.username === currentUserName) {
      addingBadge(comUserName[i], replayCom[i]);
      replayComWord[i].textContent = "Edit";
    }
    if (e.replies.length > 0) {
      e.replies.forEach((r, index) => {
        if (r.user.username === currentUserName) {
          addingBadge(repUserName[index], replayRep[index]);
          replayRepWord[i].textContent = "Edit";
        }
        repScoreNum[index].textContent = r.score;
        repImage[index].src = r.user.image.png;
        repUserName[index].textContent = r.user.username;
        repDate[index].textContent = r.createdAt;
        repContent[index].textContent = r.content;
        repTo[index].textContent += r.replyingTo;
      });
    }

    comScoreNum[i].textContent = e.score;
    comImage[i].src = e.user.image.png;
    comUserName[i].textContent = e.user.username;
    comDate[i].textContent = e.createdAt;
    comContent[i].textContent = e.content;
  });
}
getData();

// function to add badge and delete butotn
function addingBadge(badgePos, deletePos) {
  // create badge
  let spanHolder = document.createElement("div");
  let youSpan = document.createElement("span");
  spanHolder.className = "you";
  youSpan.textContent = "you";
  spanHolder.append(youSpan);
  badgePos.after(spanHolder);

  // create delete button
  let deleteDiv = document.createElement("div");
  let deleteIcon = document.createElement("i");
  deleteDiv.className = "delete";
  deleteDiv.textContent = "Delete";
  deleteIcon.className = "fa-solid fa-trash-can";
  deleteIcon.style.marginRight = "5px";
  deleteDiv.prepend(deleteIcon);
  deletePos.before(deleteDiv);
}

// function to change scoreNumbers
function changeScore() {
  icons.forEach((i) => {
    i.onclick = (e) => {
      if (e.target.classList.contains("plus")) {
        i.nextElementSibling.textContent =
          Number(i.nextElementSibling.textContent) + 1;
      } else
        i.previousElementSibling.textContent =
          Number(i.previousElementSibling.textContent) - 1;
    };
  });
}
changeScore();

// function to replay on any comment or replay
function addReplies(listToloop, ind, ele) {
  // clooning the the box
  let clonedReplay = addReplay.cloneNode(true);
  let submitButton = clonedReplay.children[0].children[2].firstElementChild;
  submitButton.textContent = "Replay";
  clonedReplay.style.cssText = "margin-bottom:15px; margin-top:-10px;";
  let textArea = clonedReplay.children[0].children[1].firstElementChild;

  // add the username of the comment owner
  if (listToloop === replayCom) {
    allComments[ind].after(clonedReplay);
    textArea.textContent = `@${comUserName[ind].textContent} `;
  } else {
    allReplies[ind].after(clonedReplay);
    textArea.textContent = `@${repUserName[ind].textContent} `;
  }
  ele.style.pointerEvents = "none";
}

// function to edit my comments or rplies
function editMine(listToloop, ind, ele) {
  // create the textArea
  let editArea = document.createElement("textarea");
  editArea.style.cssText =
    "border:none; width:100%; margin-top:10px; resize: none; height:110px; padding: 8px 10px;";

  // create Update button
  let update = document.createElement("button");
  update.textContent = "Update";
  update.style.cssText =
    "display:block; margin: 10px 0 0 auto; background-color:#5358b4;border:none; outline:none; border-radius:5px; padding:5px 8px; color:#fff ";

  if (listToloop === replayCom) {
    editArea.textContent =
      allComments[ind].children[0].children[1].append(editArea);
    allComments[ind].children[0].children[1].append(update);
    repTo[ind].remove();
  } else {
    editArea.textContent = `${repTo[ind].textContent} ${comContent[ind].textContent}`;
    allReplies[ind].children[0].children[1].append(editArea);
    allReplies[ind].children[0].children[1].append(update);
    repTo[ind].remove();
    repContent[ind].remove();
  }
  ele.style.pointerEvents = "none";
}
// function to process adding replay
function processReplay(listToloop) {
  listToloop.forEach((i, index) => {
    i.onclick = () => {
      // edit my comment or replay
      if (i.children[1].textContent === "Edit") editMine(listToloop, index, i);
      else addReplies(listToloop, index, i);
    };
  });
}
processReplay(replayCom);
processReplay(replayRep);
