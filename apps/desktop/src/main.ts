import 'dotenv/config';
import { app, BrowserWindow } from 'electron';
import { getFallbackPath, getLoaderPath } from './pathResolver.js';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({});
  mainWindow.loadURL(getLoaderPath());
  mainWindow.show();

  const loadUrlWithRetry = async (url: string, maxRetries = 5, delayMs = 3000) => {
    let retries = 0;

    const tryLoad = async () => {
      try {
        await fetch(url, { method: 'HEAD' });

        mainWindow.loadURL(url).catch(() => {
          if (retries < maxRetries) {
            retries++;
            setTimeout(tryLoad, delayMs);
          } else {
            mainWindow.loadURL(getFallbackPath());
          }
        });
      } catch {
        if (retries < maxRetries) {
          retries++;
          setTimeout(tryLoad, delayMs);
        } else {
          mainWindow.loadURL(getFallbackPath());
        }
      }
    };

    tryLoad();
  };

  const mainUrl = process.env.MAIN_URL!;
  loadUrlWithRetry(mainUrl);
});
