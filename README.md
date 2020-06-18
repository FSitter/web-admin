# BID React Admin

Admin Dashboard for managing BID system

<p align="center">
  <img src="https://github.com/FSitter/bsiter-mobile-app/raw/master/assets/images/homescreen.jpg" width="200" height="390">
  &nbsp;
  &nbsp;
  &nbsp;
  <img src="https://github.com/FSitter/bsiter-mobile-app/raw/master/assets/images/optionshomescreen.jpg" width="200" height="390">
  &nbsp;
  &nbsp;
  &nbsp;
  <img src="https://github.com/FSitter/bsiter-mobile-app/raw/master/assets/images/findsitters.jpg" width="200" height="390">
  &nbsp;
  &nbsp;
  &nbsp;
  <img src="https://github.com/FSitter/bsiter-mobile-app/raw/master/assets/images/sitterdetails.jpg" width="200" height="390">
  &nbsp;
  &nbsp;
  &nbsp;
  <img src="https://github.com/FSitter/bsiter-mobile-app/raw/master/assets/images/createrequest.jpg" width="200" height="390">
  &nbsp;
  &nbsp;
  &nbsp;
  <img src="https://github.com/FSitter/bsiter-mobile-app/raw/master/assets/images/skillsncerts.jpg" width="200" height="390">
</p>


## Materials

Some main dependencies of this repository:

-   Reactjs
-   React Router Dom

## Installation

Prerequisites: Node.js (>=6.x, 8.x preferred), npm version 3+ and Git.

If you don't have Yarn, install it by running:

```
$ npm install -g yarn
```

Install dependencies via yarn:

```
$ yarn
```

Config environment at `.env` file, example at `.env.example`.

### Development

Running in development mode with `nodemon`:

```
$ yarn start
```

### Production

Build production dist files and run:

```
$ yarn build
```

Or build production Docker image:

```
$ docker build -t dashboard-react . && docker run -d --name dashboard-react -p 5000:3000 dashboard-react:latest
```

### Testing

Currently using unit testing

