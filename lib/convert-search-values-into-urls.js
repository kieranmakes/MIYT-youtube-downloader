/**  
 * put the youtube search urls into a search urls array
 * @param {[String]} video_search_values
 * @return {[String]} urls for the youtube search results page's  
 */
exports.get_search_urls = (video_search_values) => {
    return video_search_values.map(video_search_value => {

        video_search_value = video_search_value.replace(/\r/g,"").trim();

        

        return 'https://www.youtube.com/results?search_query=' 
        + video_search_value.replace(/\s/g, '+');   
    });
}


