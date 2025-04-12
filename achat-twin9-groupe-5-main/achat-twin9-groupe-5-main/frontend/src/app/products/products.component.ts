import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../shared/Model/Product';
import { ProductService } from '../shared/Service/Product.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  listProducts: any;
  form: boolean = false;
  product!: Product;
  closeResult!: string;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
    private logger: NGXLogger
  ) {}

  ngOnInit(): void {
    this.logger.info('ProductsComponent initialized');
    this.getAllProducts();

    this.product = {
      idProduit: null,
      codeProduit: null,
      libelleProduit: null,
      prix: null,
      dateCreation: null,
      dateDerniereModification: null
    };
  }

  getAllProducts() {
    this.logger.debug('Fetching all products...');
    this.productService.getAllProducts().subscribe(
      res => {
        this.listProducts = res;
        this.logger.info('Products fetched successfully', res);
      },
      error => this.logger.error('Error fetching products', error)
    );
  }

  addProduct(p: any) {
    this.logger.debug('Adding new product...', p);
    this.productService.addProduct(p).subscribe(
      () => {
        this.logger.info('Product added successfully');
        this.getAllProducts();
        this.form = false;
      },
      error => this.logger.error('Error adding product', error)
    );
  }

  editProduct(product: Product) {
    this.logger.debug(`Editing product with ID: ${product.idProduit}`, product);
    this.productService.editProduct(product).subscribe(
      () => this.logger.info(`Product ${product.idProduit} edited successfully`),
      error => this.logger.error(`Error editing product ${product.idProduit}`, error)
    );
  }

  deleteProduct(idProduct: any) {
    this.logger.warn(`Deleting product with ID: ${idProduct}`);
    this.productService.deleteProduct(idProduct).subscribe(
      () => {
        this.logger.info(`Product ${idProduct} deleted successfully`);
        this.getAllProducts();
      },
      error => this.logger.error(`Error deleting product ${idProduct}`, error)
    );
  }

  open(content: any, action: any) {
    if (action != null) {
      this.product = action;
      this.logger.debug(`Opening modal for editing product ID: ${action.idProduit}`);
    } else {
      this.product = new Product();
      this.logger.debug('Opening modal for adding a new product');
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        this.logger.info(`Modal closed: ${result}`);
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.logger.warn(`Modal dismissed: ${this.getDismissReason(reason)}`);
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  cancel() {
    this.form = false;
    this.logger.info('Form cancelled');
  }
}

