//
// AJAX - API - Database Demo
//
// Written using code provided by John Keating and modified by Sean Conroy
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

// listen for requests from clients
server.on("request", function (request, response) {

  var currentRoute = url.format(request.url); // get the route (/ or /api/user)
  var currentMethod = request.method; // get the HTTP request type (POST - Create; GET - Retrieve)
  var requestBody = ""; // will contain the extracted POST data later

  // determine the route (/ or /api/user)
  switch (currentRoute) {
    //
    // If no API call made then the default route is / so
    // just return the default index.html file to the user.
    // This contains the forms, etc. for making the CRUD
    // requests (only Create and Retrieve implemented)
    //
    case "/":
      fs.readFile(__dirname + "/assignment-04.html", function (err, data) {
        // get the file and add to data
        var headers = {
          // set the appropriate headers
          "Content-Type": "text/html",
        };
        response.writeHead(200, headers);
        response.end(data); // return the data (index.html)
      }); // as part of the response

      break;

    //
    // Handle the requests from client made using the route /api/user
    // These come via AJAX embedded in the earlier served index.html
    // There will be a single route (/api/user) but two HTTP request methods
    // POST (for Create) and GET (for Retrieve)
    //
    case "/api/user":
      // Handle a POST request;  the user is sending user data via AJAX!
      // This is the CRUD (C)reate request. These data need to be
      // extracted from the POST request and saved to the database!

      if (currentMethod === "POST") {
        // read the body of the POST request
        request.on("data", function (chunk) {
          requestBody += chunk.toString();
        });

        // determine the POST request Content-type (and log to console)
        // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
        const { headers } = request;
        let ctype = headers["content-type"];
        console.log("RECEIVED Content-Type: " + ctype + "\n");

        // finished reading the body of the request
        request.on("end", function () {
          var userData = "";
          // saving the user from the body to the database
          if (ctype.match(new RegExp('^application/x-www-form-urlencoded'))) {
            userData = querystring.parse(requestBody);
          } 
          else {
            userData = JSON.parse(requestBody);
          }

          if (userData.addUser === "true") {
            //Using the info taken from the forms on the webpage by Ajax, insert into the database
            var sqlC = "INSERT INTO `assignment-04-db` (TITLE, NAME, SURNAME, PHONE, EMAIL, LINE1A, LINE2A, CITY, COUNTY, EIRCODE, LINE1B, LINE2B, CITY2, COUNTY2, EIRCODE2) VALUES('" + 
            userData.title + "','" + userData.firstname + "','" + userData.surname + "','" + userData.phone + "','" + userData.email + "','" + userData.line1a + "','" + 
            userData.line2a + "','" + userData.city + "','" + userData.county + "','"+userData.eircode + "','" + userData.line1b + "','" + userData.line2b + "','" + 
            userData.city2 + "','" + userData.county2 + "','" + userData.eircode2 + "')";

            connection.query(sqlC, function (err, result){

              if (err) throw (err);
              console.log("Entry Added"); //Log to the console to confirm the entry was successfully added to the database

            });

            // log the user data to console
            console.log(
              "USER DATA RECEIVED: \n\n" +
                JSON.stringify(userData, null, 2) +
                "\n"
            );
            // respond to the user with confirmation message
            var headers = {
              "Content-Type": "text/plain",
            };
            response.writeHead(200, headers);
            response.end(
              "User (" +
                userData.firstname +
                " " +
                userData.surname +
                ") data added to the Database!"
            );
          }

        });
      }

      // Handle a GET request;  the user is requesting user data via AJAX!
      // This is the CRUD (R)etrieve request. These data need to be
      // extracted from the database and returned to the user as JSON!
      else if (currentMethod === "GET") {
        var headers = {
          "Content-Type": "application/json",
        };

        var sqlR = "SELECT NAME, SURNAME, EMAIL FROM `assignment-04-db`";

        connection.query(sqlR, function (err, result) {

            if (err) throw (err);
            console.log(result);
            response.writeHead(200, headers);
            response.end(JSON.stringify(result));

        });

      }

      // Handle a PUT request; the user is requesting to update data via AJAX
      //This is the CRUD (U)pdate request
      else if (currentMethod === "PUT") {

        // read the body of the POST request
        request.on("data", function (chunk) {
          requestBody += chunk.toString();
        });

        // determine the update request Content-type (and log to console)
        // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
        const { headers } = request;
        let ctype = headers["content-type"];
        console.log("RECEIVED Content-Type: " + ctype + "\n");


        // finished reading the body of the request
        request.on("end", function () {
          var newData = "";
          // saving the user from the body to the database
          if (ctype.match(new RegExp('^application/x-www-form-urlencoded'))) {
            newData = querystring.parse(requestBody);
          } 
          else {
           newData = JSON.parse(requestBody);
          }

          var sqlU = "UPDATE `assignment-04-db` SET TITLE = '" + newData.title + "', NAME = '" + newData.firstname + "', SURNAME = '" + newData.surname + 
          "', PHONE = '" + newData.phoneU2 + "', EMAIL = '" + newData.email + "', LINE1A = '" + newData.line1a + "', LINE2A = '" + newData.line2b + 
          "', CITY = '" + newData.city + "', COUNTY = '" + newData.county + "', EIRCODE = '" + newData.eircode + "', LINE1B = '" + newData.line1b + 
          "', LINE2B = '" + newData.line2b + "', CITY2 = '" + newData.city2 + "', COUNTY2 = '" + newData.county2 + "', EIRCODE2 = '" + newData.eircode2 +
          "' WHERE PHONE = '" + newData.phoneU1 + "'";

          connection.query(sqlU, function(err,result) { 

            if(err) throw (err);

            console.log("User Details Updated");

          });


          var headers = {
            "Content-Type": "text/plain",
          };

          response.writeHead(200, headers);
          response.end("User Updated" );
              

        });

      }

      // Handle a DELETE request; the user is requesting to delete data via AJAX
      //This is the CRUD (D)elete request
      else if (currentMethod === "DELETE") {

        // read the body of the POST request
        request.on("data", function (chunk) {
          requestBody += chunk.toString();
        });

        // determine the update request Content-type (and log to console)
        // Either: (i)  application/x-www-form-urlencoded or (ii) application/json
        const { headers } = request;
        let ctype = headers["content-type"];
        console.log("RECEIVED Content-Type: " + ctype + "\n");


        // finished reading the body of the request
        request.on("end", function () {
          var delData = "";
          // saving the user from the body to the database
          if (ctype.match(new RegExp('^application/x-www-form-urlencoded'))) {
            delData = querystring.parse(requestBody);
          } 
          else {
           delData = JSON.parse(requestBody);
          }

          var sqlD = "DELETE FROM `assignment-04-db` WHERE PHONE = '" + delData.phone + "' AND NAME = '" + delData.firstname +
          "' AND SURNAME = '" + delData.surname + "'";

          connection.query(sqlD, function(err,result) { 

            if(err) throw (err);

            console.log("User Deleted");

          });


          var headers = {
            "Content-Type": "text/plain",
          };

          response.writeHead(200, headers);
          response.end("User Deleted" );
              

        });

      }

    break;
  }
});

// Set up the HTTP server and listen on port 8000
server.listen(port, function () {
  console.log("\nAJAX - API - Database Demo");
  console.log("CS230 Demo Program - Sean Conroy\n(c) 2022\n");
  console.log("AJAX (HTTP) API server running on port: " + port + "\n");
});
