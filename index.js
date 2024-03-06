const express = require('express');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const db = require('./server-db');
var formidable = require('formidable');


db.con;
const app = express();
const hostname = '127.0.0.1';
const port = 8000;
app.set("view engine", "hbs");
app.set("views", "./view");
app.use(express.static(__dirname + "/public/css"));
app.use(express.static(__dirname + "/public/img/Logo"));
app.use(express.static(__dirname + "/public/img/SVG"));
app.use(express.static(__dirname + "/public/img/profiles"));
app.use(express.static(__dirname + "/public/img/posts", {
    setHeaders: (res, path) => {
        const extension = path.split(".").pop().toLowerCase();
        const contentType = {
          "jpg": "image/jpeg",
          "jpeg": "image/jpeg",
          "png": "image/png",
          "gif": "image/gif"
          // Add more extensions and MIME types as needed
        };
        
        if (contentType[extension]) {
          res.setHeader("Content-Type", contentType[extension]);
        }
      }
  }));
app.use(express.static(__dirname + "/public/js"));
//pages configuration

app.get("/",(req, res) => {
    res.render('index')
});
app.get("/signup",async (req, res) => {
    data = await db.getusername();
    const jsonString = JSON.stringify(data);
    res.render('signup',{data:jsonString})
});
app.get("/home",(req, res) => {
    res.render('home')
});

//form submitions post requests
let data,posts,followlist,followers, random;
app.post('/signup', (req, res) => {
    let userdata = '';
        req.on('data', chunk => {
            userdata = chunk.toString();
        });
        req.on('end', async () => {
                const parsedData = querystring.parse(userdata);
                console.log(parsedData);
                db.user_entry(parsedData.email, parsedData.fullname, parsedData.userID, parsedData.password);
                data = await db.getDetails(parsedData.userID);
                posts = await db.getposts(parsedData.userID);
                followlist = await db.getUsercounts(parsedData.userID);
            console.log(data);
            res.render('home', {data:data, posts:posts, followlist:followlist});
        });
});
app.post('/home-update', (req, res) => {
    var form = new formidable.IncomingForm();
    let profile;

    form.parse(req, async function (err, fields, files) {
        if (err) {
            console.error('Error parsing form data:', err);
            return res.status(500).send('Error parsing form data');
        }
                console.log(files.filetoupload[0].filepath);
                console.log('Files:', files);
                var oldpath = files.filetoupload[0].filepath;
                console.log(oldpath);
                var newpath = "./public/img/profiles/"+files.filetoupload[0].originalFilename;
                const readStream = fs.createReadStream(oldpath);
                const writeStream = fs.createWriteStream(newpath);

      // Pipe the read stream to the write stream to copy the file
      readStream.pipe(writeStream);
                profile = files.filetoupload[0].originalFilename;


      // When the file copying is complete, close the streams and delete the temporary file
      readStream.on('end', function () {
        // Close the read and write streams
        readStream.close();
        writeStream.close();

        // Delete the temporary file
        fs.unlink(oldpath, function (err) {
          if (err) throw err;
        });
    });
            console.log(profile);
                console.log('Fields:', fields);
                
                db.user_update(fields.userid, fields.username, fields.bio, fields.email, fields.contactno, profile);
                data = await db.getDetails(fields.userid);
                
            console.log(data);
            res.render('home', {data:data, posts:posts, followlist:followlist});
        });

                
        });

app.post('/login', async(req,res)=>{
    let userdata = '';
    req.on('data', chunk => {
        userdata = chunk.toString();
    });
    req.on('end', async () => {
        const parsedData = querystring.parse(userdata);
        const result = await db.login(parsedData.userID, parsedData.password);
        if (result === true) {
            data = await db.getDetails(parsedData.userID);
            posts = await db.getposts(parsedData.userID);
            followlist = await db.getUsercounts(parsedData.userID);
            random = await db.getrandom();
            res.render('home', {data:data, posts:posts, followlist:followlist, random:random});
        }else{
            console.log("result here:")
            let response = {res:result};
            console.log(response);
            res.render('index', {result:response});
        }
       
    });
});

app.post('/temp_profile', async(req,res)=>{
    let userdata = '';
    req.on('data', chunk => {
        userdata = chunk.toString();
    });
    req.on('end', async () => {
        const parsedData = JSON.parse(userdata);
        console.log(parsedData);
            data = await db.getDetails(parsedData.username);
            posts = await db.getposts(parsedData.temp_user);
            followlist = await db.getUsercounts(parsedData.temp_user);
            let temp_data = await db.getDetails(parsedData.temp_user);
            let followerslist = await db.getfollowingDetails(parsedData.temp_user)
            random = await db.getrandom();
            console.log('temp_data');
            console.log(temp_data);
            res.json({data:data, posts:posts, followlist:followlist, temp_data:temp_data, followerslist: followerslist});
        
       
    });
});

//posts related post requests

app.post('/post-upload', (req, res) => {
    var form = new formidable.IncomingForm();
    let profile;

    form.parse(req, async function (err, fields, files) {
        if (err) {
            console.error('Error parsing form data:', err);
            return res.status(500).send('Error parsing form data');
        }
                console.log(files.filetoupload[0].filepath);
                console.log('Files:', files);
                var oldpath = files.filetoupload[0].filepath;
                console.log(oldpath);
                var newpath = "./public/img/posts/"+files.filetoupload[0].originalFilename;
                const readStream = fs.createReadStream(oldpath);
                const writeStream = fs.createWriteStream(newpath);

      // Pipe the read stream to the write stream to copy the file
      readStream.pipe(writeStream);
                profile = files.filetoupload[0].originalFilename;


      // When the file copying is complete, close the streams and delete the temporary file
      readStream.on('end', function () {
        // Close the read and write streams
        readStream.close();
        writeStream.close();

        // Delete the temporary file
        fs.unlink(oldpath, function (err) {
          if (err) throw err;
        });
    });
            console.log(profile);
                console.log('Fields:', fields);
                
                db.posts_entry(fields.userid, profile, fields.caption);
                data = await db.getDetails(fields.userid);
            
                posts = await db.getposts(fields.userid);
                followlist = await db.getUsercounts(fields.userid);
            console.log(data);
            res.render('home', {data:data, posts:posts, followlist:followlist});
        });
        });

        app.post('/follow', (req, res) => {
            
            let userdata = '';
                req.on('data', chunk => {
                    userdata = chunk.toString();
                });
                req.on('end', async () => {
                        const parsedData = querystring.parse(userdata);
                        console.log("follow sequence");
                        console.log(parsedData);
                        const followButtonValue = parsedData['follow-button'];
                        if(followButtonValue === "follow"){
                        db.follow_entry(parsedData.user, parsedData.follower);
                        }
                        else{
                            db.follow_deletion(parsedData.user, parsedData.follower);
                        
                        }
                        data = await db.getDetails(parsedData.follower);
                        posts = await db.getposts(parsedData.follower);
                        followlist = await db.getUsercounts(parsedData.follower);
                        random = await db.getrandom();
                        res.render('home', {data:data, posts:posts, followlist:followlist, random:random});
                });
        });
        app.post('/postlike', (req, res) => {
            
            let userdata = '';
                req.on('data', chunk => {
                    userdata = chunk.toString();
                });
                req.on('end', async () => {
                        const parsedData = JSON.parse(userdata);
                        console.log("like sequence");
                        console.log(parsedData);
                        const postid = parsedData.postid;
                        const username = parsedData.username;
                        console.log("postis: "+postid);
                        console.log("username: "+username);
                        let postdata = {
                            postid: postid,
                            username:username
                        };
                        await db.postlike_entry(postid,username);
                        let likesCount = await db.getpostlikecount(postid);
                        
                        res.json({likesCount:likesCount, postdata:postdata});
                });
        });
        app.post('/postdislike', (req, res) => {
            
            let userdata = '';
                req.on('data', chunk => {
                    userdata = chunk.toString();
                });
                req.on('end', async () => {
                        const parsedData = JSON.parse(userdata);
                        console.log("like sequence");
                        console.log(parsedData);
                        const postid = parsedData.postid;
                        const username = parsedData.username;
                        let postdata = {
                            postid: postid,
                            username:username
                        };
                        console.log("postis: "+postid);
                        console.log("username: "+username);
                        await db.postlike_delete(postid,username);
                        let likesCount = await db.getpostlikecount(postid);
                        
                        
                        res.json({likesCount:likesCount, postdata:postdata});
                });
        });
        app.post('/postcomment', (req, res) => {
            
            let userdata = '';
                req.on('data', chunk => {
                    userdata = chunk.toString();
                });
                req.on('end', async () => {
                        const parsedData = JSON.parse(userdata);
                        console.log("comment data");
                        console.log(parsedData);
                        const postid = parsedData.postid;
                        const username = parsedData.accountuser;
                        const postuser = parsedData.postuser;
                        console.log("postis: "+postid);
                        console.log("username: "+username);
                        console.log("postuser: "+postuser);
                        let postdetails = await db.getpostuser(postid);
                        let postcomment = await db.getpostcomment(postid);
                        let likesCount = await db.getpostlikecount(postid);
                        
                        
                        res.json({likesCount:likesCount, postdetails:postdetails, postcomment:postcomment});
                });
        });
        app.post('/addcomment', (req, res) => {
            
            let userdata = '';
                req.on('data', chunk => {
                    userdata = chunk.toString();
                });
                req.on('end', async () => {
                        const parsedData = querystring.parse(userdata);
                        console.log("add comment data");
                        console.log(parsedData);
                        await db.postcomment_entry(parsedData.postid, parsedData.username, parsedData.comment);
                        
                        data = await db.getDetails(parsedData.userID);
            posts = await db.getposts(parsedData.userID);
            followlist = await db.getUsercounts(parsedData.userID);
            random = await db.getrandom();
            res.render('home', {data:data, posts:posts, followlist:followlist, random:random});
                });
        });
        app.post('/followerList', (req, res) => {
            
            let userdata = '';
                req.on('data', chunk => {
                    userdata = chunk.toString();
                });
                req.on('end', async () => {
                    const parsedData = JSON.parse(userdata);
                    console.log("comment data");
                    console.log(parsedData);
                    const username = parsedData.accountuser;
                    console.log("username: "+username);
                    data = await db.getfollowers(username);
                    res.json({data:data});
                });
        });
        app.post('/followingList', (req, res) => {
            
            let userdata = '';
                req.on('data', chunk => {
                    userdata = chunk.toString();
                });
                req.on('end', async () => {
                    const parsedData = JSON.parse(userdata);
                    console.log("comment data");
                    console.log(parsedData);
                    const username = parsedData.accountuser;
                    console.log("username: "+username);
                    data = await db.getfollowing(username);
                    res.json({data:data});
                });
        });
        

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});