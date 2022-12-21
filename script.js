const items = [
    {
      title: "GUCCI",
      description: "Парфюмерная вода Flora Gorgeous Gardenia",
      tags: ["30", "50"],
      price: 2500,
      img: "./img/Flora_Gorgeous_Gardenia.jpg",
      rating: 4.4,
    },
    {
      title: "ANTONIO BANDERAS",
      description: "Туалетная вода Her Secret Temptation",
      tags: ["50", "100"],
      price: 900,
      img: "./img/Her_Secret_Temptation.jpg",
      rating: 4.5,
    },
    {
      title: "GUCCI",
      description: "Туалетная вода Flora",
      tags: ["50"],
      price: 3000,
      img: "./img/Flora.jpg",
      rating: 5.0,
    },
    {
      title: "ANTONIO BANDERAS",
      description: "Туалетная вода The Secret Temptation",
      tags: ["50"],
      price: 660,
      img: "./img/The_Secret_Temptation.jpg",
      rating: 3.0,
    },
    {
      title: "CALVIN KLEIN",
      description: "Туалетная вода CK One",
      tags: ["50"],
      price: 400,
      img: "./img/CK_One.jpg",
      rating: 3.5,
    },
    {
      title: "BALENCIAGA",
      description: "Парфюмерная вода Florabotanica",
      tags: ["50"],
      price: 20000,
      img: "./img/Florabotanica.jpg",
      rating: 4.2,
    },
    {
      title: "CALVIN KLEIN",
      description: "Парфюмерная вода Eternity For Women Eau Fresh",
      tags: ["100"],
      price: 700,
      img: "./img/Eternity_For_Women_Eau_Fresh.jpg",
      rating: 4,
    },
    {
      title: "GUCCI",
      description: "Духи Guilty Parfum,",
      tags: ["100","50"],
      price: 5000,
      img: "./img/Guilty_Parfum.jpg",
      rating: 3.5,
    },
  ];
  
const containerItems = document.querySelector('#shop-items');
const nothingFound = document.querySelector('#nothing-found');
const templateCard = document.querySelector('#item-template');

function templateCardAdd(itemShop) {
const {title, description, tags, price, img, rating} = itemShop;

const templateItem = templateCard.content.cloneNode(true);

templateItem.querySelector('h1').textContent = title;
templateItem.querySelector('p').textContent = description;
templateItem.querySelector('.price').textContent = `${price} Руб.`;
templateItem.querySelector('img').src = img;

const tagsHolder = templateItem.querySelector('.tags')

tags.forEach((tag) => {
  const element = document.createElement('span');
  element.textContent = tag;
  element.classList.add('tag');
  tagsHolder.append(element);
});

const ratingHolder = templateItem.querySelector('.rating');

for (let i = 0; i < rating; i++ ) {
  const star = document.createElement('i');
  star.classList.add('fa', 'fa-star');
  ratingHolder.append(star);
}

return itemShop;

}



let currentState = [...items];

function renderItems(arr) {
  nothingFound.textContent = '';
  containerItems.innerHTML = '';
  arr.forEach(item => {
    containerItems.append(templateCardAdd(item))
  });
  if (!arr.length) {
    nothingFound.textContent = 'Ничего не найдено';
  }
}

renderItems(currentState.sort((a,b) => sortByAlphabet(a,b)));

function sortByAlphabet(a,b) {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  } 
    return 0;
}

 const sortControl = document.querySelector('#sort');

 sortControl.addEventListener('change', (event) =>{
  const selectedOption = event.target.value;
  switch (selectedOption) {
    case 'expensive': {
      currentState.sort((a,b) => b.price - a.price);
      break
    }
    case 'cheap': {
      currentState.sort((a,b) => a.price - b.price);
      break
    }
    case 'rating': {
      currentState.sort((a,b) => b.rating - a.price);
      break
    }
    case 'alphabet': {
      currentState.sort((a,b) => sortByAlphabet(a,b));
      break
    }
  }
  renderItems(currentState);
 });

 const searchInput = document.querySelector('#search-input');
 const searchButton = document.querySelector('#search-btn');
 
 function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase;

  currentState = items.filter((el) => 
  el.title.toLowerCase().includes(searchstring)
  );

  currentState.sort((a, b) => sortByAlphabet(a,b)) 
  sortControl.selectedIndex = 0;

  renderItems(currentState);

 }

 searchInput.addEventListener('click', applySearch);
 searchButton.addEventListener('search', applySearch);