import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { IValues } from '../models/values.interface'
import { BehaviorSubject } from 'rxjs/Rx';
import { ConfigService } from '../utils/config.service';

@Injectable()
export class ValuesService {
    baseUrl: string = '';
    handleError: any;
    constructor(private _http: Http, private configService: ConfigService) {
        console.log('Cities Service Constructor');
        this.baseUrl = configService.getApiURI();
    }

    
    //data from cities
    getCities(): Observable<any> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.get(this.baseUrl + '/values/city', { headers })
            .map(res => res.json())
            .catch(this.handleError);

    }

  //data from  GetTemperature() controller
  getTemperature(): Observable<any> {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.get(this.baseUrl + '/values/temperature', { headers })
      .map(res => res.json())
      .catch(this.handleError);

  }


  getApiData(parametros: string): any {

      let headers = new Headers();  
      headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + "/values/apiwatherdata?" + parametros, { headers })
        .map(res => res.json()).catch(this.handleError);

    }


    

}

