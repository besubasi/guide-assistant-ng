import {TourSearchModel} from "./tour-search-model";

export class TourModel {

    apiPackage: string;
    apiName: string;
    tableName: string;

    createConstant: boolean = true;
    createEntity: boolean = true;
    createModel: boolean = true;
    createSearchModel: boolean = true;
    createMapper: boolean = true;
    createMapperImpl: boolean = true;
    createRepository: boolean = true;
    createService: boolean = true;
    createServiceImpl: boolean = true;
    createRestController: boolean = true;

    propertyList: TourSearchModel[] = [];

}
