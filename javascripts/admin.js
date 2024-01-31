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
const addAnimeButton = document.querySelector("#addAnimeForm > button");


document.getElementById('detail').addEventListener('click', () => {
   
        const formData = new FormData(document.getElementById("addAnimeForm"));
        const animeData = Object.fromEntries(formData.entries());
        const docRef = db.collection("animes").doc(animeData.animeName);

        docRef.set(animeData);
      
});

function updateSelectOptions(selectId, options) {
  const selectElement = document.getElementById(selectId);
  selectElement.innerHTML = options
    .map((option) => `<option ${option.value}>${option.text}</option>`)
    .join("");
}

async function fetchAndUpdateAnimeOptions() {
  try {
    const animeOptions = await db
      .collection("animes")
      .get()
      .then((querySnapshot) =>
        querySnapshot.docs.map((doc) => ({
          value: doc.data().animeName,
          text: doc.data().animeName,
        }))
      );

    updateSelectOptions("selectAnime", animeOptions);
    updateSelectOptions("selectAnime2", animeOptions);
  } catch (error) {
    console.error("Error fetching anime options:", error);
  }
}

fetchAndUpdateAnimeOptions();

function add() {
  let name = document.querySelector("#selectAnime").value;
  let no = document.querySelector("#addEpNo").value;
  let title = document.querySelector("#addEpTitle").value;
  let src = document.querySelector("#addEpSrc").value;

  let animeData = {
    title: title,
    src: src,
  };

  const docRef = db.collection("animes").doc(name).collection(no).doc(no);

  docRef.set(animeData);
}

function add2() {
  let name = document.querySelector("#selectAnime2").value;
  let no = document.querySelector("#modifyEpNo").value;
  let title = document.querySelector("#modifyEpTitle").value;
  let src = document.querySelector("#modifyEpSrc").value;

  let animeData = {
    title: title,
    src: src,
  };

  const docRef = db.collection("animes").doc(name).collection(no).doc(no);

  docRef.set(animeData);

}
let episodeData = [];
function disp() {
const name = document.querySelector("#selectAnime2").value;
const no = document.querySelector("#modifyEpNo").value;
const title = document.querySelector("#modifyEpTitle");
const src = document.querySelector("#modifyEpSrc");


db.collection("animes")
.doc(name)
.collection(no)
.doc(no)
.get()
.then((doc) => {
if (doc.exists) {
  episodeData.push(doc.data());
  title.value = episodeData[0].title;
  src.value = episodeData[0].src;
} else {
  title.value = ""; // Clear fields if no document exists
  src.value = "";
  console.log("No such document!");
}
})
.catch((error) => {
console.error("Error fetching data:", error);
});

}


document.querySelector("#modifyEpNo").addEventListener("input", disp);