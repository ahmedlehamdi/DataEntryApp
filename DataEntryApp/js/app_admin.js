


$(document).ready(function () {
    var userType = localStorage.getItem("UType");
    if(userType == "SuperAdmin")
    {
        $("#userListDiv").removeClass('hidden');
        $("#userListDiv").on('click', function () {
            window.location = '/Pages/UserManagment.aspx';
        });
    }
    else {
        $("#userListDiv").remove();
    }

});

function showEditPasswordModal() {
    var body = '<div class="form-body"><form id="editPassword" method="post"> <div class="form-group"> <label for="oldPSW">Old Password</label> <input type="password" data-validation="required  alphanumeric" class="form-control" id="oldPSW" placeholder="Old Password"> </div><div class="form-group"> <label for="newPSW">New Password</label> <input type="password" required="" data-validation="required  alphanumeric" class="form-control" id="newPSW" placeholder="New Password"> </div><div class="form-group"> <label for="cfmNewPSW">Confirm New Password</label> <input type="password" required="" data-validation="required  alphanumeric" id="cfmNewPSW" class="form-control" placeholder="Confirm New Password"> </div></form> </div>';
    var footer = '<button type="submit" class="btn btn-info" onclick="saveNewPassword()" >Save</button><button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
    AddModalData('Edit Password', body, footer);
    $.validate({
        lang: 'en'
    });
    showModal('myModal');
}


function saveNewPassword() {
    AjaxCall("../Pages/Home_Admin.aspx?fnID=16&newPassword=" + $("#newPSW").val() + "&newPasswordRepeated=" + $("#cfmNewPSW").val() + "&oldPassword=" + $("#oldPSW").val()
       , function (data) {
           var output = false;
           eval(data);
           if (output) {
               hideModal('myModal');
           }
       });
}





function ShowNewUserModel() {
    var body = '<div class="form-body"><form> <div class="form-group"> <label for="userName">User Name</label> <input type="text" class="form-control" id="userName" placeholder="User Name "> </div><div class="form-group"> <label for="password">User Password</label> <input type="password" class="form-control" id="password" placeholder="User Password"> </div><div class="form-group"> <label for="userType">User Type</label> <select name="userType" id="userType" class="form-control1"><option value="1">Data Entry</option><option value="2">Admin</option></select> </div></form> </div>';
    var footer = '<button type="button" class="btn btn-info" onclick="addNewUser()" >Save</button><button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
    AddModalData('Add New User', body, footer);
    showModal('myModal');
}

function addNewUser() {
    AjaxCall("../Pages/UserManagment.aspx?fnID=20&userName=" + $("#modalBody #userName").val() + "&userPassword=" + $("#modalBody #password").val() + "&UserType=" + $("#modalBody #userType").val()
     , function (data) {
         eval(data);
         hideModal('myModal');
     });

}


function approveRejectFlyer(flag, flyerID) {
    AjaxCall("../Pages/FlyerDetails_Admin.aspx?fnID=17&flyerID=" + flyerID + "&flag=" + flag
      , function (data) {
          var output = false;
          eval(data);
      });
}

function loadUsersList() {
    AjaxCall("../Pages/UserManagment.aspx?fnID=18"
     , function (data) {
         var usersList = '';
         eval(data);
         if (usersList != '') {
             $("#usersTBody").html('');
             var template = '<tr><td>#USERNAME#</td><td>#USERTYPE#</td><td>#USERPASSWORD#</td></tr>';
             for (var i = 0 ; i < usersList.length ; i++) {
                 var temp = template;
                 temp = temp.replace("#USERNAME#", usersList[i].USER_NAME);
                 temp = temp.replace("#USERTYPE#", usersList[i].USER_TYPE);
                 temp = temp.replace("#USERPASSWORD#", "<button data-uid='" + usersList[i].USER_ID + "' class='btn btn-default btn-info' onclick='confirmShowPassword($(this));'>Show Password</button>");
                 $("#usersTBody").append(temp);
             }
             applyDa
         }
     });
}

function confirmShowPassword(obj) {
    var body = '<div class="form-body"><form> <div class="form-group"> <label for="userpassword">User Pasword</label> <input type="password" class="form-control" id="userpassword" name="userpassword" placeholder="User Password"/> </div></form> </div>';
    var footer = '<button type="button" class="btn btn-info" onclick="showPassword(' + $(obj).attr('data-uid') + ')" id="validateConfirmBtn">Confirm</button><button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
    AddModalData('Validation ', body, footer);
    showModal('myModal');
}


function showPassword(data) {
    AjaxCall("../Pages/UserManagment.aspx?fnID=19&enteredPassword=" + $("#userpassword").val() + "&uID=" + data
     , function (data) {
         eval(data);
     });
}


function loadDeleteFlyerModal(flyerID, index) {
    var body = '<h3>Are You Sure You Want to Delete Flyer ?</h3>';
    var footer = '<button type="button" class="btn btn-danger" onclick="DeleteFlyer(' + flyerID + ', \'' + index + '\')" >Delete</button><button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
    AddModalData("Delete Flyer", body, footer);
    showModal('myModal');
}

function DeleteFlyer(flyerID, index) {
    AjaxCall("../Pages/Home_Admin.aspx?fnID=15&flyerID=" + flyerID
       , function (data) {
           var output = false;
           eval(data);
           if (output) {
               $("[data-index='" + index + "']").parents('tr').remove().fadeOut();
               hideModal('myModal');
           }
       });
}