import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Operateur } from '../shared/Model/Operateur';
import { OperateurService } from '../shared/Service/Operateur.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-operateur',
  templateUrl: './operateur.component.html',
  styleUrls: ['./operateur.component.css']
})
export class OperateurComponent implements OnInit {

  listOperateurs: any;
  form: boolean = false;
  operateur!: Operateur;
  closeResult!: string;

  constructor(
    private operateurService: OperateurService,
    private modalService: NgbModal,
    private logger: NGXLogger
  ) {}

  ngOnInit(): void {
    this.logger.info('OperateurComponent initialized');
    this.getAllOperateurs();

    this.operateur = {
      idOperateur: null,
      nom: null,
      prenom: null,
      password: null
    };
  }

  getAllOperateurs() {
    this.logger.debug('Fetching all operators...');
    this.operateurService.getAllOperateurs().subscribe(
      res => {
        this.listOperateurs = res;
        this.logger.info('Operators fetched successfully', res);
      },
      error => this.logger.error('Error fetching operators', error)
    );
  }

  addOperateur(o: any) {
    this.logger.debug('Adding new operator...', o);
    this.operateurService.addOperateur(o).subscribe(
      () => {
        this.logger.info('Operator added successfully');
        this.getAllOperateurs();
        this.form = false;
      },
      error => this.logger.error('Error adding operator', error)
    );
  }

  editOperateur(operateur: Operateur) {
    this.logger.debug(`Editing operator with ID: ${operateur.idOperateur}`, operateur);
    this.operateurService.editOperateur(operateur).subscribe(
      () => this.logger.info(`Operator ${operateur.idOperateur} edited successfully`),
      error => this.logger.error(`Error editing operator ${operateur.idOperateur}`, error)
    );
  }

  deleteOperateur(idOperateur: any) {
    this.logger.warn(`Deleting operator with ID: ${idOperateur}`);
    this.operateurService.deleteOperateur(idOperateur).subscribe(
      () => {
        this.logger.info(`Operator ${idOperateur} deleted successfully`);
        this.getAllOperateurs();
      },
      error => this.logger.error(`Error deleting operator ${idOperateur}`, error)
    );
  }

  open(content: any, action: any) {
    if (action != null) {
      this.operateur = action;
      this.logger.debug(`Opening modal for editing operator ID: ${action.idOperateur}`);
    } else {
      this.operateur = new Operateur();
      this.logger.debug('Opening modal for adding a new operator');
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        this.logger.info(`Modal closed: ${result}`);
      },
      (reason) => {
        const reasonText = this.getDismissReason(reason);
        this.closeResult = `Dismissed ${reasonText}`;
        this.logger.warn(`Modal dismissed: ${reasonText}`);
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
