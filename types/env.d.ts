declare namespace NodeJS {
  interface ProcessEnv {
    APP_ENV: 'local' | 'qa' | 'uat' | 'prod';
  }
}
