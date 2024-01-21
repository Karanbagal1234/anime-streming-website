function detail(){
    const action = 'addAnime';
    const animeName = document.getElementById("animeName").value;
    const desc = document.getElementById("desc").value;
    const posterLink = document.getElementById("posterLink").value;
    const type = document.getElementById("type").value;
    const studio= document.getElementById("studio").value;
    const genre = document.getElementById("genre").value;
    const scores = document.getElementById("scores").value;
    const rating = document.getElementById("rating").value;
    const duration = document.getElementById("duration").value;
    const quality = document.getElementById("quality").value;
    const status = document.getElementById("status").value;
    
const data = {
    action: action,
    animeName: animeName,
    desc: desc,
    posterLink: posterLink,
    type: type,
    studio: studio,
    genre: genre,
    scores: scores,
    rating: rating,
    duration: duration,
    quality: quality,
    status: status
};
console.log(data)
fetch('https://script.google.com/macros/s/AKfycbwq3H4RkEahfnq3m9RTWnNzs9JheGyDdpNGsMG6hK3OiNfSk05Bv-LiuUar_s5-JNRN/exec', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
}