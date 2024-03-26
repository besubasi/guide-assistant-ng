import {JsonObject, JsonProperty} from "json2typescript";
import {TourModel} from "./tour-model";
import {TourDescriptionModel} from "../tour-description/model/tour-description-model";
import {TourGalleryModel} from "../tour-gallery/model/tour-gallery-model";
import {TourCalendarModel} from "../tour-calendar/model/tour-calendar-model";
import {TourDayDescriptionModel} from "../tour-day-description/model/tour-day-description-model";

@JsonObject('TourDetailModel')
export class TourDetailModel extends TourModel {

    @JsonProperty('tourDescriptionModel', TourDescriptionModel, true)
    tourDescriptionModel: TourDescriptionModel = null;

    @JsonProperty('tourGalleryModelList', Array<TourGalleryModel>, true)
    tourGalleryModelList: Array<TourGalleryModel> = null;

    @JsonProperty('tourDayDescriptionModelList', Array<TourDayDescriptionModel>, true)
    tourDayDescriptionModelList: Array<TourDayDescriptionModel> = null;

    @JsonProperty('tourCalendarModelList', Array<TourCalendarModel>, true)
    tourCalendarModelList: Array<TourCalendarModel> = null;

}
