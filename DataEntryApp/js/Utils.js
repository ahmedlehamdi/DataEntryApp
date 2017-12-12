
function AjaxCall(PageURL, CallBackFunc, data) {
    try {
        // alert(33)
        ShowMyLoginSpinner();
        $.ajax({
            url: PageURL,
            contentType: "application/text; charset=UTF-8",
            type: 'POST',
            data : data,
            success: function (msg) {
                //alert(msg.d);
                //return msg;
                try {
                    CallBackFunc(msg);
                    //disableCheckboxes();
                    applyDataTable(true);
                } catch (e) { }
                HideMyLoginSpinner();
            },
            error: function (err) {
                if (err.status == '200') {
                    try {
                        CallBackFunc(err.responseText);
                        //disableCheckboxes();
                    } catch (e) { }
                }
                else {
                    HideMyLoginSpinner();
                    alert("Error >>> " + err);
                    console.log(err);
                    HideMyLoginSpinner();
                }
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


function openPageWithPostData(pageURL, dataArr, callback) {
    var form = "<form id='submittedForm' method='POST' action='" + pageURL + "'>";

    for (var i = 0 ; i < dataArr.length ; i++) {
        form += "<input name='param" + i + "' value='" + dataArr[i] + "' type='hidden' />";
    }
    form += "</form>";
    $('body').append(form);
    $("#submittedForm").submit();
    if (callback)
        callback();
}

function applyDataTable(id) {
    try {
        if (id) {
            if ($('#' + id).find("tbody tr").size() > 0) {
                $('#' + id).dataTable({
                    paging: false
                });
                $('.dataTables_length select').addClass('form-control');
                $('.dataTables_filter input').addClass('form-control');
            }
        }
        else {
            if ($('.datatable').find("tbody tr").size() > 0) {
                $('.datatable').dataTable({
                    paging: false
                });
                $('.dataTables_length select').addClass('form-control');
                $('.dataTables_filter input').addClass('form-control');
            }
        }
        
    } catch (e) { }
}


function goToByScroll(id) {
    // Remove "link" from the ID
    id = id.replace("link", "");
    // Scroll
    $('html,body').animate({
        scrollTop: $("#" + id).offset().top
    },
        'slow');
}


function toFormData(item) {
    var form_data = new FormData();

    for (var key in item) {
        form_data.append(key, item[key]);
    }

    return form_data;
}


function getUrlQString() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}



function AddModalData(title, body, footer) {
    $("#modalHeader").text(title);
    $("#modalBody").html(body);
    $("#modalFooter").html(footer);
}

function DeleteModalData() {
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


function getInputHTML(type, preLabel, postLabel, index, id) {
    //console.log(id);
    var typeAttr = type.split(',');
    var inputTemp = '<div class="form-group"><label class="control-label">#PRE_LABEL#</label><div class=""><div class="input-group"><span class="input-group-addon">#POST_LABEL#</span><input type="#INPUT_TYPE#" id="typeSpecs' + index + '" class="form-control1" placeholder="#PLACEHOLDER#" #ATTR# data-template="' + id + '" ></div></div></div>';
    var checkboxTemp = '<div class="checkbox"> <label> <input type="checkbox" data-template="' + id + '" id="typeSpecs' + index + '" #ATTR#>#PRE_LABEL#</label> </div>';
    if (typeAttr[0] == 'input') {
        inputTemp = inputTemp.replace("#PRE_LABEL#", preLabel);
        inputTemp = inputTemp.replace("#POST_LABEL#", (postLabel != null && postLabel != '') ? postLabel : '');
        inputTemp = inputTemp.replace("#PLACEHOLDER#", preLabel + ' in ' + ((postLabel != null && postLabel != '') ? postLabel : ''));
        inputTemp = inputTemp.replace("#INPUT_TYPE#", typeAttr[1]);
        if (typeAttr.length >= 3 && typeAttr[2] == 'enabled') { inputTemp = inputTemp.replace("#ATTR#", ''); }
        else if (typeAttr.length >= 3 && typeAttr[2] == 'disabled') { inputTemp = inputTemp.replace("#ATTR#", 'disabled'); }
        else { inputTemp = inputTemp.replace("#ATTR#", ''); }
        return inputTemp;
    }
    else if (typeAttr[0] == 'checkbox') {
        checkboxTemp = checkboxTemp.replace("#PRE_LABEL#", preLabel);
        checkboxTemp = checkboxTemp.replace("#POST_LABEL#", (postLabel != null && postLabel != '') ? postLabel : '');
        inputTemp = inputTemp + inputTemp.replace("#INPUT_TYPE#", typeAttr[0]);
        if (typeAttr.length >= 2 && typeAttr[1] == 'enabled') { checkboxTemp = checkboxTemp.replace("#ATTR#", ''); }
        else if (typeAttr.length >= 2 && typeAttr[1] == 'disabled') { checkboxTemp = checkboxTemp.replace("#ATTR#", 'disabled'); }
        else { checkboxTemp = checkboxTemp.replace("#ATTR#", ''); }
        return checkboxTemp;
    }
}


function validateForm(formID) {
    var result = true;
    if (!formID) {
        var forms = $('form');
        for (var u = 0 ; u < forms.size() ; u++) {
            var inputs = $(forms[u]).find("input,select");
            for (var i = 0 ; i < inputs.size() ; i++) {
                if ($(inputs[i]).attr('required') == 'required' || $(inputs[i]).attr('required') == '') {
                    if ($(inputs[i]).is('input')) {
                        if ($(inputs[i]).attr('type') == 'file')
                        {
                            var fileList = document.getElementById($(inputs[i]).attr('id')).files;
                            if(fileList.length <= 0)
                            {
                                if($("#uploadedImagesList").find('li').size() <= 1)
                                {
                                    result = false;
                                }
                                else {
                                    result = true;
                                }
                            }
                            else {
                                result = true;
                            }
                        }
                        else if ($(inputs[i]).val().trim() == '') {
                            $(inputs[i]).css('border', '1px solid red');
                            $(inputs[i]).on('change', function () {
                                if ($(this).val().trim() != '') $(this).css('border', '');
                            });
                            //goToByScroll($(inputs[i]).attr('id'));
                            result = false;
                        } else {
                            $(inputs[i]).css('border', '');
                        }
                    }
                    else if ($(inputs[i]).is('select')) {
                        if ($(inputs[i]).val() == '-1') {
                            $(inputs[i]).css('border', '1px solid red');
                            $(inputs[i]).on('change', function () {
                                if ($(this).val() != '-1') $(this).css('border', '');
                            });
                            // goToByScroll($(inputs[i]).attr('id'));
                            result = false;
                        } else {
                            $(inputs[i]).css('border', '');
                        }
                    }
                }
            }
            //result = true;
        }
    }
    else {
        var inputs = $("#" + formID + " input, #" + formID + " select");
        for (var i = 0 ; i < inputs.size() ; i++) {
            if ($(inputs[i]).attr('required') == 'required' || $(inputs[i]).attr('required') == '') {
                if ($(inputs[i]).is('input')) {
                    if ($(inputs[i]).val().trim() == '') {
                        $(inputs[i]).css('border', '1px solid red');
                        $(inputs[i]).on('change', function () {
                            if ($(this).val().trim() != '') $(this).css('border', '');
                        });
                        //goToByScroll($(inputs[i]).attr('id'));
                        result = false;
                    } else { $(inputs[i]).css('border', ''); }
                }
                else if ($(inputs[i]).is('select')) {
                    if ($(inputs[i]).val() == '-1') {
                        $(inputs[i]).css('border', '1px solid red');
                        //goToByScroll($(inputs[i]).attr('id'));
                        $(inputs[i]).on('change', function () {
                            if ($(this).val() != '-1') $(this).css('border', '');
                        });
                        result = false;
                    } else { $(inputs[i]).css('border', ''); }
                }
            }
        }
        //result = true;
    }
    return result;
}


function jsonToObj(jsonStr, object) {
    try
    {
        var jsonObj = JSON.parse(jsonStr);
        for (var jsonProp in jsonObj) {
            for (var property in object) {
                if (object.hasOwnProperty(jsonProp) && jsonProp == property) {
                    object[property] = jsonObj[jsonProp];
                }
            }
        }
        return object;
    }
    catch (e) { console.log("Exception in jsonToObj"); console.log(e); eval(jsonStr); return '';}
}

function jsonToObjList(jsonStr, object) {
    try {
        var objList = new Array();
        var jsonObjList = JSON.parse(jsonStr);
        for (var i = 0 ; i < jsonObjList.length ; i++) {
            var jsonObj = jsonObjList[i];
            var objTemp = clone(object);
            for (var jsonProp in jsonObj) {

                for (var property in objTemp) {
                    if (objTemp.hasOwnProperty(jsonProp) && jsonProp == property) {
                        objTemp[property] = jsonObj[jsonProp];
                    }
                }
            }
            objList.push(objTemp);
        }
        return objList        
    }
    catch (e) { console.log("Exception in jsonToObjList"); console.log(e); eval(jsonStr); return ''; }
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
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



function getImageFileFromInput(inputID, folder, prodName)
{
    //imagesList
    var filesList = new Array();
    var file = document.getElementById(inputID);
    if (file.files != null && file.files.length != 0) {
        var filetype = file.files[0].type;
        if (filetype.indexOf("image") != -1 || filetype.indexOf("pdf") != -1) {
            for (var i = 0; i < file.files.length; i++) {
                //filesList.push(file.files[i]);
                var fileObj = new IMAGE_OBJECT();
                // Naming of image files is as follow:
                // /UploadedImages/Products/Products_flyerID_ProdNAmeEN_fileName.ext
                fileObj.fileName = "/UploadedImages/" + folder + "/" + folder + "_" + prodName + "_" +   file.files[i].name;
                fileObj.productName = prodName;
                fileObj.imageFile = file.files[i];
                filesList.push(fileObj);
            }
        }
        else {
            alert('Please Upload a valid file image/PDF');
            return false;
        }
    }
    else if ((file.files == null || file.files.length == 0) && imagesList.length > 0)
    {
        for (var i = 0; i < imagesList.length; i++) {
            var fileObj = new IMAGE_OBJECT();
            // Naming of image files is as follow:
            // /UploadedImages/Products/Products_flyerID_ProdNAmeEN_fileName.ext
            fileObj.fileName = "/UploadedImages/" + folder + "/" + folder + "_" + prodName + "_" + makeNameRNDM() + ".PNG";
            fileObj.productName = prodName;
            fileObj.imageFile = imagesList[i];
            filesList.push(fileObj);
        }
    }
    else if ($("#uploadedImagesList li").size() > 1)
    {
        var imgsStr = '';
        for (var i = 0 ; i < $("#uploadedImagesList li a").size() ; i++)
        {
            imgsStr += $($("#uploadedImagesList li a")[i]).attr('href');
        }
        filesList.push(imgsStr);
    }
    else
    {
        alert('Please Upload File');
        return false;
    }
    return filesList;
}


function makeNameRNDM() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}