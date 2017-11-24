
var productCount = 0;
var providersList = '', offersTypesList = '', productCategories = '', catTypes = '', typeSpecs = '';
var flyerProducts = '', bundleProducts = {}, allBundleProducts = new Array();
var buttonFlag = false;



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




function AddMoreProduct()
{
    var template = '<div class="panel panel-widget forms-panel" id="product_' + productCount + '"> <div class="forms"> <div class="form-grids widget-shadow" data-example-id="basic-forms"> <div class="form-title"> <h4>Product Details :</h4> <ul class="panel-tools"> <li><a class="icon minimise-tool"><i class="fa fa-minus"></i></a></li><li><a class="icon closed-tool"><i class="fa fa-times"></i></a></li></ul> </div><div class="form-body"> <form> <div class="form-group"> <label for="productNameEn">Name EN</label> <input type="text" class="form-control" id="productNameEn" required="required" placeholder="Product Name En" onkeydown="$(this).parents(\'.forms\').find(\'h4\').text(\'Product Details : \' + $(this).val());"> </div><div class="form-group"> <label for="productNameAr">Name AR</label> <input type="text" class="form-control" id="productNameAr" required="required" placeholder="Product Name Ar"> </div><div class="form-group"> <label for="productPrice">Price</label> <input type="text" class="form-control" id="productPrice" required="required" placeholder="Product Price"> </div><div class="form-group"> <label for="manufactureDD">Manufacturer</label> <select name="manufactureDD" id="manufactureDD" class="form-control1" required="required"> <option value="-1">Select Product Manufacturer</option> </select> </div><div class="form-group"> <label for="categoryDD">Category</label> <select name="categoryDD" id="categoryDD" class="form-control1" required="required"> <option value="-1">Select Product Category</option> </select> </div><div class="form-group"> <label for="productTypeDD">Product Type</label> <select name="productTypeDD" id="productTypeDD" class="form-control1" required="required"> <option value="-1">Select Product Type</option> </select> </div><div class="hidden" id="prodSpecs"> <label for="prodSpecsDD"></label> </div><div class="form-group"> <label for="productImageFile">Image</label> <input type="file" id="productImageFile" name="productImageFile" required="required"> <p class="help-block">Upload Product Image - Available Formats : pdf/png/jpg</p></div><div class="form-group"> <label for="productLocationDD">Product Location in Branch</label> <select name="productLocationDD" id="productLocationDD" class="form-control1" required="required"> <option value="-1">Product Location in Branch</option> </select> </div><div class="form-group"> <label for="offerTypeDD">Offer Type</label> <select name="offerTypeDD" id="offerTypeDD" class="form-control1" required="required"> <option value="-1">Select Product Type</option> </select> </div><div id="prodOfferTypeDiv"> </div><div class="form-group"> <label for="dateFrom">Date From</label> <input type="text" data-validation="required" ReadOnly="readonly" required="" Class="form-control" id="dateFrom" name="dateFrom"/> </div><div class="form-group"> <label for="dateTo">Date To</label> <input type="text" data-validation="required" ReadOnly="readonly" required="" class="form-control" id="dateTo" name="dateTo"/> </div><div class="form-group"> <label for="productAttr_1">Product Attribute 1</label> <input type="text" class="form-control" id="productAttr_1" placeholder="Product Specs"> </div><div class="form-group"> <label for="productAttr_2">Product Attribute 2</label> <input type="text" class="form-control" id="productAttr_2" placeholder="Product Specs"> </div><div class="form-group"> <label for="productAttr_3">Product Attribute 3</label> <input type="text" class="form-control" id="productAttr_3" placeholder="Product Specs"> </div><div class="form-group"> <label for="productAttr_4">Product Attribute 4</label> <input type="text" class="form-control" id="productAttr_4" placeholder="Product Specs"> </div><div class="form-group"> <label for="productAttr_5">Product Attribute 5</label> <input type="text" class="form-control" id="productAttr_5" placeholder="Product Specs"> </div><div class="form-group"> <label for="smartTags">Tags</label> <input type="text" class="form-control" id="smartTags" required="required" placeholder="Smart tags For Product"> </div></form> </div></div></div></div>';
    
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
    //setTimeout(function () {
        //loadProvidersData();
    //}, 500);
        getAllProductManufactures();
        getAllProductBranches();
        getAllProductOfferTypes();
    
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
    for (var pair of fd.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/pages/addnewflyer_step2.aspx", true);
    xhr.onreadystatechange = function () {
        if (xhr.readystate == 3) {
            eval(xhr.responsetext);
        }
        HideMyLoginSpinner();
    };
    xhr.send(fd);
}

function createProductObject(proID, index, fd)
{
    var formData = new FormData();
    var flyerID = localStorage.getItem("flyerID");
    if (flyerID != null) {
        fd.append("flyerID", flyerID);
    }
    var file = GetElementInsideContainer(proID, "productImageFile");
    //console.log(file.files);
    //console.log((file.files != null));
    if (file.files != null && file.files.length != 0) {
        var filetype = file.files[0].type;
        if (filetype.indexOf("image") != -1 || filetype.indexOf("pdf") != -1) 
        {
            for (var i = 0; i < file.files.length; i++) {
                fd.append('_file_' + index, file.files[i]);
            }
        }
    }
    else if ($(file).attr("href") != '')
    {
        fd.append('_imgFile_' + index, $(file).attr("href"));
    }
    fd.append('productNameEn_' + index, $("#" + proID + " #productNameEn").val());

    fd.append('productNameAr_' + index, $("#" + proID + " #productNameAr").val());

    fd.append('productPrice_' + index, $("#" + proID + " #productPrice").val());

    fd.append('manufactureDD_' + index, $("#" + proID + " #manufactureDD").val());

    fd.append('categoryDD_' + index, $("#" + proID + " #categoryDD").val());

    fd.append('productTypeDD_' + index, $("#" + proID + " #productTypeDD").val());
    //Specs
    for (var i = 0; i < $("#" + proID + " #prodSpecs input").size() ; i++) {
        fd.append('prodSpecsAttr_' + index + "_" + i, $($("#" + proID + " #prodSpecs input")[i]).val() + ","
            + $($("#" + proID + " #prodSpecs input")[i]).attr('data-template'));
    }
    fd.append('prodSpecsAttrCount_' + index, $("#" + proID + " #prodSpecs input").size());

    fd.append('productLocationDD_' + index, $("#" + proID + " #productLocationDD").val());

    fd.append('offerTypeDD_' + index, $("#" + proID + " #offerTypeDD").val());
    
    //Specs
    for (var i = 0; i < $("#" + proID + " #prodOfferTypeDiv input").size() ; i++) {
        fd.append('offerTypeAttr_' + index + "_" + i, $("#" + proID + " #prodOfferTypeDiv input").val());
    }
    fd.append('offerTypeAttrCount_' + index, $("#" + proID + " #prodSpecs input").size());

    fd.append('dateFrom_' + index, $("#" + proID + " #dateFrom").val());

    fd.append('dateTo_' + index, $("#" + proID + " #dateTo").val());
    
    fd.append('smartTags_' + index, $("#" + proID + " #smartTags").val());

    fd.append('productSpecs_1_' + index, $("#" + proID + " #productAttr_1").val());

    fd.append('productSpecs_2_' + index, $("#" + proID + " #productAttr_2").val());

    fd.append('productSpecs_3_' + index, $("#" + proID + " #productAttr_3").val());

    fd.append('productSpecs_4_' + index, $("#" + proID + " #productAttr_4").val());

    fd.append('productSpecs_5_' + index, $("#" + proID + " #productAttr_5").val());
    return formData;
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







