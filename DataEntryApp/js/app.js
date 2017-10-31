
var productCount = 0;
var providersList = '', offersTypesList = '', timeFramesList = '', productCategories = '', catTypes = '';
var flyerData = '', flyerProducts = '';
var buttonFlag = false;

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
    $('body').loading('destroy');
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
                        $("#submitButton").attr('disabled', false);
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
    //console.log(flyerList);
    var UType = localStorage.getItem('UType');
    var template = (UType != null && UType == 'entry') ? '<tr> <th scope="row">#NUM#</th> <td>#NAME#</td><td>#IMAGE#</td><td>#STATUS#</td><td>#FROM#</td><td>#TO#</td><td>#VIEW#</td><td>#EDIT#</td></tr>'
                    : '<tr> <th scope="row">#NUM#</th><td>#NAME#</td><td>#IMAGE#</td><td>#STATUS#</td><td>#FROM#</td><td>#TO#</td><td>#VIEW#</td><td>#DELETE#</td></tr>';
    for (var i = 0; i < flyerList.length ; i++)
    {
        var xtemp = template;
        //console.log(flyerList[i]);
        xtemp = xtemp.replace('#NUM#', i + 1);
        xtemp = xtemp.replace('#NAME#', flyerList[i].FLYER_NAME_EN);
        var imagesURLs = flyerList[i].FLYER_IMAGE_URL.split('&&');
        //alert("imagesURLs.length  : " + imagesURLs.length);
        if (imagesURLs.length > 1)
        {
            //alert("URL > 1" + imagesURLs);
            imagesURLs.pop();
            var imageData = '';
            for (var u = 0 ; u < imagesURLs.length; u++)
            {
                imageData += "<a target='_blank' href='" + imagesURLs[u] + "' download='" + imagesURLs[u].split('/')[2] + "'>" + imagesURLs[u].split('/')[2] + "</a><br/>";
            }
            xtemp = xtemp.replace('#IMAGE#', imageData);
        }
        else {
            //alert("URL < 1" + imagesURLs);
            xtemp = xtemp.replace('#IMAGE#', "<a target='_blank' href='" + flyerList[i].FLYER_IMAGE_URL + "' download='" + flyerList[i].FLYER_IMAGE_URL.split('/')[2] + "'>" + flyerList[i].FLYER_IMAGE_URL.split('/')[2] + "</a>");
        }
        
        xtemp = xtemp.replace('#STATUS#', (flyerList[i].FLYER_APPROVED == null) ? "Under Processing" : (flyerList[i].FLYER_APPROVED == true ) ? "Approved" : "Rejected");
        xtemp = xtemp.replace('#FROM#', (flyerList[i].FRAME_DATE_FROM).replace("T", " "));
        xtemp = xtemp.replace('#TO#', (flyerList[i].FRAME_DATE_TO).replace("T", " "));
        xtemp = xtemp.replace('#VIEW#', '<div onclick="openFlyerDetails(' + flyerList[i].FLYER_ID + ')"><i class="fa-2x fa fa-search" style="cursor: pointer;color: #67D3E0;"></i></div>');
        if (UType != null && UType == 'entry')
            xtemp = xtemp.replace('#EDIT#', (flyerList[i].FLYER_APPROVED == null) ? '<div onclick="openEditFlyerDetails(' + flyerList[i].FLYER_ID + ')"><i class="fa-2x fa fa-pencil-square-o" style="cursor: pointer;"></i></div>' : '<div><i class="fa-2x fa fa-check" style="color: #30BB74;" ></i></div>');
        else
            xtemp = xtemp.replace('#DELETE#', '<div data-index="'+ i + '" onclick="loadDeleteFlyerModal(' + flyerList[i].FLYER_ID + ', \'' + i+'\')"><i class="fa-2x fa fa-trash-o" style="cursor: pointer;color:#d9534f;"></i></div>');
        $("#flyerTBody").append(xtemp);
    }
    applyDataTable();    
    HideMyLoginSpinner();
}

function applyDataTable(id) {
    try {
        if (!id) {
            $('#' + id).dataTable({
                paging: false
            });
        }
        else {
            $('.datatable').dataTable({
                paging: false
            });
        }
        $('.dataTables_length select').addClass('form-control');
        $('.dataTables_filter input').addClass('form-control');
    } catch (e) { }
}

function openPageWithPostData(pageURL, dataArr, callback)
{
    var form = "<form id='submittedForm' method='POST' action='" + pageURL + "'>";

    for(var i =0 ; i < dataArr.length ; i++)
    {
        form += "<input name='param"+i+"' value='" + dataArr[i] + "' type='hidden' />";
    }
    form += "</form>";
    $('body').append(form);
    $("#submittedForm").submit();
    if (callback)
        callback();
}

function openFlyerDetails(flyerID)
{
    localStorage.setItem('flyerID', flyerID);
    var UType = localStorage.getItem("UType");
    window.location = (UType == 'entry') ? '/Pages/FlyerDetails.aspx' : '/Pages/FlyerDetails_Admin.aspx';
}

function loadFlyerDetails()
{

    AjaxCall("../Pages/FlyerDetails.aspx?fnID=11&flyerID="+localStorage.getItem('flyerID') 
       , function (data) {
           flyerProducts = '', flyerData = '';
           eval(data);
           if (flyerData != '') {
               $("#flyerNameEN").text(flyerData.FLYER_NAME_EN);
               $("#flyerNameAR").text(flyerData.FLYER_NAME_AR);
               var imageURLs = flyerData.FLYER_IMAGE_URL.split("&&");
               if (imageURLs.length > 1)
               {
                   var parentDiv = $("#flyerImg").parent();
                   $(parentDiv).html('');
                   imageURLs.pop();
                   //alert(imageURLs.length);
                   var template = "<a target='_blank' href='#HREF#' download='#DOWNLOAD#'>#TEXT#</a><br/>";
                   for(var i = 0 ; i < imageURLs.length ; i++)
                   {
                       var temp = template;
                       //alert(imageURLs[i]);
                       temp = temp.replace("#HREF#", imageURLs[i]);
                       temp = temp.replace("#DOWNLOAD#", imageURLs[i].split('/')[2]);
                       temp = temp.replace("#TEXT#", imageURLs[i].split('/')[2]);
                       //alert(temp);
                       $(parentDiv).append(temp);
                   }
               } else {
                   $("#flyerImg").attr('href', flyerData.FLYER_IMAGE_URL);
                   $("#flyerImg").attr('download', flyerData.FLYER_IMAGE_URL.split('/')[2]);
                   $("#flyerImg").text(flyerData.FLYER_IMAGE_URL.split('/')[2]);
               }
               
               $("#flyerProvider").text(flyerData.PROVIDER_NAME_EN);
               $("#flyerOfferType").text(flyerData.OFFER_TYPE_NAME_EN);
               $("#FRAME_NAME_EN").text(flyerData.FLYER_NAME_EN);
               $("#flyerFromDate").text(flyerData.FRAME_DATE_FROM);
               $("#flyerToDate").text(flyerData.FRAME_DATE_TO);
               flyerData = '';
           }
           if (flyerProducts != '') {
               var template = '<tr> <td>#ID#</td><td>#ProductName#</td><td>#Category#</td><td>#Type#</td><td>#Provider#</td><td>#Image#</td><td>#Specs#</td></tr>';
               for (var i = 0 ; i < flyerProducts.length ; i++) {
                   var temp = template;
                   temp = temp.replace("#ID#", i);
                   temp = temp.replace("#ProductName#", flyerProducts[i].PRODUCT_NAME_EN);
                   temp = temp.replace("#Category#", flyerProducts[i].CATEGORY_NAME_EN);
                   temp = temp.replace("#Type#", flyerProducts[i].TYPE_NAME_EN);
                   temp = temp.replace("#Provider#", flyerProducts[i].PROVIDER_NAME_EN);
                   temp = temp.replace("#Image#", "<a target='_blank' href='" + flyerProducts[i].PRODUCT_IMAGE + "' download='" + flyerProducts[i].PRODUCT_IMAGE.split('/')[2] + "' > " + flyerProducts[i].PRODUCT_IMAGE.split('/')[2] + "</a>");
                   var specs = (flyerProducts[i].SPECS_ATTR_1 != '' && flyerProducts[i].SPECS_ATTR_1 != null) ? ("- " + flyerProducts[i].SPECS_ATTR_1) : ("");
                   specs += (flyerProducts[i].SPECS_ATTR_2 != '' && flyerProducts[i].SPECS_ATTR_1 != null) ? ("<br/> - " + flyerProducts[i].SPECS_ATTR_2) : ("");
                   specs += (flyerProducts[i].SPECS_ATTR_3 != '' && flyerProducts[i].SPECS_ATTR_1 != null) ? ("<br/> - " + flyerProducts[i].SPECS_ATTR_3) : ("");
                   specs += (flyerProducts[i].SPECS_ATTR_4 != '' && flyerProducts[i].SPECS_ATTR_1 != null) ? ("<br/> - " + flyerProducts[i].SPECS_ATTR_4) : ("");
                   specs += (flyerProducts[i].SPECS_ATTR_5 != '' && flyerProducts[i].SPECS_ATTR_1 != null) ? ("<br/> - " + flyerProducts[i].SPECS_ATTR_5) : ("");
                   temp = temp.replace("#Specs#", specs);
                   $("#productTBody").append(temp);
               }
               applyDataTable();
           }
           try {
               if (!buttonFlag)
               { $("#approvBtnGroup").remove(); }
               else {
                  
               }
           } catch (e) { }
           localStorage.removeItem('flyerID'); 
       });
   
}

function AddMoreProduct()
{
    var template = '<div class="panel panel-widget forms-panel" id="product_' + productCount + '"> <div class="forms"> <div class="form-grids widget-shadow" data-example-id="basic-forms"> <div class="form-title"> <h4>Product Details :</h4> <ul class="panel-tools"> <li><a class="icon minimise-tool"><i class="fa fa-minus"></i></a></li><li><a class="icon closed-tool"><i class="fa fa-times"></i></a></li></ul> </div><div class="form-body"> <form> <div class="form-group"> <label for="productNameEn">Name EN</label> <input required="required" type="text" class="form-control" id="productNameEn" placeholder="Product Name En" onkeydown="$(this).parents(\'.forms\').find(\'h4\').text(\'Product Details : \' + $(this).val());"> </div><div class="form-group"> <label for="productNameAr">Name AR</label> <input required="required" type="text" class="form-control" id="productNameAr" placeholder="Product Name Ar"> </div><div class="form-group"> <label for="categoryDD">Category</label> <select name="categoryDD" id="categoryDD" class="form-control1" required="required"> <option value="-1">Select Product Category</option> </select> </div><div class="form-group"> <label for="productTypeDD">Type</label> <select name="productTypeDD" id="productTypeDD" class="form-control1" required="required"> <option value="-1">Select Category Type</option> </select> </div><div class="form-group"> <label for="providerDD">Provider</label> <select name="providerDD" id="providerDD" class="form-control1" required="required"> <option value="-1">Select Product Provider</option> </select> </div><div class="form-group"> <label for="productImageFile">Image</label> <input type="file" id="productImageFile" name="productImageFile" required="required"> <p class="help-block">Upload Product Image - Available Formats : pdf/png/jpg</p></div><div class="form-group"> <label for="productSpecs_1">Product Specs 1</label> <input type="text" class="form-control" id="productSpecs_1" placeholder="Product Specs"> </div><div class="form-group"> <label for="productSpecs_2">Product Specs 2</label> <input type="text" class="form-control" id="productSpecs_2" placeholder="Product Specs"> </div><div class="form-group"> <label for="productSpecs_3">Product Specs 3</label> <input type="text" class="form-control" id="productSpecs_3" placeholder="Product Specs"> </div><div class="form-group"> <label for="productSpecs_4">Product Specs 4</label> <input type="text" class="form-control" id="productSpecs_4" placeholder="Product Specs"> </div><div class="form-group"> <label for="productSpecs_5">Product Specs 5</label> <input type="text" class="form-control" id="productSpecs_5" placeholder="Product Specs"> </div></form> </div></div></div></div>';
    $(".products").append(template);
    $("#product_" + productCount + " .panel-tools .minimise-tool").click(function (event) {
        $(this).parents(".forms").find(".form-body").slideToggle(100);

        return false;
    });
    $("#product_" + productCount + " .panel-tools .closed-tool").click(function (event) {
        $(this).parents(".panel").fadeToggle(400).remove();
        if (productCount > 0) productCount--;
       // alert("In App.js : " + productCount);
        return false;
    });
    loadProductCategoriesData();
    setTimeout(function () {
        loadProvidersData();
    }, 500);
    
}

function loadAddFlyerData()
{
    AjaxCall("../Pages/AddNewFlyer.aspx?fnID=6"
        , function (data) {
            providersList = '';
            offersTypesList = '';
            timeFramesList = '';
            eval(data);
            //console.log(data);
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
                displayProvidersData(providersList)
            }
        });
}

function loadOffersTypesData() {
    AjaxCall("../Pages/AddNewFlyer.aspx?fnID=4"
        , function (data) {
            offersTypesList = '';
            eval(data);
            if (offersTypesList != '') {
                displayOffersTypesData(offersTypesList);
            }
        });
}

function loadTimeFramesData() {
    AjaxCall("../Pages/AddNewFlyer.aspx?fnID=5"
        , function (data) {
            timeFramesList = '';
            eval(data);
            if (timeFramesList != '') {
                displayTimeFramesData(timeFramesList);
            }
        });
}

function displayProvidersData(list)
{
    //alert("loadProviders : " + (productCount - 1));
    var template = '<option value="#ID#">#DETAILS#</option>';
    for(var i = 0 ; i < list.length ; i++)
    {
        var temp = template;
        temp = temp.replace("#ID#", list[i].PROVIDER_ID);
        temp = temp.replace("#DETAILS#", list[i].PROVIDER_NAME_EN + " - " + list[i].PROVIDER_BUSINESS_AREA
                                + " - " + list[i].LOCATION_CITY + " - " + list[i].LOCATION_DISTRICT);
        if ($("#product_" + (productCount - 1) + " #providerDD").size() == 0)
            $("#providerDD").append(temp);
        else
            $("#product_" + (productCount - 1) + " #providerDD").append(temp);
    }

    if($("#providerDD").attr("data-old") && $("#providerDD").attr("data-old") != null)
    {
        $("#providerDD").val($("#providerDD").attr("data-old"));
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
    if ($("#offerTypeDD").attr("data-old") && $("#offerTypeDD").attr("data-old") != null) {
        $("#offerTypeDD").val($("#offerTypeDD").attr("data-old"));
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
    if ($("#timeFrameDD").attr("data-old") && $("#timeFrameDD").attr("data-old") != null) {
        $("#timeFrameDD").val($("#timeFrameDD").attr("data-old"));
    }
}

function validateForm(formID) {
    if (!formID) {
        var forms = $('body form');
        for(var u = 0 ; u < forms.size() ; u++)
        {
            var inputs = $(forms[u]).find("input,select");
            for (var i = 0 ; i < inputs.size() ; i++) {
                if ($(inputs[i]).attr('required') == 'required' || $(inputs[i]).attr('required') == '') {
                    if ($(inputs[i]).val().trim() == '') {
                        $(inputs[i]).css('border', '1px solid red');
                        return false;
                    } else {
                        $(inputs[i]).css('border', '');
                    }
                    if ($(inputs[i]).val() == '-1') {
                        $(inputs[i]).css('border', '1px solid red');
                        return false;
                    } else {
                        $(inputs[i]).css('border', '');
                    }
                }
            }
            return true;
        }
    }
    else {
        var inputs = $("#" + formID + " input, #" + formID + " select");
        for (var i = 0 ; i < inputs.size() ; i++) {
            if ($(inputs[i]).attr('required') == 'required' || $(inputs[i]).attr('required') == '') {
                if ($(inputs[i]).val().trim() == '') {
                    $(inputs[i]).css('border', '1px solid red');
                    return false;
                } else { $(inputs[i]).css('border', ''); }
                if ($(inputs[i]).val() == '-1') {
                    $(inputs[i]).css('border', '1px solid red');
                    return false;
                } else { $(inputs[i]).css('border', ''); }
            }
        }
        return true;
    }
}

function submitFlyerForm(action) {
    if (!validateForm("flyerDataForm")) {
        alert("Please review the highlighted fields");
        return false;
    }
    ShowMyLoginSpinner();
    var fd = new FormData();
    var file = document.getElementById('flyerImageFile');
    if (file.files.length != 0) {
        var filetype = file.files[0].type;
        //console.log(file.files[0].type);    
        if (filetype.indexOf("image") != -1 || filetype.indexOf("pdf") != -1) {
            for (var i = 0; i < file.files.length; i++) {
                fd.append('_file_' + i, file.files[i]);
            }
            fd.append('files_count', i);
        }
    }
    else if (action == 'edit')
    {
        var oldImages = $("#previousIMGS a");
        var oldURLS = '';
        for (var o = 0 ; o < oldImages.length; o++)
        {
            oldURLS += $(oldImages[o]).attr('href')+"&&";
        }
        fd.append('oldImage', oldURLS);
    }
    //alert(action);
    fd.append('flyerNameAr', $("#flyerNameAr").val());
    fd.append('flyerNameEn', $("#flyerNameEn").val());
    fd.append('providerDD', $("#providerDD").val());
    fd.append('offerTypeDD', $("#offerTypeDD").val());
    fd.append('timeFrameDD', $("#timeFrameDD").val());
    fd.append('frameNameAr', $("#frameNameAr").val());
    fd.append('frameNameEn', $("#frameNameEn").val());
    fd.append('dateFrom', $("#dateFrom").val());
    fd.append('dateTo', $("#dateTo").val());

    fd.append('flyerID', $("#flyerNameAr").attr('data-old'));
    fd.append('frameID', $("#timeFrameDD").attr('data-id'));

    (action == 'edit') ? fd.append('action', "update") : fd.append('action', "insert");
            
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/Pages/AddNewFlyer.aspx?fnID=7", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //window.location = "/Pages/AddNewFlyer_Step2.aspx";
        }
        else if(xhr.readyState == 3)
        {
            eval(xhr.responseText);
        }
        HideMyLoginSpinner();
    };
    xhr.send(fd);
    return false;
}


function loadProductCategoriesData() {
    AjaxCall("../Pages/AddNewFlyer_Step2.aspx?fnID=8"
        , function (data) {
            productCategories = '';
            eval(data);
            if (productCategories != '') {
                //alert("loadCategory : " + productCount);
                var template = '<option value="#ID#">#DETAILS#</option>';
                for (var i = 0 ; i < productCategories.length ; i++) {
                    var temp = template;
                    temp = temp.replace("#ID#", productCategories[i].CATEGORY_ID);
                    temp = temp.replace("#DETAILS#", productCategories[i].CATEGORY_NAME_EN + " - " + productCategories[i].CATEGORY_SPECS);
                    $("#product_" + productCount + " #categoryDD").append(temp);
                }
                $("#product_" + productCount + " #categoryDD").on('change', function () {
                    if ($(this).val() != '-1') {
                        loadCategoriesTypesData($(this).val(), $(this));
                    }
                    else {
                        alert('Please Select Category');
                    }
                });
                productCount++;
            }
        });
}

function loadCategoriesTypesData(catID, obj) {
    AjaxCall("../Pages/AddNewFlyer_Step2.aspx?fnID=9&catID=" + catID
        , function (data) {
            catTypes = '';
            //alert("loadTypes : " + productCount);
            $("#product_" + (productCount - 1) + " #productTypeDD").html('<option value="-1">Select Category Type</option>');
            eval(data);
            if (catTypes != '') {
                var template = '<option value="#ID#">#DETAILS#</option>';
                //console.log($(obj).parent().parent().find("#productTypeDD"));
                //console.log((productCount-1));
                for (var i = 0 ; i < catTypes.length ; i++) {
                    var temp = template;
                    temp = temp.replace("#ID#", catTypes[i].TYPE_ID);
                    temp = temp.replace("#DETAILS#", catTypes[i].TYPE_NAME_EN + " - " + catTypes[i].TYPE_SPECS);
                    $(obj).parent().parent().find("#productTypeDD").append(temp);
                    //console.log($(obj).parent().parent().find("#productTypeDD").size());
                }
                //console.log((productCount - 1));
            }
        });
}


function SubmitFlyerProducts()
{
    if (!validateForm(false)) return false;
    ShowMyLoginSpinner();
    var flyerID = localStorage.getItem('flyerID');
    localStorage.removeItem('flyerID');
    var fdArr = new Array();
    var fd = new FormData();
    for (var i = 0 ; i < $("[id*='product_']").size() ; i++)
    {
        var productID = $($("[id*='product_']")[i]).attr("id");
        fdArr.push(createProductObject(productID, i, fd));
    }
    fd.append('fnID', '10');
    fd.append('productCount', $("[id*='product_']").size());
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/Pages/AddNewFlyer_Step2.aspx", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 3) {
            eval(xhr.responseText);
        }
        HideMyLoginSpinner();
    };
    xhr.send(fd);
}


function createProductObject(proID, index, fd)
{
    var flyerID = localStorage.getItem("flyerID");
    if (flyerID != null)
        fd.append("flyerID", flyerID);
    var file = GetElementInsideContainer(proID, "productImageFile");
    //console.log(file.files);
    //console.log((file.files != null));
    if (file.files != null && file.files.length != 0) {
        var filetype = file.files[0].type;
        if (filetype.indexOf("image") != -1 || filetype.indexOf("pdf") != -1) 
        {
            for (var i = 0; i < file.files.length; i++) {
                fd.append('_file_' + index , file.files[i]);
            }
        }
    }
    else if ($(file).attr("href") != '')
    {
        fd.append('_imgFile_' + index, $(file).attr("href"));
    }
    fd.append('productNameEn_' + index, $("#" + proID + " #productNameEn").val());
    fd.append('productNameAr_' + index, $("#" + proID + " #productNameAr").val());
    fd.append('categoryDD_' + index, $("#" + proID + " #categoryDD").val());
    fd.append('productTypeDD_' + index, $("#" + proID + " #productTypeDD").val());
    fd.append('providerDD_' + index, $("#" + proID + " #providerDD").val());
    fd.append('productSpecs_1_' + index, $("#" + proID + " #productSpecs_1").val());
    fd.append('productSpecs_2_' + index, $("#" + proID + " #productSpecs_2").val());
    fd.append('productSpecs_3_' + index, $("#" + proID + " #productSpecs_3").val());
    fd.append('productSpecs_4_' + index, $("#" + proID + " #productSpecs_4").val());
    fd.append('productSpecs_5_' + index, $("#" + proID + " #productSpecs_5").val());
    return fd;
}

function GetElementInsideContainer(containerID, childID) {
    var elm = {};
    var elms = document.getElementById(containerID).getElementsByTagName("*");
    for (var i = 0; i < elms.length; i++) {
        if (elms[i].id === childID) {
            elm = elms[i];
            break;
        }
    }
    return elm;
}

function openEditFlyerDetails(flyerID)
{
    localStorage.setItem("flyerID", flyerID);
    window.location = '/Pages/EditFlyerDetails.aspx';
}

function loadFlyerDetailsForEdit() {
    
    AjaxCall("../Pages/EditFlyerDetails.aspx?fnID=12&flyerID=" + localStorage.getItem("flyerID")
       , function (data) {
           flyerData = '';
           eval(data);
           if (flyerData != '') {
               $("#flyerNameEn").val(flyerData.FLYER_NAME_EN);
               $("#flyerNameAr").val(flyerData.FLYER_NAME_AR);
               $("#flyerNameAr").attr('data-old', flyerData.FLYER_ID);
               var imageURLs = flyerData.FLYER_IMAGE_URL.split("&&");
               if (imageURLs.length > 1) {
                   var parentDiv = $("#oldImage").parent();
                   $(parentDiv).html('');
                   imageURLs.pop();
                   //alert(imageURLs.length);
                   var template = "<a target='_blank' href='#HREF#' download='#DOWNLOAD#'>#TEXT#</a><br/>";
                   for (var i = 0 ; i < imageURLs.length ; i++) {
                       var temp = template;
                       //alert(imageURLs[i]);
                       temp = temp.replace("#HREF#", imageURLs[i]);
                       temp = temp.replace("#DOWNLOAD#", imageURLs[i].split('/')[2]);
                       temp = temp.replace("#TEXT#", imageURLs[i].split('/')[2]);
                       //alert(temp);
                       $(parentDiv).append(temp);
                   }
               } else {
                   $("#oldImage").attr('href', flyerData.FLYER_IMAGE_URL);
                   $("#oldImage").attr('download', flyerData.FLYER_IMAGE_URL.split('/')[2]);
                   $("#oldImage").text(flyerData.FLYER_IMAGE_URL.split('/')[2]);
               }
               
               $("#providerDD").attr('data-old', flyerData.PROVIDER_ID);
               $("#offerTypeDD").attr('data-old', flyerData.OFFER_TYPE_ID);
               $("#timeFrameDD").attr('data-old', flyerData.FRAME_TYPE_ID);
               //alert(flyerData.FRAME_ID);
               $("#timeFrameDD").attr('data-id', flyerData.FRAME_ID);
               $("#frameNameAr").val(flyerData.FRAME_NAME_EN);
               $("#frameNameEn").val(flyerData.FRAME_NAME_AR);
               $("#dateFrom").val(flyerData.FRAME_DATE_FROM.replace('T', ' '));
               $("#dateTo").val(flyerData.FRAME_DATE_TO.replace('T', ' '));
               flyerData = '';
               loadProvidersData();
               loadOffersTypesData();
               loadTimeFramesData();
           }
           localStorage.removeItem("flyerID");
       });
}

function openEditProductsDetails()
{
    localStorage.setItem("flyerID", $("#flyerNameAr").attr('data-old'));
    window.location = '/Pages/EditFlyerDetails_Step2.aspx';
}


function loadFlyerProductsForEdit()
{
    AjaxCall("../Pages/EditFlyerDetails_Step2.aspx?fnID=13&flyerID=" + localStorage.getItem('flyerID')
       , function (data) {
           flyerProducts = '';
           eval(data);
           if (flyerProducts != '') {
               var template = '<div class="panel panel-widget forms-panel" id="product_#COUNT#"> <div class="forms"> <div class="form-grids widget-shadow" data-example-id="basic-forms"> <div class="form-title"> <h4>Product Details :</h4> <ul class="panel-tools"> <li><a class="icon minimise-tool"><i class="fa fa-minus"></i></a></li><li><a class="icon closed-tool"><i class="fa fa-times"></i></a></li></ul> </div><div class="form-body"> <form> <div class="form-group"><label for="productNameEn">Product Name EN</label><input required="required" type="text" disabled="disabled" class="form-control" id="productNameEn" value="#PRODUCT_NAME_EN#" ></div><div class="form-group"><label for="productNameAr">Product Name Ar</label><input required="required" type="text" disabled="disabled" class="form-control" id="productNameAr" value="#PRODUCT_NAME_AR#"></div><div class="form-group"> <label for="categoryDD">Category</label> <select name="categoryDD" id="categoryDD" class="form-control1" disabled="disabled"> <option value="#CAT_ID#">#CAT_NAME#</option> </select> </div><div class="form-group"> <label for="productTypeDD">Type</label> <select name="productTypeDD" id="productTypeDD" class="form-control1" disabled="disabled"> <option value="#TYPE_ID#">#TYPE_NAME#</option> </select> </div><div class="form-group"> <label for="providerDD">Provider</label> <select name="providerDD" id="providerDD" class="form-control1" disabled="disabled"> <option value="#PROVIDER_ID#">#PROVIDER_NAME#</option> </select> </div><div class="form-group"><label for="productImageFile">Image</label><a href="#IMG_URL#" id="productImageFile" download="#IMAGE#" name="productImageFile">#IMAGE#</a></div><div class="form-group"><label for="productSpecs_1">Product Specs 1</label><input type="text" disabled="disabled" class="form-control" id="productSpecs_1" value="#SPECS_1#"></div><div class="form-group"><label for="productSpecs_2">Product Specs 2</label><input type="text" disabled="disabled" class="form-control" id="productSpecs_2" value="#SPECS_2#"></div><div class="form-group"><label for="productSpecs_3">Product Specs 3</label><input type="text" disabled="disabled" class="form-control" id="productSpecs_3" value="#SPECS_3#"></div><div class="form-group"><label for="productSpecs_4">Product Specs 4</label><input type="text" disabled="disabled" class="form-control" id="productSpecs_4" value="#SPECS_4#"></div><div class="form-group"><label for="productSpecs_5">Product Specs 5</label><input type="text" disabled="disabled" class="form-control" id="productSpecs_5" value="#SPECS_5#"></div></form> </div></div></div></div>';
               for (var i = 0 ; i < flyerProducts.length ; i++)
               {
                    var temp = template;
                        temp = temp.replace("#COUNT#", i);

                        temp = temp.replace("#PRODUCT_NAME_EN#", flyerProducts[i].PRODUCT_NAME_EN);
                        temp = temp.replace("#PRODUCT_NAME_AR#", flyerProducts[i].PRODUCT_NAME_AR);

                        temp = temp.replace("#CAT_ID#", flyerProducts[i].CATEGORY_ID);
                        temp = temp.replace("#CAT_NAME#", flyerProducts[i].CATEGORY_NAME_EN);

                        temp = temp.replace("#TYPE_ID#", flyerProducts[i].TYPE_ID);
                        temp = temp.replace("#TYPE_NAME#", flyerProducts[i].TYPE_NAME_EN);

                        temp = temp.replace("#PROVIDER_ID#", flyerProducts[i].PROVIDER_ID);
                        temp = temp.replace("#PROVIDER_NAME#", flyerProducts[i].PROVIDER_NAME_EN);

                        temp = temp.replace(/#IMAGE#/g, flyerProducts[i].PRODUCT_IMAGE.split('/')[2]);
                        temp = temp.replace("#IMG_URL#", flyerProducts[i].PRODUCT_IMAGE);

                        temp = temp.replace("#SPECS_1#", flyerProducts[i].SPECS_ATTR_1);
                        temp = temp.replace("#SPECS_2#", flyerProducts[i].SPECS_ATTR_2);
                        temp = temp.replace("#SPECS_3#", flyerProducts[i].SPECS_ATTR_3);
                        temp = temp.replace("#SPECS_4#", flyerProducts[i].SPECS_ATTR_4);
                        temp = temp.replace("#SPECS_5#", flyerProducts[i].SPECS_ATTR_5);

                    $(".products").append(temp);
                    $(".products #product_" + i).find("h4").text("Product Details : " + flyerProducts[i].PRODUCT_NAME_EN);
                    $("#product_" + i + " .panel-tools .minimise-tool").click(function (event) {
                        $(this).parents(".forms").find(".form-body").slideToggle(100);
                        return false;
                    });
                    $("#product_" + i + " .panel-tools .closed-tool").click(function (event) {
                        $(this).parents(".panel").fadeToggle(400).remove();
                        return false;
                    });
               }
               productCount = flyerProducts.length;
           }
       });
    localStorage.removeItem('flyerID');
}






function AddModalData(title, body, footer) {
    $("#modalHeader").text(title);
    $("#modalBody").html(body);
    $("#modalFooter").html(footer);
}

function DeleteModalData()
{
    $("#modalHeader").text('');
    $("#modalBody").html('');
    $("#modalFooter").html('');
}

function showModal(id) {
    $("#" + id).modal('show');
}

function hideModal(id) {
    $("#" + id).modal('hide');
}



function showUserEditPasswordModal() {
    var body = '<div class="form-body"><form id="editPassword" action="" method="POST"><div class="form-group"  > <label for="oldPSW">Old Password</label> <input type="password" data-validation="required  alphanumeric" class="form-control" id="oldPSW" placeholder="Old Password"> </div><div class="form-group"> <label for="newPSW">New Password</label> <input type="password" required="" data-validation="required  alphanumeric" class="form-control" id="newPSW" placeholder="New Password"> </div><div class="form-group"> <label for="cfmNewPSW">Confirm New Password</label> <input type="password" required="" data-validation="required  alphanumeric" id="cfmNewPSW" class="form-control" placeholder="Confirm New Password"> </div></form> </div>';
    var footer = '<button type="submit" class="btn btn-info" onclick="saveUserNewPassword()" >Save</button><button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
    AddModalData('Edit Password', body, footer);
    $.validate({
        lang: 'en',
        modules: 'security'
    });
    showModal('myModal');
}

function saveUserNewPassword() {
    AjaxCall("../Pages/Home.aspx?fnID=16&newPassword=" + $("#newPSW").val() + "&newPasswordRepeated=" + $("#cfmNewPSW").val() + "&oldPassword=" + $("#oldPSW").val()
       , function (data) {
           var output = false;
           eval(data);
           if (output) {
               hideModal('myModal');
           }
       });
}

