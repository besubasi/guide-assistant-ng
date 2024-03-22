export class EndpointConstant {

    static BASE_ENDPOINT: string = 'http://localhost:8080/guide';

    static MAPPING_SAVE: string = "/save";
    static MAPPING_SAVE_BATCH: string = "/saveBatch";
    static MAPPING_CREATE_CONTENT_LIST: string = "/createContentList";
    static MAPPING_UPDATE_CONTENT: string = "/updateContent";
    static MAPPING_DELETE_BY_ID: string = "/deleteById/";
    static MAPPING_GET_BY_ID: string = "/getById/";
    static MAPPING_GET_BY_TOUR_ID: string = "/getByTourId/";
    static MAPPING_GET_BY_ACTIVITY_ID: string = "/getByActivityId/";
    static MAPPING_GET_LIST_BY_TOUR_ID: string = "/getListByTourId/";
    static MAPPING_GET_LIST_BY_ACTIVITY_ID: string = "/getListByActivityId/";
    static MAPPING_GET_LOOKUP_LIST: string = "/getLookupList";
    static MAPPING_GET_LIST: string = "/getList";
    static MAPPING_GET_PAGE: string = "/getPage";

    static COUNTRY_SERVICE_NAME: string = "/country";
    static CITY_SERVICE_NAME: string = "/city";
    static DISTRICT_SERVICE_NAME: string = "/district";
    static COMPANY_SERVICE_NAME: string = "/company";
    static TOUR_SERVICE_NAME: string = "/tour";
    static TOUR_CATEGORY_SERVICE_NAME: string = "/tour-category";
    static TOUR_TYPE_SERVICE_NAME: string = "/tour-type";
    static TOUR_DESCRIPTION_SERVICE_NAME: string = "/tour-description";
    static TOUR_DAY_DESCRIPTION_SERVICE_NAME: string = "/tour-day-description";
    static TOUR_CALENDAR_SERVICE_NAME: string = "/tour-calendar";
    static TOUR_GALLERY_SERVICE_NAME: string = "/tour-gallery";

    static ACTIVITY_SERVICE_NAME: string = "/activity";
    static ACTIVITY_DESCRIPTION_SERVICE_NAME: string = "/activity-description";
    static ACTIVITY_GALLERY_SERVICE_NAME: string = "/activity-gallery";
    static ACTIVITY_COMPANY_SERVICE_NAME: string = "/activity-company";
    static ACTIVITY_COMPANY_REL_SERVICE_NAME: string = "/activity-company-rel";

    static CURRENCY_SERVICE_NAME: string = "/currency";
    static PRICING_TYPE_SERVICE_NAME: string = "/pricing-type";
}
