import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

import {BaseRestService} from "../../../../../../common/service/base-rest-service";
import {EndpointConstant} from "../../../../../../common/constant/endpoint-constant";
import {ApiResponse} from "../../../../../../common/model/api-response";

import {TourDescriptionModel as M} from "../model/tour-description-model";

@Injectable({
    providedIn: 'root'
})
export class TourDescriptionRestService extends BaseRestService {

    constructor(public override httpClient: HttpClient) {
        super(httpClient, EndpointConstant.TOUR_DESCRIPTION_SERVICE_NAME);
    }

    public save(model: M): Observable<M> {
        return this.httpClient
            .post<ApiResponse>(this.ENDPOINT_SAVE, this.converter.serialize(model, M))
            .pipe(map((apiResponse) => this.converter.deserializeObject(apiResponse.data, M)));
    }

    public delete(id: number): Observable<any> {
        return this.httpClient.delete(this.ENDPOINT_DELETE_BY_ID + id);
    }

    public getByTourId(tourId: number): Observable<M> {
        return this.httpClient.get<ApiResponse>(EndpointConstant.BASE_ENDPOINT + EndpointConstant.TOUR_DESCRIPTION_SERVICE_NAME + EndpointConstant.MAPPING_GET_BY_TOUR_ID + tourId)
            .pipe(map((apiResponse) => this.converter.deserializeObject(apiResponse.data, M)));
    }


}
