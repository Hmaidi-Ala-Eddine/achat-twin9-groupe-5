import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  readonly API_URL = 'http://localhost:8089/SpringMVC/stock';

  constructor(private httpClient: HttpClient, private logger: LoggerService) { }

  getAllStocks(): Observable<any> {
    this.logger.info('Récupération de tous les stocks');
    return this.httpClient.get(`${this.API_URL}/retrieve-all-stocks`)
      .pipe(
        tap(
          (stocks) => this.logger.info('Stocks récupérés avec succès', stocks),
          (error) => this.logger.error(`Erreur lors de la récupération des stocks: ${error.message}`)
        )
      );
  }

  addStock(stock: any): Observable<any> {
    this.logger.info('Ajout d\'un nouveau stock', stock);
    return this.httpClient.post(`${this.API_URL}/add-stock`, stock)
      .pipe(
        tap(
          (result) => this.logger.info('Stock ajouté avec succès', result),
          (error) => this.logger.error(`Erreur lors de l'ajout du stock: ${error.message}`)
        )
      );
  }

  editStock(stock: any): Observable<any> {
    this.logger.info('Modification du stock', stock);
    return this.httpClient.put(`${this.API_URL}/modify-stock`, stock)
      .pipe(
        tap(
          (result) => this.logger.info('Stock modifié avec succès', result),
          (error) => this.logger.error(`Erreur lors de la modification du stock: ${error.message}`)
        )
      );
  }

  deleteStock(idStock: any): Observable<any> {
    this.logger.info('Suppression du stock', { idStock });
    return this.httpClient.delete(`${this.API_URL}/remove-stock/${idStock}`)
      .pipe(
        tap(
          () => this.logger.info('Stock supprimé avec succès', { idStock }),
          (error) => this.logger.error(`Erreur lors de la suppression du stock: ${error.message}`)
        )
      );
  }

  getLogs(): any[] {
    return this.logger.getLogs();
  }

  clearLogs(): void {
    this.logger.clearLogs();
  }
}
