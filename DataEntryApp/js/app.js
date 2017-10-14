

function AjaxCall(PageURL, CallBackFunc) {
    try {
       // alert(33)
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
                alert("Error >>> " + err);
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
 

function loadAllFlyers()
{
    //alert(12);
    AjaxCall("../Pages/Home.aspx?fnID=2"
            , function (data) {
                var flyerList = '';
                eval(data);
                if (flyerList != '')
                    displayFlyerList(flyerList);
        });
}


function displayFlyerList(flyerList)
{
    ShowMyLoginSpinner();
    console.log(flyerList);
    var template = '<tr> <th scope="row">#NUM#</th> <td>#NAME#</td><td>#IMAGE#</td><td>#STATUS#</td><td>#FROM#</td><td>#TO#</td><td>#VIEW#</td><td>#EDIT#</td></tr>';
    for (var i = 0; i < flyerList.length ; i++)
    {
        var xtemp = template;
        console.log(flyerList[i]);
        xtemp = xtemp.replace('#NUM#', i + 1);
        xtemp = xtemp.replace('#NAME#', flyerList[i].FLYER_NAME_EN);
        xtemp = xtemp.replace('#IMAGE#', flyerList[i].FLYER_IMAGE_URL);
        xtemp = xtemp.replace('#STATUS#', (flyerList[i].FLYER_APPROVED == null) ? "Under Processing" : "Approved");
        xtemp = xtemp.replace('#FROM#', (flyerList[i].FRAME_DATE_FROM).replace("T", " "));
        xtemp = xtemp.replace('#TO#', (flyerList[i].FRAME_DATE_TO).replace("T", " "));
        xtemp = xtemp.replace('#VIEW#', '<div onclick="openFlyerDetails(' + flyerList[i].FLYER_ID + ')"><i class="fa-2x fa fa-search" style="cursor: pointer;color: #67D3E0;"></i></div>');
        xtemp = xtemp.replace('#EDIT#', (flyerList[i].FLYER_APPROVED == null) ? '<div onclick="editFlyerDetails(' + flyerList[i].FLYER_ID + ')"><i class="fa-2x fa fa-pencil-square-o" style="cursor: pointer;"></i></div>' : '<div><i class="fa-2x fa fa-check" style="color: #30BB74;" ></i></div>');

        $("#flyerTBody").append(xtemp);
    }
    HideMyLoginSpinner();
}

function openPageWithPostData(pageURL, dataArr)
{
    var form = "<form id='submittedForm' method='POST' action='" + pageURL + "'>";

    for(var i =0 ; i < dataArr.length ; i++)
    {
        form += "<input name='param"+i+"' value='" + dataArr[i] + "' type='hidden' />";
    }
    form += "</form>";
    $('body').append(form);
    $("#submittedForm").submit();
}

function openFlyerDetails(flyerID)
{
    var arr = new Array();
    arr.push(flyerID);
    openPageWithPostData("/Pages/FlyerDetails.aspx", arr);
}