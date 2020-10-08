const fs = require('fs').promises;
const { get_video_data } = require('../lib/yt-downloader.js');

module.exports = {
    search_videos: async (req, res, next) => {
        console.log(req.body.search);
        if (req.body.search.value === '') {
            req.session.error = "You must enter a Youtube video url or name"
            console.log(req.session.error);
            res.redirect('back');
        } 
        else {
    
            // display loader until all data is back
            res.render('loader');
    
            // turn search into text file 
            const data = new Uint8Array(Buffer.from(req.body.search.value));
            fs.writeFile('listings.txt', data, (err) => {
            if (err) throw err;
            console.log('The listings file has been saved!');
            }).then(async () => {
                // feed into get info on the listing(s)
                let video_data = await get_video_data();
                console.log('data: ', video_data);
                video_data = JSON.stringify(video_data, null, 2);

                fs.writeFile('video-data.json', video_data, (err) => {
                    if (err) throw err;
                    console.log('Video data written to JSON file');
                }).then(() => {
                    console.log('This is after the write call');
                });
                
                
            });
            
        }
    }
}