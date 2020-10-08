const { get_search_urls } = require('./convert-search-values-into-urls');
const { from_txt_file } = require('./importing-data');
const { get_video_data } = require('./scrape-video-data.js');


// async function () => {

//     let video_search_values = from_txt_file('./file.txt');
//     let video_urls = get_search_urls(video_search_values);
//     console.log(video_urls);
    
//     let video_data = await get_video_data(video_urls);
//     console.log(video_data);
//     let url = video_data[0].url;
//     let title = format_title(video_data[0].meta.title);
//     downloader.download_audio(url, title);


// };



module.exports = {

    get_video_data: async () => {
        let video_search_values = from_txt_file('./listings.txt');
        console.log(video_search_values);
        let video_search_urls = get_search_urls(video_search_values);
        console.log(video_search_urls);
        
        let video_data = await get_video_data(video_search_urls); 
        return video_data;
    }



}