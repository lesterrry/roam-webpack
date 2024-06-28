import $ from 'jquery';

const SEARCHABLE = {
    'Ереван': ['Направления', '/destinations/yerevan'],
    'Адлер': ['Направления', '/destinations/adler'],
    'Алматы': ['Направления', '/destinations/adler'],
    'Батуми': ['Направления', '/destinations/adler'],
    'Белград': ['Направления', '/destinations/adler'],
    'Витебск': ['Направления', '/destinations/adler'],
    'Горно-алтайск': ['Направления', '/destinations/adler'],
    'Гюмри': ['Направления', '/destinations/adler'],
    'Екатеринбург': ['Направления', '/destinations/adler'],
    'Октобе': ['Направления', '/destinations/adler'],
    'Тула': ['Направления', '/destinations/adler'],
    'Казань': ['Направления', '/destinations/adler'],
    'Калининград': ['Направления', '/destinations/adler'],
    'Кострома': ['Направления', '/destinations/adler'],
    'Москва': ['Направления', '/destinations/adler'],
    'Новосибирск': ['Направления', '/destinations/adler'],
    'Санкт-Петербург': ['Направления', '/destinations/adler'],
    'Севан': ['Направления', '/destinations/adler'],
    'Сочи': ['Направления', '/destinations/adler'],
    'Тбилиси': ['Направления', '/destinations/adler'],
    'Тула': ['Направления', '/destinations/adler'],

    'Предприниматель': ['Работа', '/work#business'],
    'Веб-разработчик': ['Работа', '/work#webdev'],
    'Программист': ['Работа', '/work#dev'],
    'SMM-специалист': ['Работа', '/work#smm'],
    'Дизайнер': ['Работа', '/work#design'],
    'Репетитор': ['Работа', '/work#tutor'],
    'Фотограф': ['Работа', '/work#photo'],
    '3D-дизайнер': ['Работа', '/work#3d'],
    'Видеограф': ['Работа', '/work#video'],
    'Редактор': ['Работа', '/work#edit'],
    'Блоггер': ['Работа', '/work#blog'],
    'Журналист': ['Работа', '/work#journal'],

    'Агротуризм в Подмосковье': ['Материалы', '/materials/agrotourism'],
    'Гайд: работа в Казахстане': ['Материалы', '/materials/kz'],
    'Инта: купить квартиру за 30.000': ['Материалы', '/materials/inta'],
    'Что делать в Екатеринбурге': ['Материалы', '/materials/ekb'],
    'Фриланс и налоги: как не ошибиться': ['Материалы', '/materials/freelance'],
    'Гайд: как заработать в WEB3': ['Материалы', '/materials/web3'],
};

const search = (str) => {
    if (!str) return [];
    const lowerStr = str.toLowerCase();
    return Object.entries(SEARCHABLE).reduce((acc, [key, value]) => {
        if (key.toLowerCase().includes(lowerStr)) {
            acc.push([key, value]);
        }
        return acc;
    }, []);
};

$(() => {
    let $searchButton = $('header > div');

    if (!$searchButton.length) return;

    $('body').append(
        `<div id="search" class="overlay dimming search">
        <div>
            <input class="pill border medium white" type="text" placeholder="Поиск" autofocus>
        <div class="pill medium results">
            <a>Прикол номер один</a>
            <a>Прикол номер два</a>
        </div>
        </div>
        </div>`
    );

    const $overlay = $('.overlay#search');
    const $input = $('.overlay#search input');
    const $results = $('.overlay#search .results');
    
    $searchButton.on('click', (e) => {
        $overlay.css('display', 'block');
        $input.focus();
    });
    
    $overlay.on('click', (e) => {
        e.target === e.currentTarget && $overlay.removeAttr('style');
    });

    $input.on('input', (e) => {
        const res = search(e.target.value);

        res.length == 0 ? $results.removeAttr('style') : $results.css({ 'display': 'flex' })

        $results.html('');

        res.forEach(i => {
            let a = document.createElement('a');
            a.innerHTML = `<span class="secondary">${i[1][0]}/</span> ${i[0]}`;
            a.href = i[1][1];
            $results.append(a);
        });    
    });
})
