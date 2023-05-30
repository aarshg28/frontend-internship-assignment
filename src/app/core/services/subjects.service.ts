import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BookResponse } from 'src/app/core/models/book-response.model';
import {  HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private apiService: ApiService) {}

  getAllBooks(subjectName: string): Observable<BookResponse> {
    const limit1 = 10;
    return this.apiService.get(`/subjects/${subjectName.toLowerCase().split(' ').join('_')}.json`);
  }

  searchAPI(searchString : string): Observable<any> {
    const limit1 = 10;
    return this.apiService.get(`/search.json?q=`+ searchString);
  }

}
