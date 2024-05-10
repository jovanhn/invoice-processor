import { join } from 'path';
import { Configuration } from 'puppeteer';

const puppeteerConfig: Configuration = {
    cacheDirectory: join('/opt/render/', '.cache', 'puppeteer'),
};

export default puppeteerConfig;