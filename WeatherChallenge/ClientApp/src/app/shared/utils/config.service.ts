import { Injectable } from '@angular/core';
import { BaseUrlEnum } from 'app/shared/enums/url-enum';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class ConfigService {

    _apiURI: string;

    constructor() {
        this._apiURI = BaseUrlEnum.BASE_URL.toString() + '/api';
    }

    getApiURI() {
        return this._apiURI;
    }
}
