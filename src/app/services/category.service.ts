import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
const baseUrl = 'http://localhost:8090/api/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(baseUrl);
  }
  getById(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  save(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
