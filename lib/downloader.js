const fs = require('fs');
const ytdl = require('ytdl-core');
const format_title = require('./format-title');

const ffmpeg = require('fluent-ffmpeg');
const readline = require('readline');

module.exports = {

     /**
     * @param {String} url
     * @param {String} path: title
     */
    download_audio: (url, title) => {
        let stream = ytdl(url, { quality: 'highestaudio' });
        let start = Date.now();

        ffmpeg(stream)
            .audioBitrate(128)
            .save(`${__dirname}/${title}.mp3`)
            .on('progress', p => {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`${p.targetSize}kb downloaded`);
            })
            .on('end', () => {
            console.log(`\ndone - ${(Date.now() - start) / 1000}s`);
            })
            .on('error', () => {
                console.log('Something seems to have gone wrong')
            });
    },

     /**
     * @param {String} url
     * @param {String} path: title
     */
    download_video: (url, title) => {
        ytdl(url, {quality: 'highest'} )
            .pipe(fs.createWriteStream(title + '.mp4'));
    }
}
    



let url = 'https://www.youtube.com/watch?v=racmy7Y9P4M';
let title = 'BMTH - Parasite Eve';


// // downloader.download_audio(url, title);
module.exports.download_video(url, title);


