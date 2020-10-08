const fs = require('fs');


// all functions should return an array of tracks
// the different functions are for different ways 
// of importing the tracks


module.exports = {
    from_txt_file: (filePath) => {
        try {
            return fs.readFileSync(filePath, 'utf8').split('\n');    
        } catch (error) {
            throw "too many songs";
        }
    }


};