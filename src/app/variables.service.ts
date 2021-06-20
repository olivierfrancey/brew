import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  tare: number;
  tds= true;

  constructor() { }

  getTare(){
    return this.tare;
  }

  getTds(){
    return this.tds;
  }

  setTare(value){
    this.tare = value;
    console.log('tare set as :' + this.tare);
  }

  setTds(value){
    this.tds = value;
    console.log('tds set as : ' + this.tds);
  }
}
