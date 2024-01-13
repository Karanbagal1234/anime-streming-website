const urlParams = new URLSearchParams(window.location.search);
const idValue = urlParams.get('id');
const animeName = idValue ? idValue.replaceAll("-", " ") : undefined;

let titleElement = document.querySelector("#main-content > section.video-playlist > h3");
titleElement.textContent = animeName;

document.addEventListener("DOMContentLoaded", function () {
    let video = document.getElementById("video");
    let storedTime = localStorage.getItem("videoCurrentTime");

    if (storedTime) {
        video.currentTime = Number(storedTime);
    }

    video.addEventListener("timeupdate", function () {
        localStorage.setItem("videoCurrentTime", video.currentTime.toString());
    });

    window.addEventListener("beforeunload", function () {
        localStorage.setItem("videoCurrentTime", video.currentTime.toString());
    });
});

function handleIconClick(clickedIcon) {
    let box = clickedIcon.parentElement;

    let prevClickedBox = document.querySelector('.box.clicked');
    if (prevClickedBox) {
        prevClickedBox.classList.remove('clicked');
    }

    box.classList.add('clicked');

    let prevClickedSupport = document.querySelector('.box .support.clicked');
    if (prevClickedSupport) {
        prevClickedSupport.classList.remove('clicked');
    }

    let prevClickedIcon = document.querySelector('.box .icon.clicked');
    if (prevClickedIcon) {
        prevClickedIcon.classList.remove('clicked');
    }

    let support = box.querySelector('.support');
    support.classList.add('clicked');

    clickedIcon.classList.add('clicked');

    let prevElement = clickedIcon.parentElement.previousElementSibling;
    let nextElement = clickedIcon.parentElement.nextElementSibling;
    let prevClickedElement = document.querySelector(".box.boxprev");
    let nextClickedElement = document.querySelector(".box.boxnext");

    if (prevClickedElement) {
        prevClickedElement.classList.remove("boxprev");
    }
    if (nextClickedElement) {
        nextClickedElement.classList.remove("boxnext");
    }

    if (prevElement) {
        prevElement.classList.add('boxprev');
    }

    if (nextElement) {
        nextElement.classList.add('boxnext');
    }
}
let plaingvideotitle = document.querySelector("#main-content > section.main-video > h3");
function updateVideoChat(params) {
    let src = params.querySelector("div").classList;
    let videoTitle = params.querySelector("h3").innerText;
    plaingvideotitle.innerText = videoTitle;
    main_video.src = src;
}

const apiUrl = `https://script.google.com/macros/s/AKfycbwq3H4RkEahfnq3m9RTWnNzs9JheGyDdpNGsMG6hK3OiNfSk05Bv-LiuUar_s5-JNRN/exec?watch=${animeName.replaceAll(" ", "%20")}`;
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
        const mainVideoElement = document.querySelector('.main-video video source');
        const mainTitleElement = document.querySelector('.main-video .title');
        const videoPlaylistElement = document.querySelector('.video-playlist .vid');

        let animes = [
            {
                name: "Demon Slayer",
                episodes: [
                    { title: "Episode 1", src: "https://www.youtube.com/embed/_vnWp4XM8QU" },
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
                let videoElement = `
                    <div class="videos">
                        <div class="video active" onclick="updateVideoChat(this)">
                            <img src="https://cdn-icons-png.flaticon.com/512/482/482059.png" alt="" srcset="">
                            <p>0${i + 1}.</p>
                            <h3 class="title">${episode.title}</h3>
                            <div style="display:none;" class="${episode.src}"></div>
                            <p class="time">${episode.src.length}</p>
                        </div>
                    </div>
                `;
                videoPlaylistElement.insertAdjacentHTML('beforeend', videoElement);
            });
        });

        let playingVideoTitle = document.querySelector("#main-content > section.main-video > h3");

        function play() {
            let firstEpisode = document.querySelector("#main-content > section.video-playlist > div > div:nth-child(1) > div > div");
            let videoTitle = document.querySelector("#main-content > section.video-playlist > div > div:nth-child(1) > div > h3");
            playingVideoTitle.innerText = videoTitle.innerText;
            main_video.src = firstEpisode.classList;
        }

        play();
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
