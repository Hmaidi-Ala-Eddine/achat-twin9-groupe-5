import { TestBed } from '@angular/core/testing';
import { StockService } from './Stock.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('StockService', () => {
  let service: StockService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StockService]
    });

    service = TestBed.inject(StockService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all stocks', () => {
    const dummyStocks = [
      { idStock: 1, libelleStock: 'Stock 1', quantity: 100 },
      { idStock: 2, libelleStock: 'Stock 2', quantity: 200 }
    ];

    service.getAllStocks().subscribe(stocks => {
      expect(stocks).toEqual(dummyStocks);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/stock/retrieve-all-stocks');
    expect(req.request.method).toBe('GET');
    req.flush(dummyStocks);
  });

  it('should add a stock', () => {
    const newStock = { idStock: 3, libelleStock: 'Stock 3', quantity: 300 };

    service.addStock(newStock).subscribe(response => {
      expect(response).toEqual(newStock);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/stock/add-stock');
    expect(req.request.method).toBe('POST');
    req.flush(newStock);
  });

  it('should edit a stock', () => {
    const editedStock = { idStock: 1, libelleStock: 'Updated Stock', quantity: 150 };

    service.editStock(editedStock).subscribe(response => {
      expect(response).toEqual(editedStock);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/stock/modify-stock');
    expect(req.request.method).toBe('PUT');
    req.flush(editedStock);
  });

  it('should delete a stock', () => {
    const stockId = 1;

    service.deleteStock(stockId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`http://localhost:8089/SpringMVC/stock/remove-stock/${stockId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
