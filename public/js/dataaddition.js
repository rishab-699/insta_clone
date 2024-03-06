function VALIDATE(){
    var book = document.getElementById("name").value;
    var xhr;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }
    else if(window.ActiveXObject){
        xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    var data= "book_name="+ book;
    xhr.open("POST", "", true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(data);
    xhr.onreadystatechange = display_block;
    
    function display_block(){
        if(xhr.readyState==4){
            if(xhr.status==200){
              // document.getElementById("suggessions").innerHTML=xhr.responseText;
               document.getElementById("name").value=xhr.responseText;
               
            }
        }
    }
}
function temp_user_profile(){
    document.getElementById("profile").style.display = "none";
    document.getElementById("home").style.display = "none";
    document.getElementById("profile-settings").style.display = "none";
    document.getElementById("explore").style.display = "none";
    document.getElementById("upload").style.display = "none";
    document.getElementById("temp_profile").style.display = "contents";
}
function profile(){
  document.getElementById("profile").style.display = "contents";
  document.getElementById("home").style.display = "none";
  document.getElementById("profile-settings").style.display = "none";
  document.getElementById("explore").style.display = "none";
  document.getElementById("upload").style.display = "none";
  document.getElementById("temp_profile").style.display = "none";
}

function get_profile(user, username){
// Define the URL you want to send the POST request to
const url = 'http://127.0.0.1:8000/temp_profile';

// Define the data you want to send in the request body (as a JavaScript object)
const data = {
  temp_user: user,
  username: username
};
console.log(data);

// Create a request configuration object
const requestOptions = {
  method: 'POST', // Specify the HTTP method
  headers: {
    'Content-Type': 'application/json', // Set the content type to JSON
    // You may need to include additional headers as needed
  },
  body: JSON.stringify(data) // Convert the data object to JSON and set it as the request body
};

// Send the POST request
fetch(url, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response as JSON if applicable
  })
  .then(data => {
    // Handle the response data here
    get_temp_profile(data);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('There was a problem with the fetch operation:', error);
  });
}

async function get_temp_profile(temp_user){
    console.log(temp_user);
    if(temp_user.temp_data[0].userName === temp_user.data[0].userName){
        profile();
    }else{
    temp_user_profile();
    let t_elements = '<p> <span id="t-post">'+temp_user.followlist[0].postCount+'</span> posts</p> <p><span id="t-followers">'+
    temp_user.followlist[0].followerCount+'</span> followers</p><p><span id="t-following">'+
    temp_user.followlist[0].followingCount+'</span> following</p>'; 
    document.getElementById("temp_img").src = temp_user.temp_data[0].profile;
    document.getElementById("temp_userName").innerHTML = '<p id="temp_userName">'+temp_user.temp_data[0].userName+'</p>';
    document.getElementById("user").value =  temp_user.temp_data[0].userName
    document.getElementById("counts").innerHTML = t_elements;
    document.getElementById("personal").innerHTML = '<h5>'+temp_user.temp_data[0].fullName+'</h5> <p>'+temp_user.temp_data[0].bio+'</p>';
    let isMatchFound = false;
    for(let i=0;i<Object.keys(temp_user.followerslist).length; i++){
      console.log('temp user:');
      console.log(temp_user.followerslist[i].follower);
      console.log('data user:');
      console.log(temp_user.data[0].userName);
      if (temp_user.data[0].userName === temp_user.followerslist[i].follower) {
        // If a match is found, set the flag and break out of the loop
        isMatchFound = true;
        break;
      }
    }
    console.log(isMatchFound);
    if (isMatchFound) {
      document.getElementById("unfollow-button").style.display = "inline";
      document.getElementById("unfollow-button").addEventListener("click", function() {
        document.getElementById("follow").submit();
      });
  document.getElementById("follow-button").style.display = "none";
    } else {
      document.getElementById("follow-button").style.display = "inline";
      document.getElementById("follow-button").addEventListener("click", function() {
        document.getElementById("follow").submit();
      });
  document.getElementById("unfollow-button").style.display = "none";
    }
    Object.values(temp_user).forEach(array => {
        array.forEach(item => {
            if(!(item.postSrc == undefined)){
            const position = 'beforeend';
            document.getElementById("posts").insertAdjacentHTML(position,'<div class="account-img"> <img  src="'+item.postSrc+'" alt=""/> </div>');
            }
        });
      });
    }
      temp_user = null;
      
    console.log("this is the temp user"+temp_user);

}

function postlikes(postid,username){
  const url = 'http://127.0.0.1:8000/postlike';

// Define the data you want to send in the request body (as a JavaScript object)
const data = {
  postid: postid,
  username: username
};
console.log(data);

// Create a request configuration object
const requestOptions = {
  method: 'POST', // Specify the HTTP method
  headers: {
    'Content-Type': 'application/json', // Set the content type to JSON
    // You may need to include additional headers as needed
  },
  body: JSON.stringify(data) // Convert the data object to JSON and set it as the request body
};

// Send the POST request
fetch(url, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response as JSON if applicable
  })
  .then(data => {
    // Handle the response data here
    console.log(data)
    let like = "like"+data.postdata.postid;
    let dislike = "dislike"+data.postdata.postid;
    let likeElement = document.getElementById(like);
    let dislikeElement = document.getElementById(dislike);
  
    if (likeElement && dislikeElement) {
      likeElement.style.display = "none";
      dislikeElement.style.display = "block";
    } else {
      console.log("One or both elements not found.");
      console.log(like);
      console.log(dislike);
    }
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('There was a problem with the fetch operation:', error);
  });
}
function postdislikes(postid,username){
  const url = 'http://127.0.0.1:8000/postdislike';

// Define the data you want to send in the request body (as a JavaScript object)
const data = {
  postid: postid,
  username: username
};
console.log(data);

// Create a request configuration object
const requestOptions = {
  method: 'POST', // Specify the HTTP method
  headers: {
    'Content-Type': 'application/json', // Set the content type to JSON
    // You may need to include additional headers as needed
  },
  body: JSON.stringify(data) // Convert the data object to JSON and set it as the request body
};

// Send the POST request
fetch(url, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response as JSON if applicable
  })
  .then(data => {
    // Handle the response data here
    console.log(data)
    let like = "like"+data.postdata.postid;
    let dislike = "dislike"+data.postdata.postid;
    let likeElement = document.getElementById(like);
    let dislikeElement = document.getElementById(dislike);
  
    if (likeElement && dislikeElement) {
      likeElement.style.display = "none";
      dislikeElement.style.display = "block";
    } else {
      console.log("One or both elements not found.");
      console.log(like);
      console.log(dislike);
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

async function comment(postid,accountuser,postuser){
  console.log('postid:'+postid);
  console.log('account user:'+accountuser);
  console.log('post user:'+postuser);
  const url = 'http://127.0.0.1:8000/postcomment';
  const data = {
    postid: postid,
    accountuser: accountuser,
    postuser: postuser
  };
  const requestOptions = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(data) 
  };
  fetch(url, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    document.getElementById('post-user').src = data.postdetails[0].postsrc;
    document.getElementById('postuser').src = data.postdetails[0].profile;
    document.getElementById('post-username').textContent = data.postdetails[0].username;
    document.getElementById('l-count').textContent = data.likesCount[0].likesCount;
    document.getElementById('p-id').value = data.postdetails[0].postid;
    document.getElementById('comt-user').src = data.postdetails[0].profile;
    document.getElementById('commt-usrname').textContent = data.postdetails[0].username;
    document.getElementById('commt').textContent = data.postdetails[0].caption;
    let commentHtml;
    data.postcomment.forEach(comments =>{
     commentHtml = `
    <div class="account-info">
      <div class="profile">
        <img src="${comments.profile}" id="comt-user" alt="">
      </div>
      <div class="comments">
        <p id="commt-usrname">${comments.username}</p>
        <p id="commt">${comments.comment}</p>
      </div>
    </div>
  `;

  // Append the commentHtml to the 'get-comments' element
  document.getElementById('get-comments').insertAdjacentHTML('beforeend', commentHtml);
      
    })
    document.getElementById("maincontent").style.opacity = "50%";
  document.getElementById("commenttab").style.display = "flex";
  commentHtml = undefined;
    })
  
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  
}

function commenttab(){
  document.getElementById("maincontent").style.opacity = "100%";
  document.getElementById("commenttab").style.display = "none";
  document.getElementById('get-comments').innerHTML = '';
}

async function followerList(accountuser){
 
  const url = 'http://127.0.0.1:8000/followerList';
  const data = {
    accountuser: accountuser
  };
  const requestOptions = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(data) 
  };
  fetch(url, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    let commentHtml;
    const dataArray = data.data;
    dataArray.forEach(followers =>{
     commentHtml = `
    <div class="account-info">
      <div class="profile">
        <img src="${followers.profile}" id="comt-user" alt="">
      </div>
      <div class="comments">
        <p id="commt-usrname">${followers.follower}</p>
      </div>
    </div>
  `;
  document.getElementById('get-followerList').insertAdjacentHTML('beforeend', commentHtml);
      
    })
    document.getElementById("maincontent").style.opacity = "50%";
  document.getElementById("followerListtab").style.display = "flex";
  commentHtml = undefined;
    })
  
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  
}
function followertab(){
  document.getElementById("maincontent").style.opacity = "100%";
  document.getElementById("followerListtab").style.display = "none";
  document.getElementById('get-followerList').innerHTML = '';
}

async function followingList(accountuser){
 
  const url = 'http://127.0.0.1:8000/followingList';
  const data = {
    accountuser: accountuser
  };
  const requestOptions = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(data) 
  };
  fetch(url, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    let commentHtml;
    const dataArray = data.data;
    dataArray.forEach(followers =>{
     commentHtml = `
    <div class="account-info">
      <div class="profile">
        <img src="${followers.profile}" id="comt-user" alt="">
      </div>
      <div class="comments">
        <p id="commt-usrname">${followers.following}</p>
      </div>
    </div>
  `;
  document.getElementById('get-followingList').insertAdjacentHTML('beforeend', commentHtml);
      
    })
    document.getElementById("maincontent").style.opacity = "50%";
  document.getElementById("followingListtab").style.display = "flex";
  commentHtml = undefined;
    })
  
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  
}
function followingtab(){
  document.getElementById("maincontent").style.opacity = "100%";
  document.getElementById("followingListtab").style.display = "none";
  document.getElementById('get-followingList').innerHTML = '';
}