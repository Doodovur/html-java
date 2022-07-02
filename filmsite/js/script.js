/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэд",
        "Хуй жопа",
        "Скотт Пилигрим паывив...",
        "Aкотт"
    ]
};



const adv = document.querySelectorAll('.promo__adv img'),
      bg = document.querySelector('.promo__bg'),
      genre = bg.querySelector('.promo__genre'),
      movieList = document.querySelector('.promo__interactive-list'),
      form = document.querySelector('form.add'),
      btn = form.lastElementChild,
      input = form.querySelector('.adding__input'),
      checkBox = form.querySelector('[type="checkbox"]'),
      deleteElements = document.querySelectorAll('.delete');




form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const newFilm = input.value;
    const favorite = checkBox.checked;

    if (newFilm) {
        if (newFilm.length > 21) `${newFilm.substring(0, 22)}...`;
        movieDB.movies.push(newFilm);  
        const newDb = sortArray(movieDB.movies);
        builder(newDb, movieList);
        favorite ? console.log('Добавляем любимый фильм') : console.log('обычный');
    };

    
    e.target.reset();
} );


const genreSwap = (element) => element.textContent = 'драма';
const changeBg = (element) => element.style.backgroundImage = 'url("img/bg.jpg")';
const sortArray = (myArray) => myArray.map(element => element.toUpperCase()).sort();
const builder = (arrayOfMovies, parent) => {
    parent.innerHTML = ``;
    arrayOfMovies.forEach((element, index) => 
                    movieList.innerHTML += `
                    <li class="promo__interactive-item">${index + 1} ${element}
                        <div class="delete"></div>
                    </li>
                    `);
    document.querySelectorAll('.delete').forEach((element, i) =>{
        element.addEventListener('click', () =>{
            element.parentElement.remove();
            movieDB.movies.splice(i, 1);
            builder(sortArray(movieDB.movies), movieList);
        
        });
    }); 
};
const deleteAdv = (elements) => {
    elements.forEach(element => element.remove());
};



changeBg(bg);
genreSwap(genre);
deleteAdv(adv);
builder(sortArray(movieDB.movies), movieList);