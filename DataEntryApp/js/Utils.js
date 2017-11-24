﻿
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
    if (!formID) {
        var forms = $('body form');
        for (var u = 0 ; u < forms.size() ; u++) {
            var inputs = $(forms[u]).find("input,select");
            for (var i = 0 ; i < inputs.size() ; i++) {
                if ($(inputs[i]).attr('required') == 'required' || $(inputs[i]).attr('required') == '') {
                    if ($(inputs[i]).val().trim() == '') {
                        $(inputs[i]).css('border', '1px solid red');
                        goToByScroll($(inputs[i]).attr('id'));
                        return false;
                    } else {
                        $(inputs[i]).css('border', '');
                    }
                    if ($(inputs[i]).val() == '-1') {
                        $(inputs[i]).css('border', '1px solid red');
                        goToByScroll($(inputs[i]).attr('id'));
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
                    goToByScroll($(inputs[i]).attr('id'));
                    return false;
                } else { $(inputs[i]).css('border', ''); }
                if ($(inputs[i]).val() == '-1') {
                    $(inputs[i]).css('border', '1px solid red');
                    goToByScroll($(inputs[i]).attr('id'));
                    return false;
                } else { $(inputs[i]).css('border', ''); }
            }
        }
        return true;
    }
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
    catch (e) { console.log("Exception in jsonToObj"); console.log(e); }
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
    catch (e) { console.log("Exception in jsonToObjList"); console.log(e); }
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



function getImageFileFromInput(inputID)
{
    var filesList = new Array();
    var file = document.getElementById(inputID);
    if (file.files != null && file.files.length != 0) {
        var filetype = file.files[0].type;
        if (filetype.indexOf("image") != -1 || filetype.indexOf("pdf") != -1) {
            for (var i = 0; i < file.files.length; i++) {
                filesList.push(file.files[i]);
            }
        }
        else {
            alert('Please Upload a valid file image/PDF');
            return false;
        }
    }
    else {
        alert('Please Upload File');
        return false;
    }
    return filesList;
}