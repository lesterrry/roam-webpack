import $ from 'jquery';

const FILTERABLE = '.filterable > *';

$('.filter').on('click', (event) => {
    const clickedElement = $(event.target);

    if(clickedElement.hasClass('fill')) {
        clickedElement.removeClass('fill');

        $(FILTERABLE).removeAttr('style');
    } else {
        $('.filter').removeClass('fill');
        clickedElement.addClass('fill');

        var id = clickedElement.attr('id');

        if (id === 'all') $(FILTERABLE).removeAttr('style');
        console.log(id)

        var divChildren = $(FILTERABLE);

        divChildren.each((_index, element) => {
            if($(element).hasClass(id)){
                $(element).css('display', 'block');
            }else{
                $(element).css('display', 'none');
            }
        });
    }
});

