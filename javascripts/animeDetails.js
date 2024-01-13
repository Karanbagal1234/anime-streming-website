function updateAnimeDetails(anime) {
    const selectors = {
        title: "#main-content > div.informations > h1",
        img: "div.img > img",
        description: "#main-content > div.informations > p",
        type: "#main-content > div.informations > div.row > div:nth-child(1) > ul > li:nth-child(1)",
        studio: "#main-content > div.informations > div.row > div:nth-child(1) > ul > li:nth-child(2)",
        status: "#main-content > div.informations > div.row > div:nth-child(1) > ul > li:nth-child(3)",
        genre: "#main-content > div.informations > div.row > div:nth-child(1) > ul > li:nth-child(4)",
        score: "#main-content > div.informations > div.row > div:nth-child(2) > ul > li:nth-child(1)",
        rating: "#main-content > div.informations > div.row > div:nth-child(2) > ul > li:nth-child(2)",
        duration: "#main-content > div.informations > div.row > div:nth-child(2) > ul > li:nth-child(3)",
    };

    const getElement = (selector) => document.querySelector(selector);

    const updateElement = (selector, content) => {
        console.log(`Selector: ${selector}, Content: ${content}`);
        const element = getElement(selector);
        if (element) {
            if (selector === selectors.img) {
                element.src = content;
            } else {
                element.innerHTML = content;
            }
        } else {
            console.error(`Element with selector ${selector} not found.`);
        }
    };

    updateElement(selectors.type, `<span>Type:</span> ${anime.type}`);
    updateElement(selectors.studio, `<span>Studios:</span> ${anime.studio}`);
    updateElement(selectors.genre, `<span>Genre:</span> ${anime.genre}`);
    updateElement(selectors.score, `<span>Scores:</span> ${anime.scores}`);
    updateElement(selectors.rating, `<span>Rating:</span> ${anime.rating}`);
    updateElement(selectors.duration, `<span>Duration:</span> ${anime.duration}`);
    updateElement(selectors.status, `<span>Status:</span> ${anime.status}`);
    updateElement(selectors.title, anime.animeName);
    updateElement(selectors.img, anime.posterLink);
    updateElement(selectors.description, anime.desc);
}

let animeData;
const urlParams = new URLSearchParams(window.location.search);
const animeDetailParam = urlParams.get('id').replaceAll("-", "%20");

async function fetchAnimeData(animeDetail) {
    try {
        const apiUrl = `https://script.google.com/macros/s/AKfycbwq3H4RkEahfnq3m9RTWnNzs9JheGyDdpNGsMG6hK3OiNfSk05Bv-LiuUar_s5-JNRN/exec?animedetail=${animeDetail}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch API data');
        }

        animeData = await response.json();
        const anime = animeData.anime;

        updateAnimeDetails(anime);
    } catch (error) {
        console.error('Error fetching or processing API data:', error);
        redirectTo404Page();
    }
}

if (animeDetailParam) {
    fetchAnimeData(animeDetailParam);
} else {
    window.location.href = '404.html';
}

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
    var prevElement = clickedIcon.parentElement.previousElementSibling;
    var nextElement = clickedIcon.parentElement.nextElementSibling;
    var prevClickedElement = document.querySelector(".box.boxprev");
    var nextClickedElement = document.querySelector(".box.boxnext");
    if (prevClickedElement) {
        prevClickedElement.classList.remove("boxprev");
    }
    if (nextClickedElement) {
        nextClickedElement.classList.remove("boxnext");
    }

    // Add classes to the previous and next elements
    if (prevElement) {
        prevElement.classList.add('boxprev');
    }

    if (nextElement) {
        nextElement.classList.add('boxnext');
    }
}
