import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(private logger: NGXLogger) {}

  info(message: string, ...args: any[]) {
    this.logger.info(message, ...args);
    this.saveToLocalStorage('INFO', message, args);
  }

  error(message: string, ...args: any[]) {
    this.logger.error(message, ...args);
    this.saveToLocalStorage('ERROR', message, args);
  }

  debug(message: string, ...args: any[]) {
    this.logger.debug(message, ...args);
    this.saveToLocalStorage('DEBUG', message, args);
  }

  getLogs(): any[] {
    return JSON.parse(localStorage.getItem('app_logs') || '[]');
  }

  clearLogs(): void {
    localStorage.removeItem('app_logs');
  }

  private saveToLocalStorage(level: string, message: string, args: any[]) {
    const logs = JSON.parse(localStorage.getItem('app_logs') || '[]');
    logs.push({
      timestamp: new Date().toISOString(),
      level,
      message,
      args
    });
    
    // Garder seulement les 1000 derniers logs
    if (logs.length > 1000) {
      logs.splice(0, logs.length - 1000);
    }
    
    localStorage.setItem('app_logs', JSON.stringify(logs));
  }
}