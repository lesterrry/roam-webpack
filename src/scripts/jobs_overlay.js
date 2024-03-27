import $ from 'jquery';

const $overlay = $('.overlay#job-details');
const $overlayTitle = $('.overlay#job-details > div > p');
const $overlayArrow = $('.overlay#job-details > img');
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
