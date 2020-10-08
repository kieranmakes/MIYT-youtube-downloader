const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware/index.js');



/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

/* GET home page. */
router.get('/multi', (req, res, next) => {
    res.render('multiple-search');
});

/* POST search value */
router.post('/', (req, res, next) => {
    console.log(req.body.search);
    if (req.body.search.value === '') {
        req.session.error = "You must enter a Youtube video url or name"
        console.log(req.session.error);
        res.redirect('back');
    } 
    else {
        res.render('loader');
    }
    
});



module.exports = router;