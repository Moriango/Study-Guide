const express = require('express');
const router = express.Router();


const fnames = [
    'Toddneal',
    'Rosalind',
    'Brandon',
    'Jessica',
    'Elizabeth',
    'Lavita'
];
const lnames = [
    'Stallworth',
    'Busselle',
    'Busselle',
    'Camarillo',
    'Lindbergh',
    'Hart'
];

router.get('/', (req, res) => {
    const name = req.cookies.username
    if (name) {
        res.render('index', { name });
    } else {
        res.redirect('/hello');
    }
});

router.get('/hello', (req, res) => {
    const name = req.cookies.username
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});


router.get('/sandbox', (req, res) => {
    res.render('sandbox', { prompt: "List of Names of Friends?", hint: "Jesus Christ I fucking hate people...", fnames, lnames});
});



module.exports = router;