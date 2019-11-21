import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {

  usuario:Object = {
    nombre: null,
    apellido: null,
    email:null,
    pais: "",
    sexo: "",
    acepta: false
  }

  paises = [
    {
    codigo: "COL",
    nombre: "Colombia"
    },
    {
      codigo: "CRI",
      nombre: "Costa Rica"
    },
    {
      codigo: "ESP",
      nombre: "España"
    },
  ]

  sexos:string[] = ["Hombre", "Mujer", "Otro"];
  constructor() { }

  guardar(forma:NgForm){
    console.log(forma);
  }

}
