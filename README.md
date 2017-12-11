# Robot Art

### Acceptance Criteria

##### Business Requirements

* No need to create logins or sessions (See API section if you wish to optionally build an API)
  * Ignore Admin pages if you do not create an API
* A User is able to Add and Delete potential Famous Robots
  * The Application should change state based on the Design when a Robot is Added or Deleted
* A User is able to Vote on a Famous Robot
  * The Application should change state based on the Design when a vote is cast
  * Votes do not need to be limited by User or Session

##### General Code

* Application can either be hosted or come in the form of a repo with instructions to build and launch
* Architecture of the Application and the Front-End is scalable and modular
* The Front-End is a precise recreation of the design found in the Foundation Document
* The Front-End is responsive
* Any errors are gracefully handled by the Application
* The Browser Baseline is the following:
  * Mobile: iOS 10 and above, Android 6.x and above
  * Desktop: IE11, Edge and above. Latest Firefox, Chrome, Safari

- - - -

### Build the Application

* Ensure you have Node and NPM installed globally on your computer of choice
* Within your terminal or command prompt, cd into the 'robot-art' directory
* Run `npm install` ... all dev and prod dependencies for this application will be handled for you in package.json
* To apply any changes in the jsx or scss files, run `./node_modules/.bin/webpack -p` (alternatively you may apply the `-d` flag for debugging and source mapping)
* To watch for front end changes on the fly, run `./node_modules/.bin/webpack [-p|-d] --watch`
* All source code is contained within the `src` directory
* Any and all changes will output into the `public` directory

- - - -

### Run the Application

* Within your terminal or command prompt, cd into the 'robot-art' directory
* Ensure you have the correct dependencies installed: `npm install --production` (this assumes you have built the application in dev per the 'build' instructions above)
* Run `node index.js`, and the app should boot up for you ... view it in your browser with the URL `http://localhost:3000`
* If you would like the Express app to watch for changes, you may install `nodemon` globally on your machine and then run `nodemon index.js` ... it's just lovely, but bewarned!
  * When the server resets, your session will reset and you will need to log back in
  * Sessions expire after one hour

- - - -

### Sample Login Credentials

* You will need to provide a valid email address and password to log in
* Example, existing accounts include: (password for all is `welcome2`)
  * dan@mondorobot.com
  * chuck@norris.com
  * michaelscott@scranton.com
* Users only have 3 attempts to log in

- - - -

### Some Technologies Used

* React
* ES6 + Babel
* Webpack
* React-router-dom
* Axios
* SASS
* Node + Express

- - - -

### Other Notes

* I am storing all Robot data and user information in local .json files for the purposes of this app...
* In a perfect world, I would store this info in a database and I would be a bit more serious about encryption and general web security :badpokerface: