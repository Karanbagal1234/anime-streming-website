
    let animesd;
    let originalContent ;
    let wishlistAnime;
    
// Wrap your existing code in an async function
async function initializePage() {
  try {
    // Fetch the API data
    const response = await fetch('https://script.google.com/macros/s/AKfycbwq3H4RkEahfnq3m9RTWnNzs9JheGyDdpNGsMG6hK3OiNfSk05Bv-LiuUar_s5-JNRN/exec');
    animesd = await response.json();
    animesd.anime.shift();  
    let randomIndex;
let index = [];  // Add this line to declare the index array
let img = document.querySelectorAll(".slide-item img");
for (let i = 0; i < animesd.anime.length; i++) {
    randomIndex = i;
    index.push(randomIndex);
    img[i].src = animesd.anime[randomIndex].posterLink;
    img[i].parentElement.querySelector(".img-icons").children[1].classList.add(animesd.anime[randomIndex].animeName.replaceAll(" ", "-"))
    img[i].classList.add(i); 
}
    
      const banner = animesd.anime;
      const posterimg = document.querySelector("#hero > div").querySelector("img#banner");
      const pt = document.querySelector("#hero > div").querySelector("div h2");
      const posterdesc = document.querySelector("#hero > div").querySelector("div p");
      let bannerind = 0;
      
      function bannerinc() {
        if (bannerind >= animesd.anime.length) {
          bannerind = 0;
        }
        pt.textContent = banner[bannerind].animeName;
        posterimg.src = banner[bannerind].posterLink;
        posterdesc.textContent = banner[bannerind].desc;
        bannerind++;
      }
      
      function next_banner() {
        bannerinc();
      }
      
      function prev_banner() {
        bannerind--;
        if (bannerind < 0) {
          bannerind = animesd.anime.length - 1;
        }
        bannerinc();
      }  
    bannerinc();
    originalContent = wishlistAnime.innerHTML
    setInterval(bannerinc, 3500);
  } catch (error) {
    console.error('Error fetching API data:', error);
  }
}

initializePage();
wishlistAnime = document.getElementById("main-content");
    let wishChecked = true;
    let arr = [];
    const wishList = document.getElementById("wishlist");
    
    function generateCardTemplate(anime) {
      return `
        <article class="postcard dark yellow">
          <a class="postcard__img_link" href="#">
            <img class="postcard__img" src="${anime[1]}" alt="Image Title" />
          </a>
          <div class="postcard__text">
            <h1 class="postcard__title yellow"><a href="#">${anime[0]}</a></h1>
            <div class="postcard__bar"></div>
            <div class="postcard__preview-txt">${anime[2]}</div>
            <ul class="postcard__tagbox">
              <li class="tag__item play yellow">
                <a href="#"><i class="fas fa-play mr-2"></i>Play Episode</a>
              </li>
            </ul>
          </div>
        </article>
      `;
    }
    
    
    function toggleWishlist() {
      if (wishChecked) {
        wishlistAnime.innerHTML = arr.map(generateCardTemplate).join('');
        wishlistAnime.classList.add("animeCards");
      } else {
        wishlistAnime.innerHTML = originalContent;
        wishlistAnime.classList.remove("animeCards");
      }
      wishChecked = !wishChecked;
      next_banner();
    }
    
    function favorite(anime) {
      anime.classList.replace("fa-regular", "fa-solid");
      const parentDiv = anime.parentNode;
      const prevImg = parentDiv.previousElementSibling;
    
      // Check if prevImg has valid classes for indexing
      const classListArray = Array.from(prevImg.classList);
      if (classListArray.length === 0) {
        console.error('Invalid class list for indexing:', prevImg);
        return;
      }
    
      // Use the last class as an example, you may adjust it based on your actual class naming
      const lastClass = classListArray[classListArray.length - 1];
      const index = parseInt(lastClass, 10);
    
      // Check if index is a valid number
      if (isNaN(index) || index < 0 || index >= animesd.anime.length) {
        console.error('Invalid index:', index);
        return;
      }
    
      const favName = animesd.anime[index].animeName;
      const favPoster = animesd.anime[index].posterLink;
      const favDesc = animesd.anime[index].desc;
      const favwatchlink = animesd.anime + ' ' + index;
      const favAnime = [favName, favPoster, favDesc, favwatchlink];
    
      const indexToRemove = arr.findIndex(item => item[0] === favName);
    
      if (indexToRemove === -1) {
        arr.push(favAnime);
      } else {
        arr.splice(indexToRemove, 1);
      }
    
      console.log('Updated arr:', arr);
    }
    

    function watchthis(animetowatch) {
      const infoIcon = animetowatch.previousElementSibling.querySelector(".fa-circle-info");
      if (infoIcon) {
        const animeId = infoIcon.classList[3];
        const newURL = window.location.href.replace("index.html", `m.html?id=${animeId}`);
        window.location.href = newURL;
      }
    }


        
    
    function info(anime) {
      let clases= anime.classList;
     
      let animes = clases[3];
     
       let currentURL = window.location.href;
       if(!currentURL.includes("index.html")){
    let newURL =   currentURL.concat(`animeDetails.html?id=${animes}`)
    window.location.href = newURL;
       }else{
       let newURL = currentURL.replace("index.html", `animeDetails.html?id=${animes}`);
     
       window.location.href = newURL;
     }
    }
     let wishlistButton = document.querySelector("#wishlist")

     let s = document.querySelector("#input-btn");
     s.addEventListener("click", () => {
       let input = document.querySelector("body > header > div > div > input[type=text]");
       if (input.style.visibility == "visible") {
         input.style.visibility = "hidden";
         input.style.animationName = "slide-end";
       } else {
         input.style.visibility = "visible";
         input.style.animationName = "slide-start";
       }
      //  let search = document.querySelector("body > header > div > div > input[type=text]");
      //  search.style.display = search.style.display === "none" ? "block" : "none";
      //  let favicon = document.querySelector(".fa-heart");
      //  favicon.style.display = favicon.style.display === "block" ? "none" : "block";
     });
     
     
     function handleIconClick(clickedIcon) {
         var box = clickedIcon.parentElement;
       
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
     function ham() {
      let sidenav = document.querySelector(".side");
      sidenav.style.display = sidenav.style.display === "none" ? "block" : "none";
    }
    
     const flexItem = document.querySelector('.slides');

  // Get the computed style
  const computedStyle = window.getComputedStyle(flexItem);

  // Log the flex property
  console.log('Flex Property:', computedStyle.flex);