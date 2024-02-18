import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {JsonConvert} from 'json2typescript';

import {TourCategoryModel as T} from "../model/tour-category-model";
import {TourCategorySearchModel as Q} from "../model/tour-category-search-model";
import {map} from "rxjs/operators";
import {ApiResponse} from "../../../common/api-response";

@Injectable({
    providedIn: 'root'
})
export class TourCategoryRestService {

    private endpoint = 'http://localhost:8080/guide/tour-category';

    constructor(private httpClient: HttpClient) {
    }

    public save(model: T) {
        return this.httpClient.post(`${this.endpoint}/save`, model);
    }


    public delete(id: number): Observable<any> {
        return this.httpClient.delete(this.endpoint + "/" + id);
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

    public getList(queryModel: Q): Observable<Array<T>> {
        const converter = new JsonConvert();

        return this.httpClient
            .post<ApiResponse>(this.endpoint + '/getList', converter.serialize(queryModel, Q))
            .pipe(map((data) => converter.deserializeArray(data.body || [], T)));
    }

}
