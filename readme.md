# Mars Rover API Search Application

This simple, single page web application queries the [Mars Rover API from NASA](https://api.nasa.gov/api.html#MarsPhotos) to return photos from Mars.

The user can select the rover (Curiosity, Opportunity or Spirit) and date used in the query. The photo id, Martian sol &amp; thumbnail are displayed in a table. When the thumbnail is clicked, the images opens in a new tab.

## Additional Features

### Restrict Calendar Date Ranges

On page load, the page makes an immediate request to the Mars Rover API for each rover's manifest information. The active dates of the rover are then used to restrict the calendar options.

For example, if `Spirit` is the rover selected, the latest date possible to query for is `March 21, 2010` because that is Spirit's last active date.

### Error handling

Error messages are shown to the user and logged to the console.

If the Mars Rover API request fails &amp; returns an error message, it is displayed to the user. This occurs, for example, when the application api key is over the rate limit.

You can easily view an example of the application error message by clicking "Search" with a blank date. The application recognizes that no date was selected, skips making an API request (since it will fail), and displays an error message to the user.

### Best Practices for Performance / Accessibility

* Color contrast for text/background meets [WCAG AA](https://www.w3.org/TR/WCAG20/) standards.
* Images have alt tags (including images generated from API calls).
* `manifest.json` file declares a theme and background color for brand consistency on mobile.
* ES6 code is transpiled to es2015 for more browser compatibility.

### CSS Animation

A custom CSS animation plays when the user clicks the Mars Rover icon in the header.

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
