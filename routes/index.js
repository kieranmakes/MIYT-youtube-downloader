const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const { asyncErrorHandler } = require('../middleware/index.js');
const { get_video_data } = require('../lib/yt-downloader.js');
const { search_videos } = require('../controllers/index.js');




/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

/* GET home page. */
router.get('/multi', (req, res, next) => {
    res.render('multiple-search');
});

/* POST search value */
 router.post('/', asyncErrorHandler(search_videos)); 

        



module.exports = router;
   
    //     console.log(req.body.search);
    //     if (req.body.search.value === '') {
    //         req.session.error = "You must enter a Youtube video url or name"
    //         console.log(req.session.error);
    //         res.redirect('back');
    //     } 
    //     else {
    
    //         // display loader until all data is back
    //         res.render('loader');
    
    //         // turn search into text file 
    //         const data = new Uint8Array(Buffer.from(req.body.search.value));
    //         fs.writeFile('listings.txt', data, (err) => {
    //         if (err) throw err;
    //         console.log('The listings file has been saved!');
    //         }).then(async () => {
    //             // feed into get info on the listing(s)
    //             let video_data = await get_video_data();
    //             console.log('data: ', video_data);
    //         });