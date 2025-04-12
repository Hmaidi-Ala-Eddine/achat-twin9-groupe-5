import { TestBed } from '@angular/core/testing';
import { ReglementService } from './Reglement.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ReglementService', () => {
  let service: ReglementService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReglementService]
    });

    service = TestBed.inject(ReglementService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all reglements', () => {
    const dummyReglements = [
      { idReglement: 1, montant: 100, dateReglement: '2025-01-01' },
      { idReglement: 2, montant: 200, dateReglement: '2025-01-02' }
    ];

    service.getAllReglements().subscribe(reglements => {
      expect(reglements).toEqual(dummyReglements);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/reglement/retrieve-all-reglements');
    expect(req.request.method).toBe('GET');
    req.flush(dummyReglements);
  });

  it('should add a reglement', () => {
    const newReglement = { idReglement: 3, montant: 300, dateReglement: '2025-01-03' };

    service.addReglement(newReglement).subscribe(response => {
      expect(response).toEqual(newReglement);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/reglement/add-reglement');
    expect(req.request.method).toBe('POST');
    req.flush(newReglement);
  });
});
