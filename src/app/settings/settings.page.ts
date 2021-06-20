import { Component, OnInit } from '@angular/core';

import { VariablesService } from '../variables.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  tare: number;
  tds: string;
  tdsBoolean: boolean;

  constructor(private variablesService: VariablesService) { }

  ngOnInit() {
    this.getTare();
    this.getTds();
  }

  setTare(){
    this.variablesService.setTare(this.tare);
  }

  setTds(){
    console.log('this.tds : ' + this.tds);
    if(this.tds === 'tds'){
      this.variablesService.setTds(true);
    }else if(this.tds === 'brix'){
      this.variablesService.setTds(false);
    }
  }

  getTare(){
    this.tare = this.variablesService.getTare();
  }

  getTds(){
    const t = this.variablesService.getTds();
    if(t){
      this.tds = 'tds';
      this.tdsBoolean = true;
    }else{
      this.tds = 'brix';
      this.tdsBoolean = false;
    }
  }

}
