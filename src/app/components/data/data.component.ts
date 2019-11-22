import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {

  forma:FormGroup;

  usuario:any = {
    nombrecompleto: {
      nombre: "Wilmer",
      apellido: "jaramillo"
    },
    correo: "prueba@prueba.com"
  }

  constructor() {
    this.forma = new FormGroup({
      'nombrecompleto': new FormGroup({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl('', [Validators.required, this.noJaramillo])
      }),
      'correo': new FormControl('', [
        Validators.required, 
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
      ]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      'usuario': new FormControl('', Validators.required, this.existeUsuario),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl(),
    });

    // this.forma.setValue(this.usuario);
    this.forma.get('password2').setValidators([
      Validators.required,
      this.noIguales.bind(this.forma)
    ]);

    this.forma.controls['usuario'].valueChanges
      .subscribe( data => {
        console.log(data);
      });

    this.forma.controls['usuario'].statusChanges
    .subscribe( data => {
      console.log(data);
    });
  }

  guardarCambios(){
    this.forma.reset();
  }

  agregarPasatiempo(){
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    )
  }

  noJaramillo(control:FormControl): { [s:string]:boolean } {
    if(control.value === "jaramillo"){
      return {
        noherrera:true
      }
    }

    return null;
  }

  noIguales(control:FormControl): { [s:string]:boolean } {
    let forma:any = this;
    if (control.value !== forma.controls['password1'].value){
      return {
        noigual:true
      }
    }

    return null;
  }

  existeUsuario(control:FormControl): Promise<any>|Observable<any> {
    let promesa = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === "server"){
            resolve( {existe:true});
          } else{
            resolve(null);
          }
        }, 3000);
      }
    );

    return promesa;
  }

}
