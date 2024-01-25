import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyDTIlEfmdUFh_JDsdYWqz2mytBd0XuiC_0",
  authDomain: "anime-3132c.firebaseapp.com",
  databaseURL: "https://anime-3132c-default-rtdb.firebaseio.com",
  projectId: "anime-3132c",
  storageBucket: "anime-3132c.appspot.com",
  messagingSenderId: "404036144175",
  appId: "1:404036144175:web:16081724d50717c0dc0ada",
  measurementId: "G-WD1JR9T4C1"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function addAnime() {
  var animeName = document.getElementById('animeName').value;
  var status = document.getElementById('status').value;
  var desc = document.getElementById('desc').value;
  var posterLink = document.getElementById('posterLink').value;
  var type = document.getElementById('type').value;
  var studio = document.getElementById('studio').value;
  var genre = document.getElementById('genre').value;
  var scores = document.getElementById('scores').value;
  var rating = document.getElementById('rating').value;
  var duration = document.getElementById('duration').value;
  var quality = document.getElementById('quality').value;

  var animeRef = ref(database, 'anime');

  push(animeRef, {
    animeName: animeName,
    status: status,
    desc: desc,
    posterLink: posterLink,
    type: type,
    studio: studio,
    genre: genre,
    scores: scores,
    rating: rating,
    duration: duration,
    quality: quality
  });

  return false;
}
