const mysql = require('mysql2');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rishab0123",
    database: "instagram"
});

function connect(){
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
}

function user_entry(email, fullname, username, password){

    sql = "insert into user(username,fullname,email,password,profile)"+
            "values('"+username+"','"+fullname+"','"+email+"','"+password+"','Userprofile.svg')";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                
              });
}

function user_update(username, fullname, bio, email, contact, profile){
    
    sql = "update user set fullName='"+fullname+"', email='"+email+"', bio='"+bio+"', mobileNo='"+contact+"', profile='"+profile+"'"+
            "where userName= '"+username+"'";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                
              });
}

async function login( username, password){
    return new Promise((resolve, reject) => {
    sql = "select password from user where userName='"+username+"'";
    con.query(sql,function(err,result,fields){
        con.query(sql, function (err, result, fields) {
            try {
                if (err) {
                    console.log("An error occurred while executing the query:", err);
                    // Handle the error gracefully here, e.g., return false or do something else.
                    resolve("username doesnot exist");
                } else {
                    console.log('your query here: ' + sql);
                    if (result && result[0].password === password) {
                        resolve(true);
                    } else {
                        resolve("password does not exist");
                    }
                }
            } catch (error) {
                console.log("An unexpected error occurred:", error);
                // Handle the unexpected error gracefully here.
                resolve("username doesnot exist");
            }
        });
    });
});
}
async function getusername(){
    return new Promise((resolve, reject) => {
    sql = "select userName from user";
    con.query(sql,function(err,result,fields){
        if(err){
            alert('username does not exist');
        }
        console.log('your user deitals query here: '+sql);
        console.log(result);

        if(result){
            setTimeout(() => {
                resolve(result); // Resolve the Promise with the object
            }, 100);
        }else{
            reject('password does not exist');
        }
    });
});
}
async function getUserDetiails( username){
    return new Promise((resolve, reject) => {
    sql = "select * from user where userName='"+username+"'";
    con.query(sql,function(err,result,fields){
        if(err){
            alert('username does not exist');
        }
        console.log('your user deitals query here: '+sql);
        console.log(result);

        if(result){
            setTimeout(() => {
                resolve(result); // Resolve the Promise with the object
            }, 1000);
        }else{
            reject('password does not exist');
        }
    });
});
}
async function getUsercounts( username){
    return new Promise((resolve, reject) => {
    sql = "SELECT COUNT(DISTINCT p.postId) AS postCount, COUNT(DISTINCT fo.follower) AS followerCount, COUNT(DISTINCT fi.following) AS followingCount"+
        " FROM user u LEFT JOIN posts p ON u.userName = p.userName LEFT JOIN userFollowers fo ON u.userName = fo.userName"+
        " LEFT JOIN userFollowings fi ON u.userName = fi.userName"+
        " WHERE u.userName = '"+username+"'GROUP BY u.userName;";
    con.query(sql,function(err,result,fields){
        if(err){
            console.log(err);
        }
        console.log('your user deitals query here: '+sql);
        console.log(result);

        if(result){
            setTimeout(() => {
                resolve(result); // Resolve the Promise with the object
            }, 1000);
        }else{
            reject('no records found');
        }
    });
});
}
async function getfollowingDetails( username){
    return new Promise((resolve, reject) => {
    sql = "select * from userfollowers where userName='"+username+"'";
    con.query(sql,function(err,result,fields){
        if(err){
            alert('username does not exist');
        }
        console.log('your user deitals query here: '+sql);
        console.log(result);

        if(result){
            setTimeout(() => {
                resolve(result); // Resolve the Promise with the object
            }, 1000);
        }else{
            reject('no details');
        }
    });
});
}
//posts related functions

function posts_entry(username, postsrc, caption){

    sql = "insert into posts(username,postsrc,caption)"+
            "values('"+username+"','"+postsrc+"','"+caption+"')";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                
              });
}
function follow_entry(username, followername){

    sql = "insert into userfollowers(username, follower)"+
            "values('"+username+"','"+followername+"')";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted follower");
              });
              sql = "insert into userfollowings(username, following)"+
            "values('"+followername+"','"+username+"')";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted following");
              });
}
function follow_deletion(username, followername){

    sql = "delete from userfollowers where username='"+username+"'and follower='"+followername+"'";
    console.log('follower query:'+sql);
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted follower");
              });
              sql = "delete from userfollowings where username='"+followername+"'and following='"+username+"'";
              console.log('follower query:'+sql);
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted following");
              });
}
async function getUserposts( username){
    return new Promise((resolve, reject) => {
    sql = "select * from posts where userName='"+username+"'";
    con.query(sql,function(err,result,fields){
        
        console.log('your user deitals query here: '+sql);
        console.log(result);

        if(result){
            setTimeout(() => {
                resolve(result); // Resolve the Promise with the object
            }, 1000);
        }else{
            reject('password does not exist');
        }
    });
});
}

async function getrandomposts(){
    return new Promise((resolve, reject) => {
    sql = "select u.userName, postId, postSrc, caption, profile from user u, posts p WHERE u.userName = p.userName";
    con.query(sql,function(err,result,fields){
        
        console.log('your user deitals query here: '+sql);
        console.log(result);

        if(result){
            setTimeout(() => {
                resolve(result); // Resolve the Promise with the object
            }, 1000);
        }else{
            reject('password does not exist');
        }
    });
});
}
function postlike_entry(postid, username){

    sql = "insert into postslikes(postid, userName)"+
            "values("+postid+",'"+username+"')";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted ppostslikes");
              });
}
function postlike_delete(postid, username){

    sql = "delete from postslikes"+
            " where postId='"+postid+"' and userName='"+username+"'";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted ppostslikes");
              });
}
async function getpostlikecount( postid){
    return new Promise((resolve, reject) => {
    sql = "select count(postId) as likesCount from postslikes where postId='"+postid+"'";
    con.query(sql,function(err,result,fields){
        
        console.log('your user deitals query here: '+sql);
        console.log(result);

        if(result){
            setTimeout(() => {
                resolve(result); // Resolve the Promise with the object
            }, 1000);
        }else{
            reject('password does not exist');
        }
    });
});
}
async function getpostuser( postid){
    return new Promise((resolve, reject) => {
    sql = "select postid,caption,postsrc,u.username,profile from posts p, user u where p.username = u.username and postid="+postid;
    con.query(sql,function(err,result,fields){
        
        console.log('your user deitals query here: '+sql);
        console.log(result);

        if(result){
            setTimeout(() => {
                resolve(result); // Resolve the Promise with the object
            }, 1000);
        }else{
            reject('password does not exist');
        }
    });
});
}
async function getpostcomment( postid){
    return new Promise((resolve, reject) => {
    sql = "select comment,u.username,profile from postscomments pc, user u where pc.username = u.username and postid="+postid;
    con.query(sql,function(err,result,fields){
        
        console.log('your user deitals query here: '+sql);
        console.log(result);

        if(result){
            setTimeout(() => {
                resolve(result); // Resolve the Promise with the object
            }, 1000);
        }else{
            reject('password does not exist');
        }
    });
});
}
async function postcomment_entry(postid, username, comment){

    sql = "insert into postscomments(postId, userName, comment)"+
            "values('"+postid+"','"+username+"','"+comment+"')";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted ppostslikes");
              });
}
async function getfollowers( userid){
    return new Promise((resolve, reject) => {
    sql = "select follower, profile from userfollowers uf, user u where u.username = follower and uf.username='"+userid+"'";
    con.query(sql,function(err,result,fields){
        
        console.log('your user deitals query here: '+sql);
        console.log(result);

        if(result){
            setTimeout(() => {
                resolve(result); // Resolve the Promise with the object
            }, 1000);
        }else{
            reject('nofollowers');
        }
    });
});
}
async function getfollowing( userid){
    return new Promise((resolve, reject) => {
    sql = "select following, profile from userfollowings uf, user u where u.username = following and uf.username='"+userid+"'";
    con.query(sql,function(err,result,fields){
        
        console.log('your user deitals query here: '+sql);
        console.log(result);

        if(result){
            setTimeout(() => {
                resolve(result); // Resolve the Promise with the object
            }, 1000);
        }else{
            reject('nofollowers');
        }
    });
});
}

module.exports = {
    con: connect(),
    user_entry: user_entry,
    login: login,
    getDetails: getUserDetiails,
    user_update: user_update,
    posts_entry: posts_entry,
    getposts: getUserposts,
    getUsercounts: getUsercounts,
    getrandom: getrandomposts,
    follow_entry: follow_entry,
    getfollowingDetails: getfollowingDetails,
    follow_deletion:follow_deletion,
    postlike_entry: postlike_entry,
    postlike_delete: postlike_delete,
    getpostlikecount: getpostlikecount,
    getpostuser: getpostuser,
    getpostcomment: getpostcomment,
    postcomment_entry: postcomment_entry,
    getusername: getusername,
    getfollowers: getfollowers,
    getfollowing: getfollowing
}