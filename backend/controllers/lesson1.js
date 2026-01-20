const path = require('path');

const less1Route = (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/lesson1.html'));
};

const mitchelleRoute = (req, res) => {
    res.send("Mitchelle Garrett");
};

const spencerRoute = (req, res) => {
    res.send("Spencer Garrett");
};

const dadeRoute = (req, res) => {
    res.send("Dade Garrett");
};

const testRoute = (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/test.html'));
};


module.exports = {
    less1Route,
    mitchelleRoute,
    spencerRoute,
    dadeRoute,
    testRoute,
};