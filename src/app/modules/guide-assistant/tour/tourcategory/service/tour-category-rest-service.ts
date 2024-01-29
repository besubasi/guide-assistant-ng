import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TourCategoryModel} from "../model/tour-category-model";

@Injectable({
    providedIn: 'root'
})
export class TourCategoryRestService {

    private baseUrl = 'http://localhost:8090';


    constructor(private http: HttpClient) {
    }

    generate(model: TourCategoryModel) {
        return this.http.post(`${this.baseUrl}/apigen/api/generate`, model);
    }

    sayMyName(): Observable<string> {
        return this.http.get<string>(`${this.baseUrl}/apigen/api/sayMyName`);
    }


}
