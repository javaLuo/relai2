const env = import.meta.env.MODE;
export const baseUrl =
  env === 'production' ? 'https://api.relai.social' : `${location.protocol}//${location.host}`;

export const socketUrl = 'wss://api.relai.social/ws';
