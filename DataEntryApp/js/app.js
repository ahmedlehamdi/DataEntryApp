

function AjaxCall(PageURL, CallBackFunc) {
    try {
        ShowMyLoginSpinner();
        $.ajax({
            url: PageURL,
            contentType: "application/text; charset=UTF-8",
            type: 'POST',
            success: function (msg) {
                //alert(msg.d);
                //return msg;
                try {
                    CallBackFunc(msg);
                    //disableCheckboxes();
                } catch (e) { }
                HideMyLoginSpinner();
            },
            error: function (err) {
                //alert("Error >>> " + err);
                HideMyLoginSpinner();
            }
        });
    } catch (e) { alert(e); }
}

function ShowMyLoginSpinner() {
    $('body').loading({
        overlay: true,
        base: 0.2
    });
}

function HideMyLoginSpinner() {
    $('body').loading('hide');
}


$(document).ready(function () {
    $.validate({
        lang: 'en'
    });
    $("#submitButton").on('click', function () {
        ShowMyLoginSpinner();
        if ($.trim($("#userNameTxt").val()) != '' && $("#userNameTxt").val() != null) {
            if ($.trim($("#passwordTxt").val()) != '' && $("#passwordTxt").val() != null) {
                AjaxCall("../Pages/Login.aspx?username=" + $("#userNameTxt").val() + "&password=" + $("#passwordTxt").val() + "&fnID=1"
                    , function (data) {
                            
                            eval(data);
                    });
            } else {
                alert("Password field is required");
            }
        }
        else
        {
            alert("Username field is required");
        }
        HideMyLoginSpinner();
        return false;
    });
})
 