import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

import {BaseRestService} from "../../../../common/service/base-rest-service";
import {EndpointConstant} from "../../../../common/constant/endpoint-constant";
import {ApiResponse} from "../../../../common/model/api-response";

import {TourDayDescriptionModel as M} from "../model/tour-day-description-model";
import {TourDayDescriptionSearchModel as SM} from "../model/tour-day-description-search-model";

@Injectable({
    providedIn: 'root'
})
export class TourDayDescriptionRestService extends BaseRestService {

    constructor(public override httpClient: HttpClient) {
        super(httpClient, EndpointConstant.TOUR_DAY_DESCRIPTION_SERVICE_NAME);
    }

    public save(model: M): Observable<M> {
        return this.httpClient
            .post<ApiResponse>(this.ENDPOINT_SAVE, this.converter.serialize(model, M))
            .pipe(map((apiResponse) => this.converter.deserializeObject(apiResponse.data, M)));
    }

    public delete(id: number): Observable<any> {
        return this.httpClient.delete(this.ENDPOINT_DELETE_BY_ID + id);
    }

    public getById(id: number): Observable<M> {
        return this.httpClient.get<ApiResponse>(this.ENDPOINT_GET_BY_ID + id)
            .pipe(map((apiResponse) => this.converter.deserializeObject(apiResponse.data, M)));
    }

    public getList(searchModel: SM): Observable<Array<M>> {
        return this.httpClient
            .post<ApiResponse>(this.ENDPOINT_GET_LIST, this.converter.serialize(searchModel, SM))
            .pipe(map((apiResponse) => this.converter.deserializeArray(apiResponse.data || [], M)));
    }

}
