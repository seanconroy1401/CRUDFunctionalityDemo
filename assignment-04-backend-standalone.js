//
// Using code provided by John Keating and modified by Sean Conroy
//
// I initially developed my node js file in tandem with my html file and after re-reading the assignment description I realised I needed to show the database working
// separately so this file is just to show the CRUD features interacting with my database
//

// Load the NodeJS modules required

var http = require("http"); // creating an API using http
var url = require("url"); // using url to extract the route (e.g. /, /api/user)
var querystring = require("querystring"); // this will contain the body of the POST request
var fs = require("fs"); // file handling to read the index.html served for / route
var port = 8000; // port the server with listen on

var server = http.createServer(); // create the server

//Connect to the database using mysqlq
var mysql = require('mysql');
var connection = mysql.createConnection({

    host: "webcourse.cs.nuim.ie",
    user: "u210335",
    password: "yuitheid9Oozeing",
    database: "cs230_u210335"

});

//Gives a detailed error message if an error occurs
connection.connect(function (err) {

    if (err) {

        return console.error('error: ' + err.message); 

    }

    console.log("Connected to the mySQL server")

});

//This is the code to show the Create of CRUD working to insert a user into a database - taken from the code provided by John
//I'm just using a hard-coded string variable here to show it working, if you want to use your own data please use the webpage's UI

var sqlC = "INSERT INTO `assignment-04-db` (TITLE, NAME, SURNAME, PHONE, EMAIL, LINE1A, LINE2A, CITY, COUNTY, EIRCODE, LINE1B, LINE2B, CITY2, COUNTY2, EIRCODE2) VALUES('Mr','Armin','Arlert','89222','aa@aot.jp','5422 Memory Road','','Shiganshina District','Wall Sina','AOT5422','5422 Memory Road','','Shiganshina Distric','Wall Sina','AOT5422')";

connection.query(sqlC, function (err, result){

  if (err) throw (err);
  console.log("Entry Added"); //Log to the console to confirm the entry was successfully added to the database

});

//This is the code to show the Retrieve of CRUD working to retrieve users from the database - I've modified it from the code taken from John
//As his only selects names and emails which is the way I've kept it in the full stack application
//But for this purpose I want to make it clear what info is in the database so you can easily see it being added and updated
var sqlR = "SELECT * FROM `assignment-04-db`";

connection.query(sqlR, function (err, result) {

    if (err) throw (err);
    console.log(result);

});

//This is the code to show the Update of CRUD working to update to user information for "Armin Arlert" in the database

var sqlU = "UPDATE `assignment-04-db` SET TITLE = 'Mr', NAME = 'Armin', SURNAME = 'Arlert', PHONE = '89222', EMAIL = 'commander@surveycorps.jp', LINE1A = 'Command Headquarters', LINE2A = '', CITY = 'Trost District', COUNTY = 'Wall Rose', EIRCODE = 'AOT402', LINE1B = 'Command Headquarters', LINE2B = '', CITY2 = 'Trost District', COUNTY2 = '', EIRCODE2 = 'AOT402' WHERE PHONE = '089222'";

connection.query(sqlU, function(err,result) { 

    if (err) throw (err);

    console.log("User Details Updated");

});

//I'm just calling Retrieve again to show the updated information in the database in the console before deleting the user

connection.query(sqlR, function (err, result) {

    if (err) throw (err);
    console.log(result);

});

//This is the code to show the Delete of CRUD working to delete the user "Armin Arlert" from the database

var sqlD = "DELETE FROM `assignment-04-db` WHERE PHONE = '89222' AND NAME = 'Armin' AND SURNAME = 'Arlert'";

connection.query(sqlD, function(err, result) { 

    if (err) throw (err);

    console.log("User Deleted");
    process.exit();

});

// Set up the HTTP server and listen on port 8000
server.listen(port, function () {
    console.log("\nAJAX - API - Database Demo");
    console.log("CS230 Demo Program - Sean Conroy\n(c) 2022\n");
    console.log("AJAX (HTTP) API server running on port: " + port + "\n");
  });