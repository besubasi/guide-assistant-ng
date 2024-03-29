import {HttpClient} from '@angular/common/http';
import {JsonConvert} from 'json2typescript';

import {EndpointConstant} from "../constant/endpoint-constant";

export class BaseRestService {

    public converter: JsonConvert;

    public ENDPOINT_SAVE: string;
    public ENDPOINT_SAVE_BATCH: string;
    public ENDPOINT_CREATE_CONTENT_LIST: string;
    public ENDPOINT_UPDATE_CONTENT: string;
    public ENDPOINT_DELETE_BY_ID: string;
    public ENDPOINT_GET_BY_ID: string;
    public ENDPOINT_GET_BY_TOUR_ID: string;
    public ENDPOINT_GET_BY_ACTIVITY_ID: string;
    public ENDPOINT_GET_LIST_BY_TOUR_ID: string;
    public ENDPOINT_GET_LIST_BY_ACTIVITY_ID: string;
    public ENDPOINT_GET_LOOKUP_LIST: string;
    public ENDPOINT_GET_LIST: string;
    public ENDPOINT_GET_PAGE: string;

    constructor(public httpClient: HttpClient, serviceUrl: string) {
        this.converter = new JsonConvert();
        this.ENDPOINT_SAVE = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_SAVE;
        this.ENDPOINT_SAVE_BATCH = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_SAVE_BATCH;
        this.ENDPOINT_CREATE_CONTENT_LIST = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_CREATE_CONTENT_LIST;
        this.ENDPOINT_UPDATE_CONTENT = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_UPDATE_CONTENT;
        this.ENDPOINT_DELETE_BY_ID = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_DELETE_BY_ID;
        this.ENDPOINT_GET_BY_ID = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_GET_BY_ID;
        this.ENDPOINT_GET_BY_TOUR_ID = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_GET_BY_TOUR_ID;
        this.ENDPOINT_GET_BY_ACTIVITY_ID = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_GET_BY_ACTIVITY_ID;
        this.ENDPOINT_GET_LIST_BY_TOUR_ID = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_GET_LIST_BY_TOUR_ID;
        this.ENDPOINT_GET_LIST_BY_ACTIVITY_ID = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_GET_LIST_BY_ACTIVITY_ID;
        this.ENDPOINT_GET_LOOKUP_LIST = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_GET_LOOKUP_LIST;
        this.ENDPOINT_GET_LIST = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_GET_LIST;
        this.ENDPOINT_GET_PAGE = EndpointConstant.BASE_ENDPOINT + serviceUrl + EndpointConstant.MAPPING_GET_PAGE;
    }

}
