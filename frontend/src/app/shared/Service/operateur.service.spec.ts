import { TestBed } from '@angular/core/testing';
import { OperateurService } from './Operateur.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('OperateurService', () => {
  let service: OperateurService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OperateurService]
    });

    service = TestBed.inject(OperateurService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all operateurs', () => {
    const dummyOperateurs = [
      { idOperateur: 1, nom: 'Operateur 1', type: 'Type 1' },
      { idOperateur: 2, nom: 'Operateur 2', type: 'Type 2' }
    ];

    service.getAllOperateurs().subscribe(operateurs => {
      expect(operateurs).toEqual(dummyOperateurs);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/operateur/retrieve-all-operateurs');
    expect(req.request.method).toBe('GET');
    req.flush(dummyOperateurs);
  });

  it('should add an operateur', () => {
    const newOperateur = { idOperateur: 3, nom: 'Operateur 3', type: 'Type 3' };

    service.addOperateur(newOperateur).subscribe(response => {
      expect(response).toEqual(newOperateur);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/operateur/add-operateur');
    expect(req.request.method).toBe('POST');
    req.flush(newOperateur);
  });

  it('should edit an operateur', () => {
    const editedOperateur = { idOperateur: 1, nom: 'Updated Operateur', type: 'Updated Type' };

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
