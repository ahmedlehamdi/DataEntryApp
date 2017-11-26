var bundleList = new Array(), bundleINDEX = 0;
var productList = new Array(), productINDEX = 0;
var imagesList = new Array();

/*****************************************Retrieveing Required Data  To Add Product **************************************/

// Getting All Manufatures Data
function getAllProductManufactures() {
    ShowMyLoginSpinner();
    AjaxCall("../Pages/AddNewFlyer_Step2.aspx?fnID=30"
       , function (data) {
           //console.log(data);
           var prodManufacture = '';
           eval(data);
           if (prodManufacture != '') {
               var template = '<option value="#ID#">#NAME#</option>';
               for (var i = 0; i < prodManufacture.length ; i++) {
                   var xtemp = template;
                   xtemp = xtemp.replace('#ID#', prodManufacture[i].MANUFACTURE_ID);
                   xtemp = xtemp.replace('#NAME#', prodManufacture[i].MANUFACTURE_NAME_EN);
                   $("#product_0 #manufactureDD").append(xtemp);
               }
               HideMyLoginSpinner();
           }
           else {
               alert("Empty Manufature List, Please try again later.")
               window.location = '/Pages/Home.aspx';
               HideMyLoginSpinner();
           }
       });
}

// Getting All Categories Data 
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
                    $("#product_0 #categoryDD").append(temp);
                }
                $("#product_0 #categoryDD").on('change', function () {
                    $("#product_0 #prodSpecs").html('').addClass('hidden');
                    $("#product_0 #productTypeDD").html('<option value="-1">Select Product Type</option>');
                    if ($(this).val() != '-1') {
                        loadCategoriesTypesData($(this).val(), $(this));
                    }
                    else {
                        alert('Please Select Category');
                    }
                });
                //productCount++;
            } else {
                alert("Empty Category List, Please try again later.")
                window.location = '/Pages/Home.aspx';
            }
        });
}

// Load Product Types Based on Category
function loadCategoriesTypesData(catID, obj) {
    AjaxCall("../Pages/AddNewFlyer_Step2.aspx?fnID=9&catID=" + catID
        , function (data) {
            catTypes = '';
            $("#product_0 #productTypeDD").html('<option value="-1">Select Product Type</option>');
            eval(data);
            if (catTypes != '') {
                var template = '<option value="#ID#">#DETAILS#</option>';
                for (var i = 0 ; i < catTypes.length ; i++) {
                    var temp = template;
                    temp = temp.replace("#ID#", catTypes[i].TYPE_ID);
                    temp = temp.replace("#DETAILS#", catTypes[i].TYPE_NAME_EN);
                    $("#product_0 #productTypeDD").append(temp);
                }
                $("#product_0 #productTypeDD").on('change', function () {
                    $("#product_0 #prodSpecs").html('').addClass('hidden');
                    loadTypeSpecs(this);
                });
            }
            else
            {
                alert("Empty Product Types List, Please try again later.")
                window.location = '/Pages/Home.aspx';
            }
        });
}

function loadTypeSpecs(obj) {
    //console.log(obj);
    if ($(obj).val() != -1) {
        AjaxCall("../Pages/AddNewFlyer_Step2.aspx?fnID=32&typeID=" + $(obj).val()
            , function (data) {
                typeSpecs = '';
                //var typeSpecsElem = $(obj).parent().parent().find("#prodSpecs");
                eval(data);
                if (typeSpecs != '') {
                    var specsFinal = '';
                    for (var i = 0 ; i < typeSpecs.length ; i++) {
                        var temp = "";
                        var input = getInputHTML(typeSpecs[i].TEMP_INPUT_TYPE, typeSpecs[i].TEMP_PRE_LABEL_EN, typeSpecs[i].TEMP_POST_LABEL_EN, i, typeSpecs[i].TEMPLATE_ID);
                        temp = temp + input;
                        specsFinal += temp;
                    }
                    $("#product_0 #prodSpecs").html(specsFinal).removeClass('hidden');
                }
                else {
                    alert("Empty Type Specs, Please try again later.")
                    window.location = '/Pages/Home.aspx';
                }
                HideMyLoginSpinner();
            });
    }
    else {
        alert('Please Select Valid Product Type');
    }
}


// Getting All Branches Data Based on Flyer Provider 
function getAllProductBranches() {
    ShowMyLoginSpinner();
    AjaxCall("../Pages/AddNewFlyer_Step2.aspx?fnID=31&providerID=" + localStorage.getItem('providerID')
       , function (data) {
           var prodBranches = '';
           eval(data);
           if (prodBranches != '') {
               var template = '<option value="#ID#">#NAME#</option>';
               for (var i = 0; i < prodBranches.length ; i++) {
                   var xtemp = template;
                   xtemp = xtemp.replace('#ID#', prodBranches[i].PROVIDER_ID);
                   xtemp = xtemp.replace('#NAME#', prodBranches[i].PROVIDER_NAME_EN + " - " + prodBranches[i].LOCATION_CITY
                                    + " - " + prodBranches[i].LOCATION_DISTRICT + " - " + prodBranches[i].LOCATION_STREET);
                   $("#product_0 #productLocationDD").append(xtemp);
               }
               HideMyLoginSpinner();
           }
           else {
               $("#productLocationDD").remove();
               HideMyLoginSpinner();
           }
       });
}

// Getting all Offer Types
function getAllProductOfferTypes(inBundle) {
    ShowMyLoginSpinner();
    AjaxCall("../Pages/AddNewFlyer_Step2.aspx?fnID=33"
       , function (data) {
           var prodOfferTypes = '';
           eval(data);
           if (prodOfferTypes != '') {
               var template = '<option value="#ID#">#NAME#</option>';
               for (var i = 0; i < prodOfferTypes.length ; i++) {
                    var xtemp = template;
                    xtemp = xtemp.replace('#ID#', prodOfferTypes[i].PROD_OFF_TYPE_ID);
                    xtemp = xtemp.replace('#NAME#', prodOfferTypes[i].PROD_OFF_TYPE_NAME_EN);
                    $("#product_0 #offerTypeDD").append(xtemp);
               }
               HideMyLoginSpinner();
               if (inBundle)
                   $("#product_0 #offerTypeDD option[value='5']").remove();
               $("#product_0 #offerTypeDD").on('change', function () {
                   loadProductOfferTypeFields(this);
               });
           }
           else {
               HideMyLoginSpinner();
           }
       });
}

// Display Offer Type Fields 
function loadProductOfferTypeFields(obj) {
    var prodWidget = $("#product_0");
    var ddElem = $(obj);
    var inputTemp = '<div class="form-group"><label class="control-label">#PRE_LABEL#</label><div class=""><div class="input-group"><span class="input-group-addon">#POST_LABEL#</span><input type="#INPUT_TYPE#" required id="prodOfferType" class="form-control1" placeholder="#PLACEHOLDER#" ></div></div></div>';
    var checkboxTemp = '<div class="checkbox"> <label> <input type="checkbox" required id="prodOfferType">#PRE_LABEL#</label> </div>';
    $(prodWidget).find("#prodOfferTypeDiv").html('');
    if (ddElem.val() == '2')     //Discount Percentage
    {
        //prodOfferTypeDiv
        inputTemp = inputTemp.replace('#PRE_LABEL#', 'Percentage %');
        inputTemp = inputTemp.replace('#POST_LABEL#', '%');
        inputTemp = inputTemp.replace('#PLACEHOLDER#', 'Enter the Discount Percentage');
        inputTemp = inputTemp.replace('#INPUT_TYPE#', 'number');
        $(prodWidget).find("#prodOfferTypeDiv").html(inputTemp);
    }
    else if (ddElem.val() == '1')    // Discount Price
    {
        inputTemp = inputTemp.replace('#PRE_LABEL#', 'Price');
        inputTemp = inputTemp.replace('#POST_LABEL#', 'Value');
        inputTemp = inputTemp.replace('#PLACEHOLDER#', 'Enter the Discount Price');
        inputTemp = inputTemp.replace('#INPUT_TYPE#', 'text');
        $(prodWidget).find("#prodOfferTypeDiv").html(inputTemp);
    }
    else if (ddElem.val() == '3') {     // One + One
        checkboxTemp = checkboxTemp.replace('#PRE_LABEL#', 'Buy One and Get One in same price');
        $(prodWidget).find("#prodOfferTypeDiv").html(checkboxTemp);
    }
    else if (ddElem.val() == '4') { // Bundle Price (Same product but many items)
        var temp = inputTemp;
        temp = temp.replace('#PRE_LABEL#', 'Number of Product Items');
        temp = temp.replace('#POST_LABEL#', 'Item');
        temp = temp.replace('#PLACEHOLDER#', 'Enter the Number of Items per Product');
        temp = temp.replace('#INPUT_TYPE#', 'number');
        $(prodWidget).find("#prodOfferTypeDiv").html(temp);

        var xtemp = inputTemp;
        xtemp = xtemp.replace('#PRE_LABEL#', 'Price in Bundle');
        xtemp = xtemp.replace('#POST_LABEL#', 'Item');
        xtemp = xtemp.replace('#PLACEHOLDER#', 'Enter the Number of Items per Product');
        xtemp = xtemp.replace('#INPUT_TYPE#', 'number');
        $(prodWidget).find("#prodOfferTypeDiv").append(xtemp);
    }
    else if (ddElem.val() == '5') {     // Bundle Multiple Products 
        var temp = '<div class="form-group"><a href="#" onclick="openAddBundleProductsModal(this);">Add Products in Bundle</a></div>';
        $(prodWidget).find("#prodOfferTypeDiv").html(temp);
        bundleProdCount = 0;
        bundleProducts = {};
        var tableTemp = '<div class="form-body"> <table class="table table-striped table-bordered bootstrap-datatable datatable"> <thead> <tr><th>Product Name</th> <th>Category</th> <th>Type</th> <th>Provider</th> <th>Price</th> <th>Remove</th> </tr></thead> <tbody id="productBundleTBody"></tbody> </table> </div>';
        $(prodWidget).find("#prodOfferTypeDiv").append(tableTemp);
        $("#productBundleTBody").html('');
    }
    else if (ddElem.val() == '7') {      // Money Back Voucher 
        var temp = inputTemp;
        temp = temp.replace('#PRE_LABEL#', 'Amount to gain Voucher');
        temp = temp.replace('#POST_LABEL#', 'Price');
        temp = temp.replace('#PLACEHOLDER#', 'Enter the Amount to gain Voucher');
        temp = temp.replace('#INPUT_TYPE#', 'number');
        $(prodWidget).find("#prodOfferTypeDiv").html(temp);

        var xtemp = inputTemp;
        xtemp = xtemp.replace('#PRE_LABEL#', 'Voucher Value');
        xtemp = xtemp.replace('#POST_LABEL#', 'Value');
        xtemp = xtemp.replace('#PLACEHOLDER#', 'Enter the Voucher Value');
        xtemp = xtemp.replace('#INPUT_TYPE#', 'number');
        $(prodWidget).find("#prodOfferTypeDiv").append(xtemp);
    }
    else if (ddElem.val() == '6') {     // Money Back Money
        var temp = inputTemp;
        temp = temp.replace('#PRE_LABEL#', 'Amount to gain Money Back');
        temp = temp.replace('#POST_LABEL#', 'Value');
        temp = temp.replace('#PLACEHOLDER#', 'Enter the Amount to get Money Back');
        temp = temp.replace('#INPUT_TYPE#', 'number');
        $(prodWidget).find("#prodOfferTypeDiv").html(temp);

        var xtemp = inputTemp;
        xtemp = xtemp.replace('#PRE_LABEL#', 'Money to be back');
        xtemp = xtemp.replace('#POST_LABEL#', 'Value');
        xtemp = xtemp.replace('#PLACEHOLDER#', 'Enter the Money will be back');
        xtemp = xtemp.replace('#INPUT_TYPE#', 'number');
        $(prodWidget).find("#prodOfferTypeDiv").append(xtemp);
    }

}


/*************************************************************************************************************************/




/**********************************************Bundle Products************************************************************/

// Open Bundle Modal
function openAddBundleProductsModal(obj) {
    var body = "<iframe id='bundleProdFrame' class='' src='/Pages/AddProductsInBundle.aspx'></iframe>";
    var productsBundleCount = $(obj).parent().parent().find('table #productBundleTBody tr').size();
    //console.log(productTBody);
    bundleProdCount = productsBundleCount;
    AddModalData('Add Bundle Products', body, '');
    showModal('myModal');
}


function saveProductsInBundle() {
    parent.bundleINDEX++;
    var productObject = createProductObject("#product_0", parent.bundleINDEX);
    if (productObject != null) {
        
        productObject.PRODUCT_ID = parent.bundleINDEX;
        parent.bundleList.push(productObject);
        
        var temp = "<tr><td>#NAME#</td><td>#CATEGORY#</td><td>#TYPE#</td><td>#MANUFACTURE#</td><td>#PRICE#</td><td onclick='deleteFromBundle($(this), " + parent.bundleINDEX + ")'><i class='fa fa-trash-o' aria-hidden='true'></i></td></tr>"

        temp = temp.replace('#NAME#', $("#product_0 #productNameEn").val());
        temp = temp.replace('#CATEGORY#', $("#product_0 #categoryDD option:selected").text());
        temp = temp.replace('#TYPE#', $("#product_0 #productTypeDD option:selected").text());
        temp = temp.replace('#MANUFACTURE#', $("#product_0 #manufactureDD option:selected").text());
        temp = temp.replace('#PRICE#', $("#product_0 #productPrice").val());

        parent.$("#productBundleTBody").append(temp);
        parent.hideModal('myModal');
        parent.goToByScroll('productLocationDD')
    } else {
        alert('Please Review the Product Form');
    }
    
}


function deleteFromBundle(tdObj, index) {
    
    bundleList = bundleList.filter(function (el) {
        return el.PRODUCT_ID !== index;
    });
    //bundleProdCount == 0 ? bundleProdCount = 0 : bundleProdCount--;
    //var trs = $(tdObj).parent().parent().find('tr');
    //console.log(trs);
    //for (var i = 0; i < trs.length ; i++) {
    //    if (i == trs.length - 1) { bundleProdCount = parseInt($($(trs[i]).find('td')[0]).text()); }
    //    $($(trs[i]).find('td')[0]).text(parseInt($($(trs[i]).find('td')[0]).text()) - 1);
    //}
    $(tdObj).parent().remove();
}

function createProductObject(div, index)
{
    var product = new PRODUCT();

    product.FLYER_ID = localStorage.getItem("flyerID");

    product.PRODUCT_NAME_EN = $(div).find('#productNameEn').val();
    product.PRODUCT_NAME_AR = $(div).find('#productNameAr').val();

    product.PRODUCT_PRICE = $(div).find('#productPrice').val();

    product.MANUFACTURE_ID = $(div).find('#manufactureDD').val();
    product.CATEGORY_ID = $(div).find('#categoryDD').val();

    ////////////////////////////////PRODUCT TYPE SPECS/////////////////////////////////////
    product.TYPE_ID = $(div).find('#productTypeDD').val();
    var typeSpecsArr = new Array();
    for (var i = 0; i < $(div).find("#prodSpecs input").size() ; i++) {
        var inputObj = $($(div).find("#prodSpecs input")[i]);
        var typeSPECS = new PRODUCT_TYPE_SPECS();
        typeSPECS.TEMPLATE_ID = $(inputObj).attr('data-template');
        typeSPECS.TEMPLATE_VALUE = $(inputObj).val();
        typeSPECS.TYPE_ID = $(div).find('#productTypeDD').val();
        typeSpecsArr.push(typeSPECS);
    }
    product.TYPE_SPECS = typeSpecsArr;
    /////////////////////////////////////////////////////////////////////////////////////////////

    var imageFile = getImageFileFromInput("productImageFile", "Products", localStorage.getItem('flyerID') + "_" + $(div).find('#productNameEn').val());
    if (imageFile != false)
        product.PRODUCT_IMAGE = imageFile;
    else
        return null;
    product.BRANCH_ID = $(div).find('#productLocationDD').val();
    product.PRODUCT_TAGS = $(div).find('#smartTags').val();

    product.DATE_FROM = $(div).find('#dateFrom').val();
    product.DATE_TO = $(div).find('#dateTo').val();

   
    ////////////////////////////////PRODUCT OFFER TYPE SPECS/////////////////////////////////////
    var offerTypeID = $(div).find('#offerTypeDD').val();
    product.PROD_OFF_TYPE_ID = offerTypeID;
    if (offerTypeID != '5') {
        var offerTypeSPECS = new PRODUCT_OFFER_TYPE_SPECS();
        offerTypeSPECS.PROD_OFF_TYPE_ID = offerTypeID;
        for (var i = 0; i < $(div).find("#prodOfferTypeDiv input").size() ; i++) {
            var inputObj = $($(div).find("#prodOfferTypeDiv input")[i]);
            offerTypeSPECS["PROD_OFF_TYP_ATTR_" + (i+1)] = $(inputObj).val();
        }
        product.PROD_OFF_TYP_SPECS = offerTypeSPECS;
    }
    else
    {
        if (bundleList.length > 0)
            product.bundleList = bundleList;
        else
        {
            alert("Please Add Products in Bundle");
            return null;
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////PRODUCT OFFER TYPE SPECS/////////////////////////////////////
    product.PRODUCT_ATTR_1 = $(div).find("#productAttr_1").val();
    product.PRODUCT_ATTR_2 = $(div).find("#productAttr_2").val();
    product.PRODUCT_ATTR_3 = $(div).find("#productAttr_3").val();
    product.PRODUCT_ATTR_4 = $(div).find("#productAttr_4").val();
    product.PRODUCT_ATTR_5 = $(div).find("#productAttr_5").val();
    /////////////////////////////////////////////////////////////////////////////////////////////

    return product;
}


function SaveProduct()
{
    productINDEX++;
    var productObject = createProductObject("#product_0", productINDEX);
    if (productObject != null) {

        productObject.PRODUCT_ID = productINDEX;

        productList.push(productObject);

        var temp = "<tr><td>#ProductName#</td><td>#Price#</td><td>#Manufacture#</td><td>#Category#</td><td>#Type#</td><td>#Branch#</td><td>#OfferType#</td><td>#OfferSpecs#</td><td onclick='deleteFromProducts($(this), " + productINDEX + ")'><i class='fa fa-trash-o' aria-hidden='true'></i></td></tr>";

        temp = temp.replace('#ProductName#', $("#product_0 #productNameEn").val());
        temp = temp.replace('#Price#', $("#product_0 #productPrice").val());
        temp = temp.replace('#Manufacture#', $("#product_0 #manufactureDD option:selected").text());
        temp = temp.replace('#Category#', $("#product_0 #categoryDD option:selected").text());
        temp = temp.replace('#Type#', $("#product_0 #productTypeDD option:selected").text());
        temp = temp.replace('#Branch#', $("#product_0 #productLocationDD option:selected").text());
        temp = temp.replace('#OfferType#', $("#product_0 #offerTypeDD option:selected").text());

        if ($("#product_0 #offerTypeDD").val() == '5')
        {
            var prodBundleNames = '';
            //$($("#productBundleTBody tr")[0]).find('td')[0]
            for (var i = 0 ; i < $("#productBundleTBody tr").length ; i++)
            {
                prodBundleNames += $($($("#productBundleTBody tr")[i]).find('td')[0]).text() + "<br/>";
            }
            temp = temp.replace('#OfferSpecs#', prodBundleNames);
        }
        else
        {
            var offTypeSpecs = '';
            for (var i = 0 ; i < $("#prodOfferTypeDiv input").length ; i++)
            {
                var parentDIV = $($("#prodOfferTypeDiv div.form-group")[i]);
                offTypeSpecs += $(parentDIV).find('label').text() + " : " + $(parentDIV).find('input').val() + "<br/>";
            }
            temp = temp.replace('#OfferSpecs#', offTypeSpecs);
        }
        
        $("#productTBody").append(temp);
        resetProductForm("product_0");
        goToByScroll("page-wrapper");
    } else {
        alert('Please Review the Product Form');
    }
}

function resetProductForm(div) {
    $("#" + div + " h4").text('Product Details : ');
    $("#" + div + " input").val('');
    $("#" + div + " input[type='checkbox']").attr('checked', false);
    $("#" + div + " select").val('-1');
    $("#" + div + " #smartTags").tagsinput('removeAll');
    
    $("#" + div + " #prodOfferTypeDiv").html('');
}

function deleteFromProducts(tdObj, index)
{
    productList = productList.filter(function (el) {
        return el.PRODUCT_ID !== index;
    });
    $(tdObj).parent().remove();
}

function loadProductToEdit(tdObj, index)
{
    //var product = productList.filter(function (el) {
    //    return el.PRODUCT_ID === index;
    //});
    //product = product[0];
    //var div = $("#product_0");
    //$(div).find("#productNameEn").val(product.PRODUCT_NAME_EN);
    //$(div).find('#productNameAr').val(product.PRODUCT_NAME_AR);

    //$(div).find('#productPrice').val(product.PRODUCT_PRICE);

    //$(div).find('#manufactureDD').val(product.MANUFACTURE_ID);
    //$(div).find('#categoryDD').val(product.CATEGORY_ID);

    //////////////////////////////////PRODUCT TYPE SPECS/////////////////////////////////////
    //$(div).find('#productTypeDD').val(product.TYPE_ID);
    //var typeSpecsArr = product.TYPE_SPECS;
    //for (var i = 0; i < typeSpecsArr.length ; i++) {
    //    var typeSPECS = typeSpecsArr[i];
    //    var inputObj = $($(div).find("#prodSpecs input[data-template='" + typeSPECS.TEMPLATE_ID + "']"));
    //    $(inputObj).val(typeSPECS.TEMPLATE_VALUE);
    //}
    ///////////////////////////////////////////////////////////////////////////////////////////////

    ////var imageFile = getImageFileFromInput("productImageFile");
    ////if (imageFile != false)
    ////    product.PRODUCT_IMAGE = imageFile;
    ////else
    ////    return null;

    ////"<a target='_blank' href='" + flyerProducts[i].PRODUCT_IMAGE + "' download='" + flyerProducts[i].PRODUCT_IMAGE.split('/')[2] + "' > " + flyerProducts[i].PRODUCT_IMAGE.split('/')[2] + "</a>"

    //$(div).find('#productLocationDD').val(product.LOCATION_ID);
    //var tags = (product.PRODUCT_TAGS).split(',');
    //for (var i = 0 ; i < tags.length ; i++) {
    //    $(div).find('#smartTags').tagsinput('add' , tags[i]);
    //}

    //$(div).find('#dateFrom').val(product.DATE_FROM);
    //$(div).find('#dateTo').val(product.DATE_TO);

    //////////////////////////////////PRODUCT OFFER TYPE SPECS/////////////////////////////////////
    //$(div).find('#offerTypeDD').val(product.PROD_OFF_TYPE_ID);
    //if (product.PROD_OFF_TYPE_ID != '5') {
    //    var offerTypeSPECS = product.PROD_OFF_TYP_SPECS;
    //    for (var i = 0; i < $(div).find('#prodOfferTypeDiv input') ; i++)
    //    {
    //        $($(div).find('#prodOfferTypeDiv input')[i]).val(offerTypeSPECS["PROD_OFF_TYP_ATTR_" + (i + 1)]);
    //    }
    //}
    //else {
    //    bundleList = product.bundleList;
    //    for(var i = 0 ; i < bundleList.length ; i++)
    //    {
    //        var bundleItem = bundleList[i];
    //        var temp = "<tr><td>#NAME#</td><td>#CATEGORY#</td><td>#TYPE#</td><td>#MANUFACTURE#</td><td>#PRICE#</td><td onclick='deleteFromBundle($(this), " + parent.bundleINDEX + ")'><i class='fa fa-trash-o' aria-hidden='true'></i></td></tr>"

    //        temp = temp.replace('#NAME#', bundleItem.PRODUCT_NAME_EN);
    //        temp = temp.replace('#CATEGORY#', $(div).find('#categoryDD option[value="' + bundleItem.CATEGORY_ID + '"]').text());
    //        temp = temp.replace('#TYPE#', $(div).find('#productTypeDD option[value="' + bundleItem.TYPE_ID + '"]').text());
    //        temp = temp.replace('#MANUFACTURE#', $(div).find('#manufactureDD option[value="' + bundleItem.MANUFACTURE_ID + '"]').text());
    //        temp = temp.replace('#PRICE#', bundleItem.PRODUCT_PRICE);

    //        $(div).find("#productBundleTBody").append(temp);
    //    }
    //}
    ///////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////PRODUCT OFFER TYPE SPECS/////////////////////////////////////
    // $(div).find("#productAttr_1").val(product.PRODUCT_ATTR_1);
    // $(div).find("#productAttr_2").val(product.PRODUCT_ATTR_2);
    // $(div).find("#productAttr_3").val(product.PRODUCT_ATTR_3);
    // $(div).find("#productAttr_4").val(product.PRODUCT_ATTR_4);
    // $(div).find("#productAttr_5").val(product.PRODUCT_ATTR_5);
    /////////////////////////////////////////////////////////////////////////////////////////////
}


function submitProducts()
{
    ShowMyLoginSpinner();
    if(productList.length > 0)
    {
        var prodList = clone(productList);
        var imageFD = new FormData();
        var imagesCount = 0;
        for (var i = 0 ; i < prodList.length ; i++)
        {
            var imageObj = (prodList[i].PRODUCT_IMAGE)[0];
            imageFD.append("_file_" + imagesCount, imageObj.imageFile);
            imageFD.append("_file_Name_" + imagesCount, imageObj.fileName);
            prodList[i].PRODUCT_IMAGE = imageObj.fileName;

            imagesCount++;
            if (prodList[i].bundleList.length > 0)
            {
                for (var u = 0 ; u < prodList[i].bundleList.length ; u++)
                {
                    var bndlImgObj = (prodList[i].bundleList[u].PRODUCT_IMAGE)[0];
                    imageFD.append("_file_bundle_" + imagesCount, bndlImgObj.imageFile);
                    imageFD.append("_file_bundle_Name_" + imagesCount, bndlImgObj.fileName);
                    prodList[i].bundleList[u].PRODUCT_IMAGE = bndlImgObj.fileName;
                    imagesCount++;
                }
            }
        }
        imageFD.append("fnID", "40");
        imageFD.append("IMAGES_COUNT", imagesCount);
        for (var pair of imageFD.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        /// Upload All Image Files
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/Pages/AddNewFlyer_Step2.aspx?", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                //window.location = "/Pages/AddNewFlyer_Step2.aspx";
            }
            else if (xhr.readyState == 2) {
                var error = false;
                eval(xhr.responseText);
                if(!error)
                {
                    var myData = JSON.stringify(prodList);
                    $.ajax({
                        url: '/Pages/AddNewFlyer_Step2.aspx/submitProductsObjects',
                        type: 'POST',
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        data: "{obj:" + myData + "}",
                        success: function (result) {
                            HideMyLoginSpinner();
                            alert('Product Inserted');
                            window.location = '/Pages/Home.aspx';
                        },
                        error: function () {
                            HideMyLoginSpinner();
                            alert('Error Saving Products');
                        },
                        failure: function () {
                            HideMyLoginSpinner();
                            alert('Failure Sending Products');
                        }
                    });
                    //productList = prodList;
                }
            }
            
        };
        xhr.send(imageFD);
    }
    else
    {
        alert("Please Add products")
    }
}

/*************************************************************************************************************************/


