# angular-testing — simple angular app to demonstrate how to test

This project is a very simple movie collection web app. You can use it to see how your application can be both unit and
end-to-end (e2e) tested.

The application is preconfigured to install the Angular framework and a bunch of development and testing tools for
instant web development gratification.

The movie app doesn't do much, just displays a list of movies that can be filtered and sorted in various ways. However,
it does have all of the major components you are likely to have in a standard AngularJS application. The code is 100%
unit test covered and has a number of e2e tests.


## Getting Started

To get started you can simply clone the angular-testing repository and install the dependencies:

### Prerequisites

You need git to clone the angular-seed repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test angular-testing. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone angular-testing

Clone the angular-testing repository using [git][git]:

```
git clone https://github.com/wholladay/angular-testing.git
cd angular-testing
```

If you just want to start a new project without the angular-testing commit history then you can do:

```bash
git clone --depth=1 https://github.com/wholladay/angular-testing.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-testing changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have pre-configured the project with a simple development web server. The simplest way to start this server is:

```
npm start
```

Now browse to the app at `http://localhost:3000`.



## Directory Layout

```
app/                  --> all of the source files for the application
  assets/               --> application assets, such as images
    svg/                  --> scalable vector graphics
      menu.svg              --> used to show the toggle the sidebar from the header
  movies/               --> the movie listing application code
    genreFilter.js        --> custom filter for displaying a movie's genres
    movieItem.html        --> template for the movieItemDirective
    movieItemDirective.js --> directive that displays a single movie
    movieList.html        --> template for the movieListDirective
    movieListDirective.js --> directive that displays a list of movies
    movies.html           --> template for the moviesController
    moviesController.js   --> main/only controller for the movie listing app
    MovieService.js       --> service that fetches data from the server
  app.css               --> default stylesheet
  app.js                --> main application module
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
tests/                --> unit tests
  movies/               --> movies package
karma.conf.js         --> config file for running unit tests with Karma
```

## Testing

There are two kinds of tests in the angular-testing application: Unit tests and End-to-End tests.

### Running Unit Tests

The angular-testing app comes pre-configured with unit tests. These are written in
[Jasmine][jasmine], which we run with the [Karma Test Runner][karma]. We provide a Karma
configuration file to run them.

* the configuration is found at `karma.conf.js`
* the unit tests are found in the `tests` directory and are named as `*Test.js`.

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will sit and
watch the source and test files for changes and then re-run the tests whenever any of them change.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit.  This is useful if you want to
check that a particular version of the code is operating as expected.  The project contains a
predefined script to do this:

```
npm run single
```


### End to end testing

The angular-testing app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][ptor] End-to-End test runner.  It uses native events and has
special features for Angular applications.

* the configuration is found at `e2e-tests/protractor-conf.js`
* the end-to-end tests are found in `e2e-tests/scenarios.js`

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor
can interact with it.

```
npm start
```

In addition, since Protractor is built upon WebDriver we need to install this.  The angular-testing
project comes with a predefined script to do this:

```
npm run update-webdriver
```

This will download and install the latest version of the stand-alone WebDriver tool.

Once you have ensured that the development web server hosting our application is up and running
and WebDriver is updated, you can run the end-to-end tests using the supplied npm script:

```
npm run protractor
```

This script will execute the end-to-end tests against the application being hosted on the
development server.


## Updating Angular

Previously we recommended that you merge in changes to angular-seed into your own fork of the project.
Now that the angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.


## More Information

For more information on AngularJS please check out:
* [AngularJS][ng]
* [Git][git]
* [Bower][bower]
* [npm][npm]
* [NodeJS][node]
* [Protractor][ptor]
* [Jasmine][jasmine]
* [Karma][karma]

[ng]: http://angularjs.org/
[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[ptor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
