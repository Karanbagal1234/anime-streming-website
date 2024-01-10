const apiUrl = 'https://script.google.com/macros/s/AKfycbwq3H4RkEahfnq3m9RTWnNzs9JheGyDdpNGsMG6hK3OiNfSk05Bv-LiuUar_s5-JNRN/exec';

const postData = {
  action: 'addAnime',
  animeName: 'Dummy Anime',
  desc: 'A dummy anime description.',
  posterLink: 'https://example.com/dummy-poster.jpg',
  type: 'TV',
  studio: 'Dummy Studio',
  genre: 'Action, Comedy',
  scores: '8.5',
  rating: 'PG-13',
  duration: '24 min',
  quality: 'HD',
  status: 'Ongoing'
};

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(postData),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
