 
 /** 
  * @param {String} title 
  * @returns {String} title  
 */
 exports.format_title =  (title) => {
    // change the forward slash '/' to '／'
    // done so that the server doesnt mistake 
    // the / as a directory deliminator
    if (title.includes('/')) title.replaceAll("/", "／");
    return title;
};