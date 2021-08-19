const fs = require("fs");
const ytsr = require("ytsr");
const ffmpeg = require("fluent-ffmpeg");
const ytdl = require("ytdl-core");

export default class Scripts {
  /** @param {String[]} videos_list: search terms
   *  @returns {object}
   * */
  get_video_data = async (videos_list) => {
    let return_data = [];
    for (const video_search_term of videos_list) {
      let video_return_data = {
        search_term: video_search_term,
        data: {},
      };
      const filters = await ytsr.getFilters(video_search_term);
      const filter = filters.get("Type").get("Video");
      const video_search_results = await ytsr(filter.url, { limit: 10 });
      video_return_data.data = video_search_results.items;
      return_data.push(video_return_data);
    }
    return return_data;
  };

  /** @param {String} url
   *  @param {String} path: title
   */
  download_audio = async (url, path, title, duration) => {
    return new Promise((resolve, reject) => {
      // let file_size_approx = approx_total_file_size(duration);
      let stream = ytdl(url, { quality: "highestaudio" });

      ffmpeg(stream)
        .audioBitrate(128)
        .save(`${path}/${title}.mp3`)
        .on("progress", (p) => {
          // p.targetSize / file_size_approx;
        })
        .on("end", () => {
          resolve();
        })
        .on("error", (e) => {
          reject(e);
        });
    });
  };

  /** @param {String} duration_s
   *  @returns {number}: filesize_kb
   */
  approx_total_file_size = (duration_s) => {
    const filesize_kb = 16 * duration_s;
    return filesize_kb;
  };
}
