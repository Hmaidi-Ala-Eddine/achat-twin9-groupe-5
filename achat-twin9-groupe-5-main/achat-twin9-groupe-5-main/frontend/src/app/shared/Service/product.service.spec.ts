import { TestBed } from '@angular/core/testing';
import { ProductService } from './Product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NGXLogger } from 'ngx-logger';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  let loggerSpy: jasmine.SpyObj<NGXLogger>;

  beforeEach(() => {
    const loggerMock = jasmine.createSpyObj('NGXLogger', ['info', 'warn', 'debug', 'error']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        { provide: NGXLogger, useValue: loggerMock }
      ]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
    loggerSpy = TestBed.inject(NGXLogger) as jasmine.SpyObj<NGXLogger>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all products', () => {
    const dummyProducts = [
      { idProduit: 1, libelleProduit: 'Product 1', prix: 100 },
      { idProduit: 2, libelleProduit: 'Product 2', prix: 200 }
    ];

    service.getAllProducts().subscribe(products => {
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/produit/retrieve-all-produits');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should add a product', () => {
    const newProduct = { idProduit: 3, libelleProduit: 'Product 3', prix: 300 };

    service.addProduct(newProduct).subscribe(response => {
      expect(response).toEqual(newProduct);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/produit/add-produit');
    expect(req.request.method).toBe('POST');
    req.flush(newProduct);
  });

  it('should edit a product', () => {
    const editedProduct = { idProduit: 1, libelleProduit: 'Updated Product', prix: 150 };

    service.editProduct(editedProduct).subscribe(response => {
      expect(response).toEqual(editedProduct);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/produit/modify-produit');
    expect(req.request.method).toBe('PUT');
    req.flush(editedProduct);
  });

  it('should delete a product', () => {
    const productId = 1;

    service.deleteProduct(productId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`http://localhost:8089/SpringMVC/produit/remove-produit/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
