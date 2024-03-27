import $ from 'jquery';

$(() => {
    let $searchButton = $('header > div');

    if (!$searchButton.length) return;

    $('body').append(
        `<div id="search" class="overlay dimming search">
        <div>
        <input class="pill border medium white" type="text" placeholder="Поиск" autofocus>
        </div>
        </div>`
    );

    const $overlay = $('.overlay#search');
    const $input = $('.overlay#search input');

    console.log($overlay)
    
    $searchButton.on('click', (e) => {
        console.log('A!')
        $overlay.css('display', 'block');
        $input.focus();
    });
    
    $overlay.on('click', (e) => {
        e.target === e.currentTarget && $overlay.removeAttr('style');
    });
})
