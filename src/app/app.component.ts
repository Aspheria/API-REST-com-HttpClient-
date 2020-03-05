import { Component, OnInit } from '@angular/core';
import { Pcc } from './models/pcc';
import { NgForm } from '@angular/forms';
import { PccService } from './services/pcc.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  pcc = {} as Pcc;
  Pccs: Pcc[];

  constructor(private pccService: PccService) {}
  
  ngOnInit() {
    this.getPccs();
  }

  // defini se um carro será criado ou atualizado
  savePcc(form: NgForm) {
    if (this.pcc.id !== undefined) {
      this.pccService.updatePcc(this.pcc).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.pccService.savePcc(this.pcc).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os carros
  getPccs() {
    this.pccService.getPccs().subscribe((pccs: Pcc[]) => {
      this.pccs = pccs;
    });
  }

  // deleta um carro
  deletePcc(pcc: Pcc) {
    this.pccService.deletePcc(pcc).subscribe(() => {
      this.getPccs();
    });
  }

  // copia o carro para ser editado.
  editPcc(pcc: Pcc) {
    this.pcc = { ...pcc };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getPccs();
    form.resetForm();
    pcc = {} as Pcc;
  }

}