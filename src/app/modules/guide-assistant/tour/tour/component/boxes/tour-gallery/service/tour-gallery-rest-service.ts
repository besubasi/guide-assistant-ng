import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

import {BaseRestService} from "../../../../../../common/service/base-rest-service";
import {EndpointConstant} from "../../../../../../common/constant/endpoint-constant";
import {ApiResponse} from "../../../../../../common/model/api-response";

import {TourGalleryModel as M} from "../model/tour-gallery-model";
import {TourGallerySaveModel} from "../model/tour-gallery-save-model";
import {TourGalleryContentUpdateModel} from "../model/tour-gallery-content-update-model";

@Injectable({
    providedIn: 'root'
})
export class TourGalleryRestService extends BaseRestService {

    constructor(public override httpClient: HttpClient) {
        super(httpClient, EndpointConstant.TOUR_GALLERY_SERVICE_NAME);
    }

    public createFiles(formData: FormData): Observable<Boolean> {
        return this.httpClient.post<ApiResponse>(this.ENDPOINT_CREATE_FILES, formData)
            .pipe(map((apiResponse) => Boolean(apiResponse.data)));
    }

    public createAll(modelList: TourGallerySaveModel[]): Observable<Array<M>> {
        return this.httpClient
            .post<ApiResponse>(this.ENDPOINT_CREATE_ALL, this.converter.serializeArray(modelList, TourGallerySaveModel))
            .pipe(map((apiResponse) => this.converter.deserializeArray(apiResponse.data || [], M)));
    }

    public create(model: TourGallerySaveModel): Observable<M> {
        return this.httpClient
            .post<ApiResponse>(this.ENDPOINT_CREATE, this.converter.serialize(model, TourGallerySaveModel))
            .pipe(map((apiResponse) => this.converter.deserializeObject(apiResponse.data, M)));
    }

    public update(model: M): Observable<M> {
        return this.httpClient
            .post<ApiResponse>(this.ENDPOINT_UPDATE, this.converter.serialize(model, M))
            .pipe(map((apiResponse) => this.converter.deserializeObject(apiResponse.data, M)));
    }

    public updateContent(model: TourGalleryContentUpdateModel): Observable<M> {
        return this.httpClient
            .post<ApiResponse>(this.ENDPOINT_UPDATE_CONTENT, this.converter.serialize(model, TourGalleryContentUpdateModel))
            .pipe(map((apiResponse) => this.converter.deserializeObject(apiResponse.data, M)));
    }

    public deleteById(id: number): Observable<any> {
        return this.httpClient.delete(this.ENDPOINT_DELETE_BY_ID + id);
    }

    public getById(id: number): Observable<M> {
        return this.httpClient.get<ApiResponse>(this.ENDPOINT_GET_BY_ID + id)
            .pipe(map((apiResponse) => this.converter.deserializeObject(apiResponse.data, M)));
    }

    public getListByTourId(tourId: number): Observable<Array<M>> {
        return this.httpClient.get<ApiResponse>(this.ENDPOINT_GET_LIST_BY_TOUR_ID + tourId)
            .pipe(map((apiResponse) => this.converter.deserializeArray(apiResponse.data || [], M)));
    }

}
