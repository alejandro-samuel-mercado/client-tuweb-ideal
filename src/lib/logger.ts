type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const isProduction = process.env.NODE_ENV === 'production';

class Logger {
  private static formatMessage(level: LogLevel, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level,
      message,
      data: data || undefined,
    };
  }

  static info(message: string, data?: any) {
    if (isProduction) return;
    console.log(`[INFO] ${message}`, data || '');
  }

  static warn(message: string, data?: any) {
    if (isProduction) return;
    console.warn(`[WARN] ${message}`, data || '');
  }

  static error(message: string, error?: any) {
    console.error(`[ERROR] ${message}`, error || '');
  }

  static debug(message: string, data?: any) {
    if (isProduction) return; 
    console.debug(`[DEBUG] ${message}`, data || '');
  }
}

export default Logger;
