// go through list of songs
// convert each song into a url
// example: 'wake me up when september ends' to 
// 'https://www.youtube.com/results?search_query=wake+me+up+when+september+ends'
// get the link of the first video being displayed on the show page
// download the audio from that page


const express = require('express');
const app = express();
const { from_txt_file } = require('./lib/importing-songs.js');
const { get_video_data } = require('./lib/scrape-video-data.js');
const { format_title } = require('./lib/format-title.js')
const { get_search_urls } = require('./lib/convert-search-values-into-urls.js');
const downloader = require('./lib/downloader');




let songs = new Array;
let youtube_urls = new Array;


let video_search_values = from_txt_file('./file.txt');
let video_urls = get_search_urls(video_search_values);

console.log(video_urls);





(async () => {
    
    let video_data = await get_video_data(video_urls);
    console.log(video_data);
    let url = video_data[0].url;
    let title = format_title(video_data[0].meta.title);
    downloader.download_audio(url, title);


})();




const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Listening on http://localhost:${port}`);
  });



