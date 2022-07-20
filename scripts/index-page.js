const commentData = [
  {
    date: new Date("02/17/2021"),
    name: "Connor Walton",
    comment: `This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.`,
  },
  {
    date: new Date("01/09/2021"),
    name: "Emmilie Beach",
    comment: `I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.`,
  },
  {
    date: new Date("12/20/2020"),
    name: "Miles Acosta",
    comment: `I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.`,
  },
];

// Calculations from https://natclark.com/tutorials/javascript-relative-time/

function getRelativeTime(oldDate) {
  console.log("old date", oldDate, Date.now());
  const now = Date.now();
  const seconds = Math.floor(now / 1000);
  const oldTimestamp = Math.floor(oldDate.getTime() / 1000);
  const difference = seconds - oldTimestamp;

  let output = ``;
  let calc;

  if (difference === 0) {
    return "Just now";
  } else if (difference < 60) {
    // Less than a minute has passed:
    output = `${difference} second`;
  } else if (difference < 3600) {
    // Less than an hour has passed:
    calc = Math.floor(difference / 60);
    output = `${calc} minute`;
  } else if (difference < 86400) {
    // Less than a day has passed:
    calc = Math.floor(difference / 3600);
    output = `${calc} hour`;
  } else if (difference < 2620800) {
    // Less than a month has passed:
    calc = Math.floor(difference / 86400);
    output = `${calc} day`;
  } else if (difference < 31449600) {
    // Less than a year has passed:
    calc = Math.floor(difference / 2620800);
    output = `${calc} month`;
  } else {
    // More than a year has passed:
    calc = Math.floor(difference / 31449600);
    output = `${calc} year`;
  }

  if (calc === 1) {
    // Singular
    return `${output} ago`;
  } else {
    // Plural
    return `${output}s ago`;
  }
}

/*  createComment creates a new comment object
    ex. HTML below:
 
    <div class="comments-section__added-comment-wrapper">
        <div class="comments-section__img"></div>
        <div class="comments-section__added-comment-text-wrapper">
        <div class="comments-section__comment-name-and-date-wrapper">
            <p class="comments-section__name-of-comment">Connor Walton</p>
            <p class="comments-section__date-of-comment">02/17/2021</p>
        </div>
        <p class="comments-section__text-of-comment">
            This is art. This is inexplicable magic expressed in the
            purest way, everything that makes up this majestic work
            deserves reverence. Let us appreciate this for what it is and
            what it contains.
        </p>
        </div>
    </div>
*/
function createComment(comment) {
  // name
  const name = document.createElement("p");
  name.classList.add("comments-section__name-of-comment");
  name.innerHTML = comment.name;

  // date
  const date = document.createElement("p");
  date.classList.add("comments-section__date-of-comment");
  date.innerHTML = getRelativeTime(comment.date);

  // comment
  const commentText = document.createElement("p");
  commentText.classList.add("comments-section__text-of-comment");
  commentText.innerHTML = comment.comment;

  // wrappers
  const nameDateWrapper = document.createElement("div");
  nameDateWrapper.classList.add(
    "comments-section__comment-name-and-date-wrapper"
  );
  nameDateWrapper.appendChild(name);
  nameDateWrapper.appendChild(date);

  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("comments-section__added-comment-text-wrapper");
  contentWrapper.appendChild(nameDateWrapper);
  contentWrapper.appendChild(commentText);

  // image
  const commentImage = document.createElement("div");
  commentImage.classList.add("comments-section__img");

  // create object
  const commentWrapper = document.createElement("div");
  commentWrapper.classList.add("comments-section__added-comment-wrapper");
  commentWrapper.appendChild(commentImage);
  commentWrapper.appendChild(contentWrapper);

  return commentWrapper;
}

// Creates a divider
function createDivider() {
  const divider = document.createElement("hr");
  divider.classList.add("divider");
  return divider;
}

// Rerender comments
function reloadAllComments() {
  const commentsContainer = document.getElementById("comments-container");

  // clear container
  commentsContainer.innerHTML = "";
  commentsContainer.appendChild(createDivider());

  //appends a comment and creates a divider
  for (let i = 0; i < commentData.length; i++) {
    const newComment = createComment(commentData[i]);
    commentsContainer.appendChild(newComment);
    commentsContainer.appendChild(createDivider());
  }
}

// submitComment submits the form fields and reloads the comments on the page
function submitComment() {
  const nameInput = document.getElementById("name-input");
  const commentInput = document.getElementById("comment-input");
  const date = new Date();

  commentData.unshift({
    name: nameInput.value,
    comment: commentInput.value,
    date: date,
  });

  reloadAllComments();

  // clear form
  nameInput.value = "";
  commentInput.value = "";

  // prevent page reload
  return false;
}

// on load populate page with data and attatch click listeners
document.addEventListener("DOMContentLoaded", () => {
  reloadAllComments();
});
