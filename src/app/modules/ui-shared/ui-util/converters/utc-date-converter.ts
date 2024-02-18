import { JsonConverter, JsonCustomConvert } from 'json2typescript';

@JsonConverter
export class UtcDateConverter implements JsonCustomConvert<Date> {
    serialize(date: Date): Date {
        const asUtc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
        return asUtc;
    }
    deserialize(date: any): Date {
        return new Date(date);
    }
}
