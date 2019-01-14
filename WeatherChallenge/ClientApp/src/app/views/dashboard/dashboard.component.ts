import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Http, Response } from '@angular/http';
import { ModalDirective, BsModalService } from 'ngx-bootstrap/modal';
import { Component, ViewChild, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { Routes, RouterModule, CanActivate, Router } from '@angular/router';
import { ValuesService } from 'app/shared/services/values.service';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { IApiData } from 'app/shared/models/apidata.interface';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';




@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: [
    '../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../scss/vendors/ng-select/ng-select.scss',
    '../../../scss/vendors/toastr/toastr.scss'
  ],
    providers: [ValuesService],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  @ViewChild('primaryModal') public myModalSuccess: ModalDirective;
  @ViewChild('dangerModal') public myModalError: ModalDirective;

  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 10000
    });

  //variables 

  _cities: any[] = [];
  _temp: any[] = [];
  _apiData: any[] = [];
  _ChartData: Array<any>;
  bsValue: Date = new Date();
  temp: string;
  city: string;
  dataApiTemp: any[] = [];
  dataApiDate: any[] = [];
  _resultmsg: string;
  _resulthdr: string;
  valueTable: any;

  public dtOptions = {
  pagingType: 'full_numbers',
  pageLength: 5,
  processing: true
};


  //inicia la configuracion del chart
  public _labelsData: Array<any> = [{ data: [], label: '' }];
  public _labels: Array<any> = [];
  
  public mainChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: true,
        },
        ticks: {
          callback: function (value: any) {
            return value;
          },
          beginAtZero: true,
          max: 17
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          max: 90
        }
      }]
    },
    legend: {
      display: true
    }
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public mainChartType = 'line';

  //termina la configuracion del chart

    constructor(private http: Http, private _valuesService: ValuesService) {
        
    }
  
 
 //eventos de cambio de valor 
  changeValueTemp(value) {
    console.log(value);
    this.temp = value;
    this.updateGrah();
  } 
  //eventos de cambio de valor 
  changeValueCity(value) {
    console.log(value);
    this.city = value;
    this.updateGrah();
  } 

    // list of cities
   getCity(): void {
        this._valuesService.getCities()
            .subscribe(res => {
              this._cities = res;
            },
            error => {
                
            });
    }

  // list of temps
  gettemp(): void {
    this._valuesService.getTemperature()
      .subscribe(res => {
        this._temp = res;
      },
        error => {
          
        });
  }

  //obtiene las datos desde el controlador mediante la api
  updateGrah(): void {
    this._valuesService.getApiData("city=" + this.city + "&tempType=" + (this.temp == "Celsius" ? "M" : "I") + "&date=" + this.bsValue.getDate() + "-" + this.bsValue.getMonth()+1 + "-" + this.bsValue.getFullYear())
      .subscribe(res => {
        this.valueTable = res;
        this.dataApiTemp.length = 0;
        this.dataApiDate.length = 0;
        for (let o of res) {
          this.dataApiTemp.push(o.temp);
          this.dataApiDate.push(o.date);
        }
        this._labelsData.length = 0;
        this._labels.length = 0;
        this._labelsData = [{ data: this.dataApiTemp, label: 'Weather' }];
       // this._labels = this.dataApiDate;
        this._labels.push(...this.dataApiDate);
        
      },
        error => {
          this._resulthdr = "Error";
          this._resultmsg = "Fecha no soportada por las limitantes del api de clima.";
          this.myModalError.show();
        });
  }

  

  private initTable() {

  }
  
    ngOnInit(): void {
      this.getCity();
      this.gettemp();
      this.temp = "Celsius";
      this.city = "Obregon";
      this.bsValue = new Date();

      this.updateGrah();
    }

    ngAfterViewInit() {

    }
  
}
