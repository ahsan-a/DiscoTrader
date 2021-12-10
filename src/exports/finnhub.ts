import { FinnhubAPI } from '@stoqey/finnhub';

export const finnhub = new FinnhubAPI(process.env.FINNHUB_TOKEN);
