import { TestBed } from '@angular/core/testing';
import { OperateurService } from './Operateur.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NGXLogger } from 'ngx-logger';

describe('OperateurService', () => {
  let service: OperateurService;
  let httpMock: HttpTestingController;
  let loggerSpy: jasmine.SpyObj<NGXLogger>;

  beforeEach(() => {
    const loggerMock = jasmine.createSpyObj('NGXLogger', ['info', 'warn', 'debug', 'error']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OperateurService,
        { provide: NGXLogger, useValue: loggerMock }
      ]
    });

    service = TestBed.inject(OperateurService);
    httpMock = TestBed.inject(HttpTestingController);
    loggerSpy = TestBed.inject(NGXLogger) as jasmine.SpyObj<NGXLogger>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all operateurs', () => {
    const dummyOperateurs = [
      { idOperateur: 1, nom: 'Ahmed', prenom: 'Ben Salah', password: '123' },
      { idOperateur: 2, nom: 'Youssef', prenom: 'Mansouri', password: 'abc' }
    ];

    service.getAllOperateurs().subscribe(operateurs => {
      expect(operateurs).toEqual(dummyOperateurs);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/operateur/retrieve-all-operateurs');
    expect(req.request.method).toBe('GET');
    req.flush(dummyOperateurs);
  });

  it('should add an operateur', () => {
    const newOperateur = { idOperateur: 3, nom: 'Ali', prenom: 'Zarrouk', password: 'xyz' };

    service.addOperateur(newOperateur).subscribe(response => {
      expect(response).toEqual(newOperateur);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/operateur/add-operateur');
    expect(req.request.method).toBe('POST');
    req.flush(newOperateur);
  });

  it('should edit an operateur', () => {
    const editedOperateur = { idOperateur: 1, nom: 'Ahmed', prenom: 'Ben Salah', password: '1234' };

    service.editOperateur(editedOperateur).subscribe(response => {
      expect(response).toEqual(editedOperateur);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/operateur/modify-operateur');
    expect(req.request.method).toBe('PUT');
    req.flush(editedOperateur);
  });

  it('should delete an operateur', () => {
    const operateurId = 1;

    service.deleteOperateur(operateurId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`http://localhost:8089/SpringMVC/operateur/remove-operateur/${operateurId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
