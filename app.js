// go through list of songs
// convert each song into a url
// example: 'wake me up when september ends' to 
// 'https://www.youtube.com/results?search_query=wake+me+up+when+september+ends'
// get the link of the first video being displayed on the show page
// download the audio from that page


const express = require('express');
const app = express();

const path = require('path');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const session = require('express-session');



// const { from_txt_file } = require('./lib/importing-data.js/index.js');
// const { get_video_data } = require('./lib/scrape-video-data.js');
// const { format_title } = require('./lib/format-title.js')
// const { get_search_urls } = require('./lib/convert-search-values-into-urls.js');
// const downloader = require('./lib/downloader');


const indexRouter = require('./routes/index');

app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'kieran is 444 9 a shit coder 14 GGG',
    resave: false,
    saveUninitialized: true
}));




// set local variables middleware
app.use((req, res, next) => {

    // set success message
    res.locals.success = req.session.success || '';
    delete req.session.success;

    // set error message
    res.locals.error = req.session.error || '';
    delete req.session.error;

    req.session.progress = 0;

    // continue on to next function in middleware chain
    next();
});




// Mount Routes
app.use('/', indexRouter);


module.exports = app;














