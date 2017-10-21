
var productCount = 0;
var providersList = '', offersTypesList = '', timeFramesList = '';

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
        $("#submitButton").attr('disabled', true);
        if ($.trim($("#userNameTxt").val()) != '' && $("#userNameTxt").val() != null) {
            if ($.trim($("#passwordTxt").val()) != '' && $("#passwordTxt").val() != null) {
                AjaxCall("../Pages/Login.aspx?username=" + $("#userNameTxt").val() + "&password=" + $("#passwordTxt").val() + "&fnID=1"
                    , function (data) {
                            
                        eval(data);
                    });
            } else {
                $("#submitButton").attr('disabled', false);
                alert("Password field is required");
            }
        }
        else
        {
            $("#submitButton").attr('disabled', false);
            alert("Username field is required");
        }
        HideMyLoginSpinner();
        return false;
    });
});
 
function logOut()
{
    AjaxCall("../Pages/Login.aspx?fnID=3"
            , function (data) {
                window.location = '/Pages/Login.aspx';
            });
}

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


function AddMoreProduct()
{
    var template = '<div class="panel panel-widget forms-panel" id="product_' + productCount  + '"> <div class="forms"> <div class="form-grids widget-shadow" data-example-id="basic-forms"> <div class="form-title"> <h4>Product Details :</h4> <ul class="panel-tools"> <li><a class="icon minimise-tool"><i class="fa fa-minus"></i></a></li><li><a class="icon closed-tool"><i class="fa fa-times"></i></a></li></ul> </div><div class="form-body"> <form> <div class="form-group"> <label for="productNameEn">Name EN</label> <input type="text" class="form-control" id="productNameEn" onkeydown="$(this).parents(\'.forms\').find(\'h4\').text($(this).parents(\'.forms\').find(\'h4\').text() +  $(this).val());" placeholder="Product Name En"> </div><div class="form-group"> <label for="productNameAr">Name AR</label> <input type="text" class="form-control" id="productNameAr" placeholder="Product Name Ar"> </div><div class="form-group"> <label for="categoryDD">Category</label> <select name="selector1" id="categoryDD" class="form-control1"> <option>Category 1</option> <option>Category 2</option> <option>Category 3</option> <option>Category 4</option> </select> </div><div class="form-group"> <label for="productTypeDD">Type</label> <select name="selector1" id="productTypeDD" class="form-control1"> <option>Type 1</option> <option>Type 2</option> <option>Type 3</option> <option>Type 4</option> </select> </div><div class="form-group"> <label for="providerDD">Provider</label> <select name="selector1" id="providerDD" class="form-control1"> <option>Provider 1</option> <option>Provider 2</option> <option>Provider 3</option> <option>Provider 4</option> </select> </div><div class="form-group"> <label for="productImageFile">Image</label> <input type="file" id="productImageFile"> <p class="help-block">Upload Product Image - Available Formats : pdf/png/jpg</p></div><div class="form-group"> <label for="productSpecs">Product Specs</label> <input type="text" class="form-control" id="productSpecs" placeholder="Product Specs"> </div></form> </div></div></div></div>';
    $(".grids").append(template);
    $("#product_" + productCount + " .panel-tools .minimise-tool").click(function (event) {
        $(this).parents(".forms").find(".form-body").slideToggle(100);

        return false;
    });
    $("#product_" + productCount + " .panel-tools .closed-tool").click(function (event) {
        $(this).parents(".panel").fadeToggle(400).remove();

        return false;
    });
    productCount++;
}

function loadAddFlyerData()
{
    AjaxCall("../Pages/AddNewFlyer.aspx?fnID=6"
        , function (data) {
            providersList = '';
            offersTypesList = '';
            timeFramesList = '';
            eval(data);
            console.log(data);
            if (providersList != '') {
                displayProvidersData(providersList);
            }
            if (offersTypesList != '') {
                displayOffersTypesData(offersTypesList);
            }
            if (timeFramesList != '') {
                displayTimeFramesData(timeFramesList);
            }
        });
}

function loadProvidersData()
{
    AjaxCall("../Pages/AddNewFlyer.aspx?fnID=3"
        , function (data) {
            providersList = '';
            eval(data);
            if (providersList != '') {

            }
        });
}

function loadOffersTypesData() {
    AjaxCall("../Pages/AddNewFlyer.aspx?fnID=4"
        , function (data) {
            offersTypesList = '';
            eval(data);
            if (offersTypesList != '') {

            }
        });
}

function loadTimeFramesData() {
    AjaxCall("../Pages/AddNewFlyer.aspx?fnID=5"
        , function (data) {
            timeFramesList = '';
            eval(data);
            if (timeFramesList != '') {

            }
        });
}

function displayProvidersData(list)
{
    var template = '<option value="#ID#">#DETAILS#</option>';
    for(var i = 0 ; i < list.length ; i++)
    {
        var temp = template;
        temp = temp.replace("#ID#", list[i].PROVIDER_ID);
        temp = temp.replace("#DETAILS#", list[i].PROVIDER_NAME_EN + " - " + list[i].PROVIDER_BUSINESS_AREA
                                + " - " + list[i].LOCATION_CITY + " - " + list[i].LOCATION_DISTRICT);
        $("#providerDD").append(temp);
    }
}
function displayOffersTypesData(list) {
    var template = '<option value="#ID#">#DETAILS#</option>';
    for (var i = 0 ; i < list.length ; i++) {
        var temp = template;
        temp = temp.replace("#ID#", list[i].OFFER_TYPE_ID);
        temp = temp.replace("#DETAILS#", list[i].OFFER_TYPE_NAME_EN + " - " + list[i].OFFER_TYPE_VALUE);
        $("#offerTypeDD").append(temp);
    }
}
function displayTimeFramesData(list) {
    var template = '<option value="#ID#">#DETAILS#</option>';
    for (var i = 0 ; i < list.length ; i++) {
        var temp = template;
        temp = temp.replace("#ID#", list[i].FRAME_TYPE_ID);
        temp = temp.replace("#DETAILS#", list[i].FRAME_TYPE_NAME_EN );
        $("#timeFrameDD").append(temp);
    }
}

function submitFlyerForm() {
    var fd = new FormData();
    var file = document.getElementById('flyerImageFile');
    if (file.files.length != 0) {
        var filetype = file.files[0].type;
        if (filetype.indexOf("image") != -1) {
            for (var i = 0; i < file.files.length; i++) {
                fd.append('_file', file.files[i]);
            }

            fd.append('flyerNameAr', $("#flyerNameAr").val());
            fd.append('flyerNameEn', $("#flyerNameEn").val());
            fd.append('providerDD', $("#providerDD").val());
            fd.append('offerTypeDD', $("#offerTypeDD").val());
            fd.append('timeFrameDD', $("#timeFrameDD").val());
            fd.append('frameNameAr', $("#frameNameAr").val());
            fd.append('frameNameEn', $("#frameNameEn").val());
            fd.append('dateFrom', $("#dateFrom").val());
            fd.append('dateTo', $("#dateTo").val());

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/Pages/AddNewFlyer.aspx?fnID=7", true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                    console.log(xhr.responseBody);
                }
            };
            xhr.send(fd);
        }
    }
    return false;
}