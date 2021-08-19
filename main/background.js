import { app, ipcMain, dialog } from "electron";
import { homedir } from "os";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import Scripts from "./helpers/scripts.js";
let s = new Scripts();
const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1130,
    height: 700,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  ipcMain.on("asynchronous-message", async (event, arg, data) => {
    switch (arg) {
      case "directory-picker":
        let { filePaths } = await dialog.showOpenDialog({
          buttonLabel: "Set path",
          properties: ["openDirectory"],
        });
        event.reply("asynchronous-reply", filePaths[0]);
        break;
      case "search-terms-video-data":
        let video_data = await s.get_video_data(data);
        event.reply("asynchronous-reply", video_data);
        break;
      case "download-list":
        let i = 0;
        for (const url of data.urls) {
          await s.download_audio(
            url,
            data.path,
            data.metadataList[i].trackTitle,
            data.metadataList
          );
          i++;
        }
        event.reply("asynchronous-reply", "download-complete");
      default:
        break;
    }
  });

  ipcMain.on("synchronous-message", async (event, arg) => {
    switch (arg) {
      case "home-dir":
        event.returnValue = homedir();
        break;
      default:
        break;
    }
  });
})();

app.on("window-all-closed", () => {
  app.quit();
});
