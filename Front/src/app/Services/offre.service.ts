import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Offres} from "../Entity/Offres";
import {Recruteur} from "../Entity/Recruteur";

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addOffre(offre: Offres): Observable<Offres>{
    return this.http.post<Offres>(`${this.apiServerUrl}/offres/add`, offre);
  }

  public addOffreToRecruteur(recruteurId: number, offreId: number): Observable<void>{
    return this.http.get<void>(`${this.apiServerUrl}/offres/${recruteurId}/${offreId}`);
  }

  public deleteOffre(offreId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/offres/delete/${offreId}`);
  }

  public getOffres(): Observable<Offres[]>{
    return this.http.get<Offres[]>(`${this.apiServerUrl}/offres/all`);
  }

  public findOffreById(id: number): Observable<Offres>{
    return this.http.get<Offres>(`${this.apiServerUrl}/offres/${id}`);
  }

  public updateOffre(offres: Offres): Observable<Offres>{
    return this.http.put<Offres>(`${this.apiServerUrl}/offres/update`, offres);
  }
}
