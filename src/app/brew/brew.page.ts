import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { VariablesService } from '../variables.service';

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

import { Brew } from './Brew';

@Component({
  selector: 'app-brew',
  templateUrl: './brew.page.html',
  styleUrls: ['./brew.page.scss'],
})
export class BrewPage implements OnInit {
  @ViewChild('brewChart') chart;

  brewingChart: any;
  colorArray: any;
  borderColor = 'rgb(110, 108, 107)';

  data = {
    datasets: [{
      label: '1',
      data: [{
        x: 0.18,
        y: 0.008
      }, {
        x: 0.18,
        y: 0.016
      }],
      showLine: true,
      fill: false,
      borderColor: this.borderColor
    },
    {
      label: '2',
      data: [{
        x: 0.22,
        y: 0.008
      }, {
        x: 0.22,
        y: 0.016
      }],
      showLine: true,
      fill: false,
      borderColor: this.borderColor
    },
    {
      label: '3',
      data: [{
        x: 0.14,
        y: 0.0115
      }, {
        x: 0.26,
        y: 0.0115
      }],
      showLine: true,
      fill: false,
      borderColor: this.borderColor
    },
    {
      label: '4',
      data: [{
        x: 0.14,
        y: 0.0135
      }, {
        x: 0.26,
        y: 0.0135
      }],
      showLine: true,
      fill: false,
      borderColor: this.borderColor,
      pointColor: '#000',
      // strokeColor: '#fff',
      // fillColor: '#fff',
      pointStrokeColor: '#000',
    }],
  };

  brew: Brew;
  tare: number;
  brewWeightPlusTare: number;
  brewRatio: number;
  solublesYield: number;
  solublesWeight: number;
  tdsBrix: number;
  message: string;

  constructor(private variablesService: VariablesService) { }

  ngOnInit() {
    this.brew = {
      waterWeight : 320,
      coffeeWeight : 20,
      tds: true
    };
    this.tare = this.variablesService.getTare() || 0;
    this.brew.tds = this.variablesService.getTds();
    this.message = '';
    this.calc();
  }

  calc(){
    console.log('---calc---');
    console.log(this.brew.tds);
    if(this.tdsBrix > .3){
      this.tdsBrix /= 100;
    }
    if(this.brew.waterWeight && this.brew.coffeeWeight && this.brewWeightPlusTare && this.tdsBrix){
      console.log('ok');
      let coefTDS = 0;
      let coefBRIX = 0;
      if(this.brew.tds){
        coefTDS = 1;
        coefBRIX = 1/0.85;
      } else {
        coefTDS = 0.85;
        coefBRIX = 1;
      }
      this.brew.tdsValue = this.tdsBrix * coefTDS;
      this.brew.brixValue = this.tdsBrix * coefBRIX;
      this.brew.brewWeight = this.brewWeightPlusTare - this.tare;
      this.solublesWeight = (this.brew.brewWeight) * coefTDS * this.brew.tdsValue;
      this.solublesYield = this.solublesWeight / this.brew.coffeeWeight;
      this.message = this.getMessage(this.brew.tdsValue, this.solublesYield);
      if(this.data.datasets.length > 4){
        this.data.datasets.pop();
      }
      this.data.datasets.push({
        label: '5',
        data: [{
          x: this.solublesYield,
          y: this.brew.tdsValue
        }],
        showLine: true,
        fill: true,
        borderColor: 'rgb(255, 99, 132)',
      });
      this.createBarChart();
    }
  }

  createBarChart() {
    if(this.brewingChart){this.brewingChart.destroy();}
    this.brewingChart = new Chart(this.chart.nativeElement, {
      type: 'scatter',
      data: this.data,
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        },
        plugins: {
          legend: {
            display: false,
          }
        }
      }
    });
  }

  getMessage(t, y){
    let message = '';

    if(y < 0.18){
      if(t < 0.0115){
        message = 'Weak & Underextracted';
      } else if (t > 0.0145){
        message = 'Strong & Underextracted';
      } else {
        message = 'Underextracted';
      }
    } else if ( y >0.22){
      if(t < 0.0115){
        message = 'Weak & Overextracted';
      }else if(t > 0.0145){
        message = 'Strong & Overextracted';
      }else{
        message = 'Overextracted';
      }
    } else {
      if(t < 0.0115){
        message = 'Weak';
      }else if(t > 0.0145){
        message = 'Strong';
      }else{
        message = 'SCA Ideal';
      }
    }
    return message;
  }

}

