import {HttpClient} from '@angular/common/http';
import {JsonConvert} from 'json2typescript';

import {EndpointConstant} from "../constant/endpoint-constant";

export class BaseRestService {

    public converter: JsonConvert;

    public ENDPOINT_SAVE: string;
    public ENDPOINT_DELETE_BY_ID: string;
    public ENDPOINT_GET_BY_ID: string;
    public ENDPOINT_GET_LIST: string;
    public ENDPOINT_GET_PAGE: string;

    constructor(public httpClient: HttpClient, serviceUrl: string) {
        this.converter = new JsonConvert();
        this.ENDPOINT_SAVE = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_SAVE;
        this.ENDPOINT_DELETE_BY_ID = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_DELETE_BY_ID;
        this.ENDPOINT_GET_BY_ID = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_GET_BY_ID;
        this.ENDPOINT_GET_LIST = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_GET_LIST;
        this.ENDPOINT_GET_PAGE = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_GET_PAGE;
    }


    /*
        public getById(id: number): Observable<T> {
            return this.httpClient
                .get<HvlResponse<T>>(this.endpoint + id)
                .pipe(map((data) => new JsonConvert().deserializeObject(data.body, T)));
        }

        public getByUuid(uuid: string): Observable<T> {
            return this.httpClient
                .get<HvlResponse<T>>(this.endpoint + 'uuid/' + uuid)
                .pipe(map((data) => new JsonConvert().deserializeObject(data.body, T)));
        }

        public exists(queryModel: Q): Observable<boolean> {
            return this.httpClient
                .post<HvlResponse<boolean>>(this.endpoint + 'exists', new JsonConvert().serialize(queryModel, Q))
                .pipe(map((data) => Boolean(data.body)));
        }

        public existsById(id: number): Observable<boolean> {
            return this.httpClient
                .get<HvlResponse<boolean>>(this.endpoint + 'exists/' + id)
                .pipe(map((data) => Boolean(data.body)));
        }

            public queryList(queryModel: Q): Observable<Array<T>> {
        const converter = new JsonConvert();

        return this.httpClient
            .post<HvlResponse<Array<T>>>(this.endpoint + 'query', converter.serialize(queryModel, Q))
            .pipe(map((data) => converter.deserializeArray(data.body || [], T)));
    }

    */


}
