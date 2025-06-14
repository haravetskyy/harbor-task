import path from 'path';
import { app } from 'electron';

export const getFallbackPath = () =>
  `file://${path.join(app.getAppPath(), 'public', 'fallback.html')}`;

export const getLoaderPath = () => `file://${path.join(app.getAppPath(), 'public', 'loader.html')}`;
