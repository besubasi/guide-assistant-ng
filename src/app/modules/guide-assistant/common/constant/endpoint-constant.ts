export class EndpointConstant {

    static BASE_ENDPOINT: string = 'http://localhost:8080/guide';

    static MAPPING_SAVE: string = "/save";
    static MAPPING_CREATE: string = "/create";
    static MAPPING_CREATE_ALL: string = "/createAll";
    static MAPPING_UPDATE: string = "/update";
    static MAPPING_UPDATE_CONTENT: string = "/updateContent";
    static MAPPING_DELETE_BY_ID: string = "/deleteById/";
    static MAPPING_GET_BY_ID: string = "/getById/";
    static MAPPING_GET_BY_TOUR_ID: string = "/getByTourId/";
    static MAPPING_GET_LIST_BY_TOUR_ID: string = "/getListByTourId/";
    static MAPPING_GET_LIST: string = "/getList";
    static MAPPING_GET_PAGE: string = "/getPage";

    static COMPANY_SERVICE_NAME: string = "/company";
    static TOUR_SERVICE_NAME: string = "/tour";
    static TOUR_CATEGORY_SERVICE_NAME: string = "/tour-category";
    static TOUR_TYPE_SERVICE_NAME: string = "/tour-type";
    static TOUR_DESCRIPTION_SERVICE_NAME: string = "/tour-description";
    static TOUR_DAY_DESCRIPTION_SERVICE_NAME: string = "/tour-day-description";
    static TOUR_CALENDAR_SERVICE_NAME: string = "/tour-calendar";
    static TOUR_GALLERY_SERVICE_NAME: string = "/tour-gallery";

}
