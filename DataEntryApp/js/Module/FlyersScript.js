var flyerData = '';

/************************************Load Flyers *********************************/

function loadAllFlyers() {
    //alert(12);
    AjaxCall("../Pages/Home.aspx?fnID=2"
            , function (data) {
                var flyerList = '';
                eval(data);
                if (flyerList != '')
                {
                    localStorage.setItem("flyersList", JSON.stringify(flyerList));
                    console.log(flyerList);
                    displayFlyerList(flyerList);
                }
            });
}

function displayFlyerList(flyerList) {
    ShowMyLoginSpinner();
    console.log(flyerList.length);
    var UType = localStorage.getItem('UType');
    var template = (UType != null && UType == 'entry') ? '<tr> <th scope="row">#NUM#</th> <td>#NAME#</td><td>#IMAGE#</td><td>#STATUS#</td><td>#PROVIDER#</td><td>#FROM#</td><td>#TO#</td><td>#VIEW#</td><td>#EDIT#</td></tr>'
                    : '<tr> <th scope="row">#NUM#</th><td>#NAME#</td><td>#IMAGE#</td><td>#STATUS#</td><td>#PROVIDER#</td><td>#FROM#</td><td>#TO#</td><td>#VIEW#</td><td>#DELETE#</td></tr>';
    for (var i = 0; i < flyerList.length ; i++) {
        var xtemp = template;
        //console.log(flyerList[i]);
        xtemp = xtemp.replace('#NUM#', i + 1);
        xtemp = xtemp.replace('#NAME#', flyerList[i].FLYER_NAME_EN);
        var imagesURLs = flyerList[i].FLYER_IMAGE_URL.split('&&');
        //alert("imagesURLs.length  : " + imagesURLs.length);
        if (imagesURLs.length > 1) {
            //alert("URL > 1" + imagesURLs);
            imagesURLs.pop();
            var imageData = '';
            for (var u = 0 ; u < imagesURLs.length; u++) {
                imageData += "<a target='_blank' href='" + imagesURLs[u] + "' download='" + imagesURLs[u].split('/')[3] + "'>" + imagesURLs[u].split('/')[3] + "</a><br/>";
            }
            xtemp = xtemp.replace('#IMAGE#', imageData);
        }
        else {
            //alert("URL < 1" + imagesURLs);
            xtemp = xtemp.replace('#IMAGE#', "<a target='_blank' href='" + flyerList[i].FLYER_IMAGE_URL + "' download='" + flyerList[i].FLYER_IMAGE_URL.split('/')[3] + "'>" + flyerList[i].FLYER_IMAGE_URL.split('/')[3] + "</a>");
        }

        xtemp = xtemp.replace('#STATUS#', (flyerList[i].FLYER_APPROVED == null) ? "Under Processing" : (flyerList[i].FLYER_APPROVED == true) ? "Approved" : "Rejected");
        xtemp = xtemp.replace('#PROVIDER#', flyerList[i].PROVIDER_NAME_EN + " - " + flyerList[i].PROVIDER_NAME_AR);
        xtemp = xtemp.replace('#FROM#', (flyerList[i].DATE_FROM).replace("T", " "));
        xtemp = xtemp.replace('#TO#', (flyerList[i].DATE_TO).replace("T", " "));
        xtemp = xtemp.replace('#VIEW#', '<div onclick="openFlyerDetails(' + flyerList[i].FLYER_ID + ')"><i class="fa-2x fa fa-search" style="cursor: pointer;color: #67D3E0;"></i></div>');
        if (UType != null && UType == 'entry')
            xtemp = xtemp.replace('#EDIT#', (flyerList[i].FLYER_APPROVED == null) ? '<div onclick="openEditFlyerDetails(' + flyerList[i].FLYER_ID + ')"><i class="fa-2x fa fa-pencil-square-o" style="cursor: pointer;"></i></div>' : '<div><i class="fa-2x fa fa-check" style="color: #30BB74;" ></i></div>');
        else
            xtemp = xtemp.replace('#DELETE#', '<div data-index="' + i + '" onclick="loadDeleteFlyerModal(' + flyerList[i].FLYER_ID + ', \'' + i + '\')"><i class="fa-2x fa fa-trash-o" style="cursor: pointer;color:#d9534f;"></i></div>');
        $("#flyerTBody").append(xtemp);
    }
    applyDataTable();
    HideMyLoginSpinner();
}

/**********************************************************************************/


/************************************Load Required Data For Adding New Flyer (Providers List, Offer Types)****************/

/// Load Required Data For Adding New Flyer (Providers List, Offer Types)
function loadAddFlyerData() {
    AjaxCall("../Pages/AddNewFlyer.aspx?fnID=6"
        , function (data) {
            providersList = '';
            offersTypesList = '';
            //timeFramesList = '';
            eval(data);
            //console.log(data);
            if (providersList != '') {
                displayProvidersData(providersList);
            }
            if (offersTypesList != '') {
                displayOffersTypesData(offersTypesList);
            }
            //if (timeFramesList != '') {
            //    displayTimeFramesData(timeFramesList);
            //}
        });
}
// Load Providers Data
function loadProvidersData(selected) {
    AjaxCall("../Pages/AddNewFlyer.aspx?fnID=3"
        , function (data) {
            providersList = '';
            eval(data);
            if (providersList != '') {
                if (selected)
                    displayProvidersData(providersList, selected);
                else
                    displayProvidersData(providersList);
            }
        });
}
//Load Offer Types Data
function loadOffersTypesData(selected) {
    AjaxCall("../Pages/AddNewFlyer.aspx?fnID=4"
        , function (data) {
            offersTypesList = '';
            eval(data);
            if (offersTypesList != '') {
                if (selected)
                    displayOffersTypesData(offersTypesList, selected);
                else
                    displayOffersTypesData(offersTypesList);
            }
        });
}
// Display Flyer Providers List 
function displayProvidersData(list, selected) {
    //alert("loadProviders : " + (productCount - 1));
    var template = '<option value="#ID#">#DETAILS#</option>';
    for (var i = 0 ; i < list.length ; i++) {
        var temp = template;
        temp = temp.replace("#ID#", list[i].PROVIDER_ID);
        temp = temp.replace("#DETAILS#", list[i].PROVIDER_NAME_EN + " - " + list[i].PROVIDER_BUSINESS_AREA
                                + " - " + list[i].LOCATION_CITY + " - " + list[i].LOCATION_DISTRICT);
        //if ($("#product_" + (productCount - 1) + " #providerDD").size() == 0)
        //    $("#providerDD").append(temp);
        //else
        //    $("#product_" + (productCount - 1) + " #providerDD").append(temp);
        $("#providerDD").append(temp);
    }
    if (selected)
        $("#providerDD").val(selected);
}
// Display Flyer Offer Type List
function displayOffersTypesData(list, selected) {
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
    if (selected)
        $("#providerDD").val(selected);
}

/************************************************************************************************************/


/*******************************************Load Flyer Data & Edit *****************************************/


function openFlyerDetails(flyerID) {
    var UType = localStorage.getItem("UType");
    window.location = (UType == 'entry') ? '/Pages/FlyerDetails.aspx?FlyerID=' + flyerID : '/Pages/FlyerDetails_Admin.aspx?FlyerID=' + flyerID;
}

function loadFlyerDetails() {
    var flyerID = getUrlQString().FlyerID;
    var flyersList = jsonToObjList(localStorage.getItem("flyersList"), new FLYER());
    for(var flyer of flyersList)
    {
        if(flyer.hasOwnProperty("FLYER_ID"))
        {
            if(flyer["FLYER_ID"] == flyerID)
            {
                flyerData = flyer;
            }
        }
    }

    displayFlyerDetails(flyerData);

    AjaxCall("../Pages/FlyerDetails.aspx?fnID=11&flyerID=" + flyerID
       , function (data) {
           flyerProducts = '';
           eval(data);
           console.log(flyerProducts);
           if (flyerProducts != '') {
               var template = '<tr> <td>#ID#</td><td>#ProductName#</td><td>#Category#</td><td>#Type#</td><td>#MANUFACTURE#</td><td>#Image#</td><td>#Specs#</td></tr>';
               for (var i = 0 ; i < flyerProducts.length ; i++) {
                   var temp = template;
                   temp = temp.replace("#ID#", i);
                   temp = temp.replace("#ProductName#", flyerProducts[i].PRODUCT_NAME_EN);
                   temp = temp.replace("#Category#", flyerProducts[i].CATEGORY_NAME_EN);
                   temp = temp.replace("#Type#", flyerProducts[i].TYPE_NAME_EN);
                   temp = temp.replace("#MANUFACTURE#", flyerProducts[i].MANUFACTURE_NAME_EN);
                   temp = temp.replace("#Image#", "<a target='_blank' href='" + flyerProducts[i].PRODUCT_IMAGE + "' download='" + flyerProducts[i].PRODUCT_IMAGE.split('/')[3] + "' > " + flyerProducts[i].PRODUCT_IMAGE.split('/')[3] + "</a>");
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

function displayFlyerDetails(flyerData)
{
    if (flyerData != '') {
        $("#flyerNameEN").text(flyerData.FLYER_NAME_EN);
        $("#flyerNameAR").text(flyerData.FLYER_NAME_AR);
        var imageURLs = flyerData.FLYER_IMAGE_URL.split("&&");
        if (imageURLs.length > 1) {
            var parentDiv = $("#flyerImg").parent();
            $(parentDiv).html('');
            imageURLs.pop();
            //alert(imageURLs.length);
            var template = "<a target='_blank' href='#HREF#' download='#DOWNLOAD#'>#TEXT#</a><br/>";
            for (var i = 0 ; i < imageURLs.length ; i++) {
                var temp = template;
                //alert(imageURLs[i]);
                temp = temp.replace("#HREF#", imageURLs[i]);
                temp = temp.replace("#DOWNLOAD#", imageURLs[i].split('/')[3]);
                temp = temp.replace("#TEXT#", imageURLs[i].split('/')[3]);
                //alert(temp);
                $(parentDiv).append(temp);
            }
        } else {
            $("#flyerImg").attr('href', flyerData.FLYER_IMAGE_URL);
            $("#flyerImg").attr('download', flyerData.FLYER_IMAGE_URL.split('/')[3]);
            $("#flyerImg").text(flyerData.FLYER_IMAGE_URL.split('/')[3]);
        }

        $("#flyerProvider").text(flyerData.PROVIDER_NAME_EN);
        $("#flyerOfferType").text(flyerData.OFFER_TYPE_NAME_EN);
        $("#flyerFromDate").text(flyerData.DATE_FROM.replace('T', ' '));
        $("#flyerToDate").text(flyerData.DATE_TO.replace('T', ' '));
        flyerData = '';
    }
}


function openEditFlyerDetails(flyerID) {
    window.location = '/Pages/EditFlyerDetails.aspx?FlyerID=' + flyerID;
}

function loadFlyerDetailsForEdit() {

    flyerData = '';
    var flyerID = getUrlQString().FlyerID;
    var flyersList = jsonToObjList(localStorage.getItem("flyersList"), new FLYER());
    for(var flyer of flyersList)
    {
        if (flyer.hasOwnProperty("FLYER_ID")) {
            if (flyer["FLYER_ID"] == flyerID) {
                flyerData = flyer;
            }
        }
    }

    if (flyerData != '') {
        loadProvidersData(flyerData.PROVIDER_ID);
        loadOffersTypesData(flyerData.OFFER_TYPE_ID);
        $("#providerDD").attr('data-old', flyerData.PROVIDER_ID);
        $("#offerTypeDD").attr('data-old', flyerData.OFFER_TYPE_ID);

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
                temp = temp.replace("#DOWNLOAD#", imageURLs[i].split('/')[3]);
                temp = temp.replace("#TEXT#", imageURLs[i].split('/')[3]);
                //alert(temp);
                $(parentDiv).append(temp);
            }
        } else {
            $("#oldImage").attr('href', flyerData.FLYER_IMAGE_URL);
            $("#oldImage").attr('download', flyerData.FLYER_IMAGE_URL.split('/')[3]);
            $("#oldImage").text(flyerData.FLYER_IMAGE_URL.split('/')[3]);
        }

        $("#dateFrom").val(flyerData.DATE_FROM.replace('T', ' '));
        $("#dateTo").val(flyerData.DATE_TO.replace('T', ' '));
        flyerData = '';
    }
}



/************************************************************************************************************/


/******************************************Submit New Flyer Form*********************************************/

function submitFlyerForm(action) {
    if (!validateForm("flyerDataForm")) {
        return false;
    }
    ShowMyLoginSpinner();
    var flyer = new FLYER();
    
    flyer.FLYER_ID = $("#flyerNameAr").attr('data-old') != null ? $("#flyerNameAr").attr('data-old') : 0;
    flyer.FLYER_NAME_EN = $("#flyerNameEn").val();
    flyer.FLYER_NAME_AR = $("#flyerNameAr").val();
    flyer.PROVIDER_ID = $("#providerDD").val();
    flyer.OFFER_TYPE_ID = $("#offerTypeDD").val();
    flyer.DATE_FROM = $("#dateFrom").val();
    flyer.DATE_TO = $("#dateTo").val();

    //console.log(JSON.stringify(flyer));
    //console.log(flyer);
    var fd = new FormData();
    
    localStorage.setItem('providerID', $("#providerDD").val());

    var file = document.getElementById('flyerImageFile');
    if (file.files.length != 0) {
        flyer.IMAGES_COUNT = file.files.length;
        fd = toFormData(flyer);
        var filetype = file.files[0].type;
        if (filetype.indexOf("image") != -1 || filetype.indexOf("pdf") != -1) {
            for (var i = 0; i < file.files.length; i++) {
                fd.append("_file_" + i ,file.files[i]);
            }
            
        }
    }
    else if (action == 'edit') {
        var oldImages = $("#previousIMGS a");
        var oldURLS = '';
        for (var o = 0 ; o < oldImages.length; o++) {
            oldURLS += $(oldImages[o]).attr('href') + "&&";
        }
        flyer.FLYER_IMAGE_URL = oldURLS;
        fd = toFormData(flyer);
    }
    (action == 'edit') ? fd.append('action', "update") : fd.append('action', "insert");

    for (var pair of fd.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/Pages/AddNewFlyer.aspx?fnID=7", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //window.location = "/Pages/AddNewFlyer_Step2.aspx";
        }
        else if (xhr.readyState == 3) {
            eval(xhr.responseText);
        }
        HideMyLoginSpinner();
    };
    xhr.send(fd);
    return false;
}

/************************************************************************************************************/