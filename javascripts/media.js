const urlParams = new URLSearchParams(window.location.search);
const idValue = urlParams.get('id');
const animeName = idValue ? idValue.replaceAll("-", " ") : undefined;

let title = document.querySelector("#main-content > section.video-playlist > h3");
title.textContent = animeName
document.addEventListener("DOMContentLoaded", function() {
    // Get the video element by its ID
    let video = document.getElementById("video");

    // Check if there is a stored time in the localStorage
    let storedTime = localStorage.getItem("videoCurrentTime");

    // Set the video's current time to the stored time, if available
    if (storedTime) {
        video.currentTime = Number(storedTime);
    }

    // Add an event listener to update the stored time when the video's time changes
    video.addEventListener("timeupdate", function() {
        // Store the current time in the localStorage
        localStorage.setItem("videoCurrentTime", video.currentTime.toString());
    });

    // Add an event listener to handle page refresh
    window.addEventListener("beforeunload", function() {
        // Store the current time in the localStorage before the page is unloaded
        localStorage.setItem("videoCurrentTime", video.currentTime.toString());
    });
});

function handleIconClick(clickedIcon) {
    // Get the parent box element
    var box = clickedIcon.parentElement;
  
    // Reset styles for previously clicked elements
    var prevClickedBox = document.querySelector('.box.clicked');
    if (prevClickedBox) {
      prevClickedBox.classList.remove('clicked');
    }
  
    // Set styles for the clicked elements
    box.classList.add('clicked');
    
    // Reset styles for previously clicked support elements
    var prevClickedSupport = document.querySelector('.box .support.clicked');
    if (prevClickedSupport) {
      prevClickedSupport.classList.remove('clicked');
    }
  
    // Reset styles for previously clicked icon elements
    var prevClickedIcon = document.querySelector('.box .icon.clicked');
    if (prevClickedIcon) {
      prevClickedIcon.classList.remove('clicked');
    }
  
    // Set styles for the support element of the clicked box
    var support = box.querySelector('.support');
    support.classList.add('clicked');
  
    // Set styles for the clicked icon
    clickedIcon.classList.add('clicked');

// Get the previous and next elements of the clicked icon within the box
var prevElment = clickedIcon.parentElement.previousElementSibling;
var nextElment = clickedIcon.parentElement.nextElementSibling;
var prevclickelemnt = document.querySelector(".box.boxprev")
var nextclickelemnt = document.querySelector(".box.boxnext")
if(prevclickelemnt){
prevclickelemnt.classList.remove("boxprev");
}
if(nextclickelemnt){
nextclickelemnt.classList.remove(".boxnext")
  
}
// Add classes to the previous and next elements
if (prevElment) {
  prevElment.classList.add('boxprev');
}

if (nextElment) {
  nextElment.classList.add('boxnext');
}
}


function chatgpt(params) {
  let src = params.querySelector("div").classList;
  let vidtitle = params.querySelector("h3").innerText;
  plaingvideotitle.innerText = vidtitle
  main_video.src = src

}

const apiUrl = `https://script.google.com/macros/s/AKfycbwq3H4RkEahfnq3m9RTWnNzs9JheGyDdpNGsMG6hK3OiNfSk05Bv-LiuUar_s5-JNRN/exec?watch=${animeName.replaceAll(" ","%20")}`;
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data)
    const main_video = document.querySelector('.main-video video source');
    const main_title = document.querySelector('.main-video .title');
    const video_playlist = document.querySelector('.video-playlist .vid');
    let animes = [
      {
        name: "Demon Slayer",
        episodes: [
          { title: "Episode 1", src: "https://www.youtube.com/embed/_vnWp4XM8QU" },
          { title: "Episode 2", src: "https://www.youtube.com/embed/_vnWp4XM8QU" },
          { title: "Episode 2", src: "https://www.youtube.com/embed/_vnWp4XM8QU" },
          { title: "Episode 2", src: "https://www.youtube.com/embed/_vnWp4XM8QU" },
          { title: "Episode 2", src: "https://www.youtube.com/embed/_vnWp4XM8QU" },
          { title: "Episode 2", src: "https://www.youtube.com/embed/_vnWp4XM8QU" },
          { title: "Episode 2", src: "https://www.youtube.com/embed/_vnWp4XM8QU" },
        ],
      },
    ];
    
    animes.forEach(anime => {
      anime.episodes.forEach((episode, i) => {
        let video_element = `
          <div class="videos">
            <div class="video active" onclick="chatgpt(this)">
              <img src="https://cdn-icons-png.flaticon.com/512/482/482059.png" alt="" srcset="">
              <p>0${i + 1}.</p>
              <h3 class="title">${episode.title}</h3>
              <div style="display:none;" class="${episode.src}"></div>
              <p class="time">${episode.src.length}</p>
            </div>
          </div>
        `;
        video_playlist.insertAdjacentHTML('beforeend', video_element);
      });
    });
    let plaingvideotitle = document.querySelector("#main-content > section.main-video > h3");
    function play(){
      let firstep= document.querySelector("#main-content > section.video-playlist > div > div:nth-child(1) > div > div");
      let vititle = document.querySelector("#main-content > section.video-playlist > div > div:nth-child(1) > div > h3");
      plaingvideotitle.innerText = vititle.innerText
      main_video.src = firstep.classList;
     }
    
    play()
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });