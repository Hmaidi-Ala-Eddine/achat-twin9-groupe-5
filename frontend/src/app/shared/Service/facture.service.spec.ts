import { TestBed } from '@angular/core/testing';
import { FactureService } from './Facture.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FactureService', () => {
  let service: FactureService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FactureService]
    });

    service = TestBed.inject(FactureService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all factures', () => {
    const dummyFactures = [
      { idFacture: 1, montant: 100, dateFacture: '2025-01-01' },
      { idFacture: 2, montant: 200, dateFacture: '2025-01-02' }
    ];

    service.getAllFactures().subscribe(factures => {
      expect(factures).toEqual(dummyFactures);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/facture/retrieve-all-factures');
    expect(req.request.method).toBe('GET');
    req.flush(dummyFactures);
  });

  it('should add a facture', () => {
    const newFacture = { idFacture: 3, montant: 300, dateFacture: '2025-01-03' };

    service.addFacture(newFacture).subscribe(response => {
      expect(response).toEqual(newFacture);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/facture/add-facture');
    expect(req.request.method).toBe('POST');
    req.flush(newFacture);
  });
});
