const firebaseConfig = {
  apiKey: "AIzaSyDTIlEfmdUFh_JDsdYWqz2mytBd0XuiC_0",
  authDomain: "anime-3132c.firebaseapp.com",
  databaseURL: "https://anime-3132c-default-rtdb.firebaseio.com",
  projectId: "anime-3132c",
  storageBucket: "anime-3132c.appspot.com",
  messagingSenderId: "404036144175",
  appId: "1:404036144175:web:16081724d50717c0dc0ada",
  measurementId: "G-WD1JR9T4C1",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const animeCollectionRef = db.collection("animes");
let animesd = [];
let index =0;
let slide = document.querySelectorAll(".slide-item");

async function fetchAnimeData() {
  try {9
    await db.collection("animes")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          animesd.push(doc.data());
          console.log("complete");
        });

        animesd.forEach((img, i) => {
          slide[i].querySelector('img').src = img.posterLink;
        });

      })
      updateContent()
      setInterval(next,3000);
  } catch (error) {
    console.error("Error:", error);
  }
}


function next() {
  index = (index + 1) % animesd.length;
  updateContent();
}

function prev() {
  index = (index - 1 + animesd.length) % animesd.length;
  updateContent();
}

function updateContent() {
  let img = document.querySelector("#banner");
  let name = document.querySelector("#head");
  let desc = document.querySelector("#information > p");

  img.src = animesd[index].posterLink;
  name.textContent = animesd[index].animeName;
  desc.textContent = animesd[index].desc;
}

fetchAnimeData();

function generateCardTemplate(animes) {
  for (const anime of animesd.anime) {
    if (anime.animeName === animes) {
      console.log(anime);
      return `
        <article class="postcard dark yellow">
          <a class="postcard__img_link" href="#">
            <img class="postcard__img" src="${anime.posterLink}" alt="Image Title" />
          </a>
          <div class="postcard__text">
            <h1 class="postcard__title yellow"><a href="#">${anime.animeName}</a></h1>
            <div class="postcard__bar"></div>
            <div class="postcard__preview-txt">${anime.desc}</div>
            <ul class="postcard__tagbox">
              <li class="tag__item play yellow">
                <a href="#"><i class="fas fa-play mr-2"></i>Play Episode</a>
              </li>
            </ul>
          </div>
        </article>
      `;
    }
  }
}
function handleIconClick(clickedIcon) {
  var box = clickedIcon.parentElement;

  var prevClickedBox = document.querySelector(".box.clicked");
  if (prevClickedBox) {
    prevClickedBox.classList.remove("clicked");
  }

  // Set styles for the clicked elements
  box.classList.add("clicked");

  // Reset styles for previously clicked support elements
  var prevClickedSupport = document.querySelector(".box .support.clicked");
  if (prevClickedSupport) {
    prevClickedSupport.classList.remove("clicked");
  }

  // Reset styles for previously clicked icon elements
  var prevClickedIcon = document.querySelector(".box .icon.clicked");
  if (prevClickedIcon) {
    prevClickedIcon.classList.remove("clicked");
  }

  // Set styles for the support element of the clicked box
  var support = box.querySelector(".support");
  support.classList.add("clicked");

  // Set styles for the clicked icon
  clickedIcon.classList.add("clicked");

  // Get the previous and next elements of the clicked icon within the box
  var prevElment = clickedIcon.parentElement.previousElementSibling;
  var nextElment = clickedIcon.parentElement.nextElementSibling;
  var prevclickelemnt = document.querySelector(".box.boxprev");
  var nextclickelemnt = document.querySelector(".box.boxnext");
  if (prevclickelemnt) {
    prevclickelemnt.classList.remove("boxprev");
  }
  if (nextclickelemnt) {
    nextclickelemnt.classList.remove(".boxnext");
  }
  // Add classes to the previous and next elements
  if (prevElment) {
    prevElment.classList.add("boxprev");
  }

  if (nextElment) {
    nextElment.classList.add("boxnext");
  }
}
function ham() {
  let sidenav = document.querySelector(".side");
  sidenav.style.display = sidenav.style.display === "none" ? "block" : "none";
}
