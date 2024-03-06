document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("home").style.display = "contents";
    document.getElementById("profile").style.display = "none";
    document.getElementById("profile-settings").style.display = "none";
    document.getElementById("explore").style.display = "none";
    document.getElementById("upload").style.display = "none";
    document.getElementById("temp_profile").style.display = "none";
});

function home(){
    console.log("clicked");
    document.getElementById("home").style.display = "contents";
    document.getElementById("profile").style.display = "none";
    document.getElementById("profile-settings").style.display = "none";
    document.getElementById("explore").style.display = "none";
    document.getElementById("upload").style.display = "none";
    document.getElementById("temp_profile").style.display = "none";
}
function profile(){
    document.getElementById("profile").style.display = "contents";
    document.getElementById("home").style.display = "none";
    document.getElementById("profile-settings").style.display = "none";
    document.getElementById("explore").style.display = "none";
    document.getElementById("upload").style.display = "none";
    document.getElementById("temp_profile").style.display = "none";
}
function explore(){
    document.getElementById("profile").style.display = "none";
    document.getElementById("home").style.display = "none";
    document.getElementById("profile-settings").style.display = "none";
    document.getElementById("explore").style.display = "contents";
    document.getElementById("upload").style.display = "none";
    document.getElementById("temp_profile").style.display = "none";
}
function settings(){
    document.getElementById("profile").style.display = "none";
    document.getElementById("home").style.display = "none";
    document.getElementById("profile-settings").style.display = "flex";
    document.getElementById("explore").style.display = "none";
    document.getElementById("upload").style.display = "none";
    document.getElementById("temp_profile").style.display = "none";
}

function upload(){
    document.getElementById("profile").style.display = "none";
    document.getElementById("home").style.display = "none";
    document.getElementById("profile-settings").style.display = "none";
    document.getElementById("explore").style.display = "none";
    document.getElementById("upload").style.display = "flex";
    document.getElementById("temp_profile").style.display = "none";
}

var loadFile = function(event) {
	var image = document.getElementById('uploadfile');
	image.src = URL.createObjectURL(event.target.files[0]);
};