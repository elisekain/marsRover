# Mars Rover API Search Application

This simple web application queries the Mars Rover API from NASA to return photos. The user can select the rover (Curiosity, Opportunity or Spirit) and date used in the query.

## Installation Instructions

Download the code from this repository. Open `index.html` in a web browser.

If you make changes to the `*.js` or `*.scss` files and need to regenerate the files in the `dist` folder, follow the instructions below.

### Sass CLI Command

Requires `scss` to be installed. To generate minified css when scss changes (and watch for changes), run the following command in the root of the project:

```
$ sass --watch scss/main.scss:css/main.min.css --style compressed
```

### Babel CLI Command

Requires `node`, `babel` &amp; `babili` to be installed. Use babel to transpile to ES5 and minify the javascript (and watch for changes):

```
$ npx babel js --out-file dist/main.min.js --watch --source-maps
```

## Planning

* [Trello Board](https://trello.com/b/H1aFGLwu/mars-rover-api-application)
* [Color Palette](https://coolors.co/fc3d21-0e68b1-f3f9fe-191819-ffffff)
* [Wireframe Mockup](https://github.com/elisekain/marsRover/blob/master/planning/MarsRover.pdf)

## Technologies Used

* [Flatpickr](https://chmln.github.io/flatpickr/)
* [Simple Grid](http://simplegrid.io/)
* [The Noun Project](https://thenounproject.com/)
