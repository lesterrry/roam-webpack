import $ from 'jquery';

// const SEARCHABLE = {
//     ''
// };

$(() => {
    let $searchButton = $('header > div');

    if (!$searchButton.length) return;

    $('body').append(
        `<div id="search" class="overlay dimming search">
        <div>
        <input class="pill border medium white" type="text" placeholder="Поиск" autofocus>
        <div class="pill medium">
        <a>Прикол номер один</a>
        <a>Прикол номер два</a>
        </div>
        </div>
        </div>`
    );

    const $overlay = $('.overlay#search');
    const $input = $('.overlay#search input');

    console.log($overlay)
    
    $searchButton.on('click', (e) => {
        $overlay.css('display', 'block');
        $input.focus();
    });
    
    $overlay.on('click', (e) => {
        e.target === e.currentTarget && $overlay.removeAttr('style');
    });
})
