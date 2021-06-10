import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cep } from 'src/models/cep.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ConsultaCEP';

  cep: Cep;
  constructor(private http: HttpClient, private _snackBar: MatSnackBar  ) { }

  public buscarCep(cep: any) {

    let numeroCEP = cep.value.replace("-", "");

    if (cep.value.length === 9 && numeroCEP.length === 8 && !isNaN(numeroCEP)) {
      this.http.get(`https://viacep.com.br/ws/${numeroCEP}/json/`).subscribe(
        resp => {
          this.cep = resp;
        }
      );
    }
    else
      this.openSnackBar('cep inválido!', 'tente novamente')
  }

  public limparTela() {
    this.cep = null;
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
