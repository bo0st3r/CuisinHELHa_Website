import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RecipeDTO, RecipeList} from "../DTOs/recipe-dto";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private static URL:string = "/api/recipes";

  constructor(public http:HttpClient) { }

  query() : Observable<RecipeList>{
    return this.http.get<RecipeList>(RecipeService.URL);
  }

  post(ingredient: RecipeDTO): Observable<RecipeDTO>{
    return this.http.post<RecipeDTO>(RecipeService.URL, ingredient);
  }

  put(ingredient: RecipeDTO): Observable<any>{
    return this.http.put(RecipeService.URL, ingredient);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${RecipeService.URL}/${id}`);
  }
}