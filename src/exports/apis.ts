import AlphaVantage from 'astro-vantage';
require('dotenv').config();
export const alpha = new AlphaVantage(process.env.ALPHA || '');

import { FinnhubAPI } from '@stoqey/finnhub';
export const finnhub = new FinnhubAPI(process.env.FINNHUB_TOKEN);
