(function() {
    "use strict";

    // custom scrollbar

    $("html").niceScroll({styler:"fb",cursorcolor:"#67D3E0", cursorwidth: '6', cursorborderradius: '10px', background: '#FFFFFF', spacebarenabled:false, cursorborder: '0',  zindex: '1000'});

    $(".scrollbar1").niceScroll({styler:"fb",cursorcolor:"#FF9554", cursorwidth: '6', cursorborderradius: '0',autohidemode: 'false', background: '#FFFFFF', spacebarenabled:false, cursorborder: '0'});

	
	
    $(".scrollbar1").getNiceScroll();
    if ($('body').hasClass('scrollbar1-collapsed')) {
        $(".scrollbar1").getNiceScroll().hide();
    }

    if ($.formUtils != null) {
        $.formUtils.addValidator({
            name: 'selected',
            validatorFunction: function (value, $el, config, language, $form) {
                return value != -1;
            },
            errorMessage: 'You have to Select Option from the list',
            errorMessageKey: 'SelectOption'
        });
    }

    // Validate All Forms
    //if ($('form').size() > 0)
    //    $.validate();

    //Add Date Picker For all 
    if (jQuery('.datePicker').size() > 0) {
        for (var i = 0 ; i < jQuery('.datePicker').length ; i++)
            $(jQuery('.datePicker')[i]).datetimepicker();
    }
})(jQuery);

                     
     
  