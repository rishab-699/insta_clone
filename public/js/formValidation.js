let data;
function getdata(dataString) {
    try {
        data = JSON.parse(dataString);
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
}
function formvalidate() {
    const email = document.getElementById('email').value;
    const fullname = document.getElementById('fullname').value;
    const userid = document.getElementById('userID').value;
    const password = document.getElementById('password').value;
    
    let usernameexist;
    for(let i=0; i<data.length; i++){
        if(userid === data[i].userName){
            usernameexist = true;
        }else{
            usernameexist = false;
        }
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
        document.getElementById('emailErr').innerHTML = "<h5>Email is not valid</h5>";
        console.log(data);
        event.preventDefault();
        return false;
    } else {
        document.getElementById('emailErr').innerHTML = "";
    }

    const fullnamePattern = /^[a-zA-Z\s.'-]+$/;
    if (!fullname.match(fullnamePattern)) {
        document.getElementById('nameErr').innerHTML = "<h5>Full name is not valid</h5>";
        event.preventDefault();
        return false;
    } else {
        document.getElementById('nameErr').innerHTML = "";
    }

    const useridPattern = /^[a-zA-Z0-9_]+$/;
    if (!userid.match(useridPattern)) {
        document.getElementById('userErr').innerHTML = "<h5>Username is not valid</h5>";
        event.preventDefault();
        return false;
    } else if(usernameexist === true){
        document.getElementById('userErr').innerHTML = "<h5>Username already exists</h5>";
        event.preventDefault();
        return false;
    }else {
        document.getElementById('userErr').innerHTML = "";
    }

    if (password.length < 8) {
        document.getElementById('passwordErr').innerHTML = "<h5>Password must be at least 8 characters long</h5>";
        event.preventDefault();
        return false;
    } else {
        document.getElementById('passwordErr').innerHTML = "";
    }

    
    return true;
}

