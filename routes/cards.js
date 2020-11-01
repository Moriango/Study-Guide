const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const randomCardId = Math.floor(Math.random() * numberOfCards);
    console.log('Random Flash Card Generator is Working');
    return res.redirect(`/cards/${randomCardId}`);
});

router.get('/:id', (req, res) => {
    const { side } = req.query;
    //side is equal to answer or question in url wich finds the key value pairs
    const { id } = req.params;
    //finds the index position of the card in the array cards {id} will be used in query url

    if ( !side ) {
        return res.redirect(`/cards/${id}?side=question`);
    }
    const name = req.cookies.username;
    const text = cards[id][side];
    //looks in the card array finds the index position [id] then finds which side of the card we need [side]
    const { hint } = cards[id];
    // looks into the cards array finds the index position [id] can no be used to access the hint {hint} will be used in url
    const templateData = { id, text, name };
    // sets up a variabe with the inputs/ paramerters of text(question hint and answer) and hint(cards index position)
    if ( side === 'question' ) {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    } else if ( side === 'answer' ) {
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }
    res.render('card', templateData);
});
module.exports = router;