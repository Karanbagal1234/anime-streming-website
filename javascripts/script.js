
    let animesd;
    let originalContent ;
    let wishlistAnime;
    let banner;
    let heroDiv = document.querySelector("#hero > div");
    let posterimg = heroDiv.querySelector("img#banner");
    let pt = heroDiv.querySelector("div h2");
    let posterdesc = heroDiv.querySelector("div p");
    let bannerind = 0;

      function wishCheckedd() {
        // Replace "fa-solid" with "fa-regular" for all elements with class "img-icons" at index 1
        document.querySelectorAll("div.img-icons").forEach(element => {
          element.children[1].classList.replace("fa-solid", "fa-regular");
        });
      
        let local = JSON.parse(localStorage.arr);
      
        for (let name of local) {
          for (let name2 of document.querySelectorAll("div.img-icons")) {
            console.log(name," = ",name2querySelector(".fa-circle-info"), name2.querySelector(".fa-circle-info")===name)
            if (name2.querySelector(".fa-circle-info").classList.contains(name)) {
              let iconElement = name2.children[0];
              
              iconElement.classList.remove("fa-regular");
              iconElement.classList.add("fa-solid");
      
              console.log(name2.children[1]);
            }
          }
        }
      }
      
    function bannerinc() {
      if (bannerind >= banner.length) {
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
      console.log(bannerind)

      bannerind = (bannerind - 1 + banner.length) % banner.length;
      console.log(bannerind)
      if(bannerind<=0){
        bannerind=banner.length
      }
      pt.textContent = banner[bannerind].animeName;
      posterimg.src = banner[bannerind].posterLink;
      posterdesc.textContent = banner[bannerind].desc;
    }

  
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
    
 banner = animesd.anime;
 posterimg = document.querySelector("#hero > div").querySelector("img#banner");
 pt = document.querySelector("#hero > div").querySelector("div h2");
 posterdesc = document.querySelector("#hero > div").querySelector("div p");
      
     
      
 
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
    if (localStorage.getItem("arr")) {
      arr = JSON.parse(localStorage.getItem("arr"));
    }
    
    const wishList = document.getElementById("wishlist");
    
    function generateCardTemplate(animes) {
      for (const anime of animesd.anime) {
        if(anime.animeName === animes){
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
function playthis(thi) {
  // Get the text content of the <h2> element in the parent of the triggering element
  let animen = thi.parentElement.querySelector("h2").textContent;

  // Check if animen has a value
  if (animen) {
    try {
      if (window.location.href.includes("index.html")) {
        const newURL = window.location.href.replace("index.html", `m.html?id=${animen}`);
        
        window.location.href = newURL;
      } else {
        const newUrl = window.location.href + `m.html?id=${animen}`;
        window.location.href = newUrl
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
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
      const prevImg = anime.parentNode.previousElementSibling;
    
      // Check if prevImg has valid classes for indexing
      const classListArray = Array.from(prevImg.classList);
      if (classListArray.length === 0) {
        console.error('Invalid class list for indexing:', prevImg);
        return;
      }
    
      // Use the last class as an example, you may adjust it based on your actual class naming
      let index = parseInt(classListArray[classListArray.length - 1], 10);
    
      // Check if index is a valid number
      if (isNaN(index) || index < 0 || index >= animesd.anime.length) {
        console.error('Invalid index:', index);
        return;
      }
    
      const favName = animesd.anime[index].animeName;
    
      // Check if the item already exists in the array
      if (!arr.includes(favName)) {
        arr.push(favName);
        localStorage.setItem("arr", JSON.stringify(arr));
        console.log('Updated arr:', arr);
      } else {
        const updatedArr = arr.filter(item => item !== favName);
        arr = updatedArr;
  localStorage.setItem("arr", JSON.stringify(updatedArr));
  console.log('Removed item from arr:', favName);
      }

    }
    
  
    function watchthis(animetowatch) {
      const infoIcon = animetowatch.previousElementSibling.querySelector(".fa-circle-info");
      if (infoIcon) {
        const animeId = infoIcon.classList[3];
        try {
          // Check if "index.html" is present in the URL
          if (window.location.href.includes("index.html")) {
            const newURL = window.location.href.replace("index.html", `m.html?id=${animeId}`);
            window.location.href = newURL;
          } else {
            const newURL = window.location.href +  `m.html?id=${animeId}`;
            window.location.href = newURL;
          }
        } catch (error) {
          console.error("Error:", error);
        }
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
    
