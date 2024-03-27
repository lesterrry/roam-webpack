import $ from 'jquery';

const $overlay = $('.overlay');
const $overlayTitle = $('.overlay > div > p');
const $overlayArrow = $('.overlay > img');
const $target = $('section#jobs *');

$target.on('click', (e) => {
    let key = e.currentTarget.innerText;

    console.log($overlay, $overlayTitle)

    $overlayTitle.text(key);
    $overlay.css('display', 'block');

    e.stopPropagation();
});

$overlayArrow.on('click', () => {
    $overlay.removeAttr('style');
})
