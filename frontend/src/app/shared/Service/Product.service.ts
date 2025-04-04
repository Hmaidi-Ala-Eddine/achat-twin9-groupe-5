import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly API_URL = 'http://localhost:8089/SpringMVC/produit';

  constructor(private httpClient: HttpClient, private logger: NGXLogger) {}

  getAllProducts() {
    this.logger.info('Fetching all products');
    return this.httpClient.get(`${this.API_URL}/retrieve-all-produits`);
  }

  addProduct(product: any) {
    this.logger.info(`Adding product: ${JSON.stringify(product)}`);
    return this.httpClient.post(`${this.API_URL}/add-produit`, product);
  }

  editProduct(product: any) {
    this.logger.info(`Editing product: ${JSON.stringify(product)}`);
    return this.httpClient.put(`${this.API_URL}/modify-produit`, product);
  }

  deleteProduct(idProduct: any) {
    this.logger.warn(`Deleting product with ID: ${idProduct}`);
    return this.httpClient.delete(`${this.API_URL}/remove-produit/${idProduct}`);
  }
}

