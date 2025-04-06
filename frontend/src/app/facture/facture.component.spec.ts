import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FactureComponent } from './facture.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FactureService } from '../shared/Service/Facture.service';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { Facture } from '../shared/Model/Facture';

describe('FactureComponent', () => {
  let component: FactureComponent;
  let fixture: ComponentFixture<FactureComponent>;
  let factureServiceSpy: jasmine.SpyObj<FactureService>;
  let modalServiceSpy: jasmine.SpyObj<NgbModal>;
  let loggerSpy: jasmine.SpyObj<NGXLogger>;

  beforeEach(async () => {
    // Création des spies pour les services
    const factureServiceSpyObj = jasmine.createSpyObj('FactureService', ['getAllFactures', 'addFacture']);
    const modalServiceSpyObj = jasmine.createSpyObj('NgbModal', ['open']);
    const loggerSpyObj = jasmine.createSpyObj('NGXLogger', ['info']);

    await TestBed.configureTestingModule({
      declarations: [ FactureComponent ],
      providers: [
        { provide: FactureService, useValue: factureServiceSpyObj },
        { provide: NgbModal, useValue: modalServiceSpyObj },
        { provide: NGXLogger, useValue: loggerSpyObj }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureComponent);
    component = fixture.componentInstance;

    // Initialisation des spies
    factureServiceSpy = TestBed.inject(FactureService) as jasmine.SpyObj<FactureService>;
    modalServiceSpy = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;
    loggerSpy = TestBed.inject(NGXLogger) as jasmine.SpyObj<NGXLogger>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all factures on ngOnInit', () => {
    const fakeFactures: Facture[] = [
      { idFacture: 1, montantRemise: 5, montantFacture: 100, dateCreationFacture: new Date(), dateDerniereModificationFacture: new Date(), archivee: false }
    ];
    
    // Simulation de la réponse du service
    factureServiceSpy.getAllFactures.and.returnValue(of(fakeFactures));

    component.ngOnInit();

    expect(factureServiceSpy.getAllFactures).toHaveBeenCalled();
    expect(component.listFactures).toEqual(fakeFactures);
  });

  it('should add a new facture', () => {
    const newFacture: Facture = {
      idFacture: 2,
      montantRemise: 10,
      montantFacture: 200,
      dateCreationFacture: new Date(),
      dateDerniereModificationFacture: new Date(),
      archivee: false
    };

    // Simulation de la réponse du service pour l'ajout d'une facture
    factureServiceSpy.addFacture.and.returnValue(of({}));
    
    spyOn(component, 'getAllFactures');  // Spy sur la méthode getAllFactures pour vérifier qu'elle est appelée

    component.addFacture(newFacture);

    expect(factureServiceSpy.addFacture).toHaveBeenCalledWith(newFacture);
    expect(component.getAllFactures).toHaveBeenCalled();
    expect(component.form).toBeFalse();  // Vérifier que le formulaire est caché après l'ajout
  });

  it('should cancel and hide the form', () => {
    component.form = true;
    component.cancel();
    expect(component.form).toBeFalse();
  });

  it('should open modal and handle close', async () => {
    const fakeModalRef = {
      result: Promise.resolve('Test close')
    };

    modalServiceSpy.open.and.returnValue(fakeModalRef as any);

    await component.open('modalContent');

    expect(modalServiceSpy.open).toHaveBeenCalledWith('modalContent', { ariaLabelledBy: 'modal-basic-title' });
    // Comme closeResult est modifié en asynchrone, tu dois attendre le `then`
    await fakeModalRef.result.then(() => {
      expect(component.closeResult).toBe('Closed with: Test close');
    });
  });

  it('should open modal and handle dismiss ESC', async () => {
    const fakeModalRef = {
      result: Promise.reject(ModalDismissReasons.ESC)
    };

    modalServiceSpy.open.and.returnValue(fakeModalRef as any);

    await component.open('modalContent');

    await fakeModalRef.result.catch(() => {
      expect(component.closeResult).toBe('Dismissed by pressing ESC');
    });
  });

  it('should open modal and handle dismiss BACKDROP_CLICK', async () => {
    const fakeModalRef = {
      result: Promise.reject(ModalDismissReasons.BACKDROP_CLICK)
    };

    modalServiceSpy.open.and.returnValue(fakeModalRef as any);

    await component.open('modalContent');

    await fakeModalRef.result.catch(() => {
      expect(component.closeResult).toBe('Dismissed by clicking on a backdrop');
    });
  });

  it('should return custom dismiss reason if not ESC or BACKDROP_CLICK', () => {
    const reason = 'Something else';
    const result = (component as any).getDismissReason(reason); // méthode privée
    expect(result).toBe('with: Something else');
  });

  it('should log when getting dismiss reason', () => {
    const reason = ModalDismissReasons.ESC;
    (component as any).getDismissReason(reason);
    expect(loggerSpy.info).toHaveBeenCalledWith('Modal dismissed with reason:', reason);
  });
  
});
