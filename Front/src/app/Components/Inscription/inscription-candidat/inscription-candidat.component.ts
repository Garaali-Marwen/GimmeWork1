import { Component, OnInit } from '@angular/core';
import {Candidat} from "../../../Entity/Candidat";
import {CandidatService} from "../../../Services/candidat.service";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {Image} from "../../../Entity/Image";

@Component({
  selector: 'app-inscription-candidat',
  templateUrl: './inscription-candidat.component.html',
  styleUrls: ['./inscription-candidat.component.css']
})
export class InscriptionCandidatComponent implements OnInit {

  candidat: Candidat= {
    nom: "",
    prenom: "",
    mdp: "",
    mail: "",
    adresse: "",
    date_naissance: "",
    fonction: "",
    image: {
      file : new File([],""),
      url : ""
    },
    cv: [],
    lettre_motivation: [],
    competances: [],
    formations: [],
  }

  constructor(private condidatService: CandidatService) { }

  ngOnInit(): void {}


  public addCondidat(addForm: NgForm): void{
    const candidatFormData = this.prepareFormData(this.candidat)
    this.condidatService.addCondidat(candidatFormData).subscribe(
        (response: Candidat) => {
          window.location.reload()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  prepareFormData(candidat: Candidat): FormData{
    const formData = new FormData();
    formData.append(
        'candidat',
        new Blob([JSON.stringify(candidat)], {type: 'application/json'})
    );
    formData.append(
        'imageFile',
        candidat.image.file,
        candidat.image.file.name
    );
    return formData;
  }

  onFileSelected(event: any){
    if (event.target.files){
      const file = event.target.files[0];

      const image: Image = {
        file: file,
        // @ts-ignore
        url: null
      }
      this.candidat.image=image;
    }
  }

}