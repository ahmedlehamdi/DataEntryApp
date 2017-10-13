

function AjaxCall(PageURL, CallBackFunc) {
    try {
        //ShowMyLoginSpinner();
        $.ajax({
            url: PageURL,
            contentType: "application/text; charset=UTF-8",
            success: function (msg) {
                //alert(msg.d);
                //return msg;
                try {
                    CallBackFunc(msg);
                    //disableCheckboxes();
                } catch (e) { }
                //HideMyLoginSpinner();
            },
            error: function (err) {
                //alert("Error >>> " + err);
                //ShowMyLoginSpinner();
            }
        });
    } catch (e) { alert(e); }
}


$(document).ready(function () {
    $.validate({
        lang: 'en'
    });
    $("#submitButton").on('click', function () {
        if ($.trim($("#userNameTxt").val()) != '' && $("#userNameTxt").val() != null) {
            if ($.trim($("#passwordTxt").val()) != '' && $("#passwordTxt").val() != null) {
                AjaxCall("../login.aspx/doLogin?username=" + $("#userNameTxt").val() + "&password=" + $("#passwordTxt").val() + "&fnID=1"
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
        return false;
    });
})
 