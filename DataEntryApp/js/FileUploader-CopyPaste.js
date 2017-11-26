document.addEventListener("DOMContentLoaded", function() {
    var pasteTarget = document.getElementById("pasteTarget");
	
    pasteTarget.addEventListener("paste", handlePaste);
});

function handlePaste(e) {
    for (var i = 0 ; i < e.clipboardData.items.length ; i++) {
        var item = e.clipboardData.items[i];
        console.log("Item type: " + item.type);
        if (item.type.indexOf("image") != -1) {
            uploadFile(item.getAsFile());
        } else {
            alert("Discarding non-image paste data");
        }
    }
}
var filesCount = 0;
function uploadFile(file) {
    //var xhr = new XMLHttpRequest();
    //console.log("test");
    //console.log(file);
	 
    var reader = new FileReader();

    reader.onload = function(e) {
        $('#pasteTarget').html("<img src='' id='imgy' style='width:100%;height:100%;' />");
        $("#imgy").attr('src', e.target.result);
        $("#uploadedImagesList").append("<li>File_" + filesCount + "</li>");
        imagesList.push(file);
        filesCount++;
    }
    reader.readAsDataURL(file);

	
	
    //<!-- xhr.upload.onprogress = function(e) { -->
    //    <!-- var percentComplete = (e.loaded / e.total) * 100; -->
    //    <!-- console.log("Uploaded: " + percentComplete + "%"); -->
    //<!-- }; -->

    //<!-- xhr.onload = function() { -->
    //    <!-- if (xhr.status == 200) { -->
    //        <!-- alert("Sucess! Upload completed.\n\n" + xhr.responseText); -->
    //    <!-- } else { -->
    //        <!-- alert("Error! Upload failed"); -->
    //    <!-- } -->
    //<!-- }; -->

    //<!-- xhr.onerror = function() { -->
    //    <!-- alert("Error! Upload failed. Can not connect to server."); -->
    //<!-- }; -->

    //<!-- xhr.open("POST", "FileUploader", true); -->
    //<!-- xhr.setRequestHeader("Content-Type", file.type); -->
    //<!-- xhr.send(file); -->
    }