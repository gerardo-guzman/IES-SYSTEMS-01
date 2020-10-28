import { Component, OnInit } from '@angular/core';

export interface Type1{
  value: number;
  name: string;
}

@Component({
  selector: 'app-component-one',
  templateUrl: './component-one.component.html',
  styleUrls: ['./component-one.component.css']
})
export class ComponentOneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.ejercicioUno();
    this.ejercicioDos();
  }

  ejercicioUno() {
    console.log('EJERCICIO 1 - OBJETO A ARRAY');
    const array = [ { value: 1 , name: 'CampoUno'}, { value: 2 , name: 'CampoDos'}, { value: 3 , name: 'CampoTres'}, { value: 4 , name: 'CampoCuatro'}, { value: 5 , name: 'CampoCinco'}, { value: 6 , name: 'CampoSeis'}, ]; 
    const objConverted = this.convertArrayToObj(array);
    console.log(objConverted);
    console.log('--------------------------------');
  }

  ejercicioDos() {
    console.log('EJERCICIO 2 - ARRAY A OBJETO');
    const obj =  { CampoUno: 1, CampoDos: 2, CampoTres: 3, CampoCuatro: 4, CampoCinco: 5, CampoSeis: 6 };
    console.log(this.convertObjToArray(obj));
    console.log('--------------------------------');
  }

  convertArrayToObj(array: Type1[]) {
    return array.reduce((prevV, currentV) => ({
      ...prevV,
      [currentV.name]: currentV.value
    }));
  }

  convertObjToArray(obj: Object) {
    const array = [];
    Object.keys(obj).map((key) => {
      array.push({
        name: key,
        value: obj[key]
      })
    });
    return array;
  }

}
