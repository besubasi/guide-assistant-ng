import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

import {BaseRestService} from "../../../../../common/service/base-rest-service";
import {EndpointConstant} from "../../../../../common/constant/endpoint-constant";
import {ApiResponse} from "../../../../../common/model/api-response";

import {ActivityDescriptionModel as M} from "../model/activity-description-model";

@Injectable({
    providedIn: 'root'
})
export class ActivityDescriptionRestService extends BaseRestService {

    constructor(public override httpClient: HttpClient) {
        super(httpClient, EndpointConstant.ACTIVITY_DESCRIPTION_SERVICE_NAME);
    }

    public save(model: M): Observable<M> {
        return this.httpClient
            .post<ApiResponse>(this.ENDPOINT_SAVE, this.converter.serialize(model, M))
            .pipe(map((apiResponse) => this.converter.deserializeObject(apiResponse.data, M)));
    }

    public deleteById(id: number): Observable<any> {
        return this.httpClient.delete(this.ENDPOINT_DELETE_BY_ID + id);
    }

    public getByActivityId(activityId: number): Observable<M> {
        return this.httpClient.get<ApiResponse>(this.ENDPOINT_GET_BY_ACTIVITY_ID + activityId)
            .pipe(map((apiResponse) => this.converter.deserializeObject(apiResponse.data, M)));
    }

}
