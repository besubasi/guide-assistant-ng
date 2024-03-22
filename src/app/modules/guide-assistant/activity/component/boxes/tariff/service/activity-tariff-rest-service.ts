import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

import {ActivityTariffModel as M} from "../model/activity-tariff-model";
import {ActivityTariffSaveModel as SV} from "../model/activity-tariff-save-model";
import {ActivityTariffSearchModel as SM} from "../model/activity-tariff-search-model";
import {LookupModel as LM} from "../../../../../common/model/lookup-model";
import {EndpointConstant} from "../../../../../common/constant/endpoint-constant";
import {ApiResponse} from "../../../../../common/model/api-response";
import {BaseRestService} from "../../../../../common/service/base-rest-service";

@Injectable({
    providedIn: 'root'
})
export class ActivityTariffRestService extends BaseRestService {

    constructor(public override httpClient: HttpClient) {
        super(httpClient, EndpointConstant.ACTIVITY_TARIFF_SERVICE_NAME);
    }

    public save(saveModel: SV): Observable<SV> {
        return this.httpClient
            .post<ApiResponse>(this.ENDPOINT_SAVE, this.converter.serialize(saveModel, SV))
            .pipe(map((apiResponse) => this.converter.deserializeObject(apiResponse.data, SV)));
    }

    public deleteById(id: number): Observable<any> {
        return this.httpClient.delete(this.ENDPOINT_DELETE_BY_ID + id);
    }

    public getById(id: number): Observable<M> {
        return this.httpClient.get<ApiResponse>(this.ENDPOINT_GET_BY_ID + id)
            .pipe(map((apiResponse) => this.converter.deserializeObject(apiResponse.data, M)));
    }

    public getLookupList(searchModel: SM): Observable<Array<LM>> {
        return this.httpClient
            .post<ApiResponse>(this.ENDPOINT_GET_LOOKUP_LIST, this.converter.serialize(searchModel, SM))
            .pipe(map((apiResponse) => this.converter.deserializeArray(apiResponse.data || [], LM)));
    }

    public getList(searchModel: SM): Observable<Array<M>> {
        return this.httpClient
            .post<ApiResponse>(this.ENDPOINT_GET_LIST, this.converter.serialize(searchModel, SM))
            .pipe(map((apiResponse) => this.converter.deserializeArray(apiResponse.data || [], M)));
    }

}
