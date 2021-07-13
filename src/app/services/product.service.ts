import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
const baseUrl = 'http://localhost:8090/api/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl);
  }
  getAllByCat(id: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}/category/${id}`);
  }
  getById(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  save(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  edit(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/edit`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
