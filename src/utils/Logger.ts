class Logger {
  error = (...args: any[]) => {
    console.log('[Error]', ...args);
  };
}

export const logger = new Logger();
