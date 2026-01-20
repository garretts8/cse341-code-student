const path = require('path');

const lesson1Route = (req, res) => {
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

// POST /test/submit
const testSubmit = (req, res) => {
  const id = req.body.id;
  res.redirect(`/test/${id}`);
};

module.exports = {
    lesson1Route,
    mitchelleRoute,
    spencerRoute,
    dadeRoute,
    testRoute, 
    testSubmit
};