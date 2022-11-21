import { Component, OnInit } from '@angular/core';
import {OffresPublic} from "../../../Entity/OffresPublic";
import {OffrePublicService} from "../../../Services/offre-public.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-afficher-offres-public',
  templateUrl: './afficher-offres-public.component.html',
  styleUrls: ['./afficher-offres-public.component.css']
})
export class AfficherOffresPublicComponent implements OnInit {

  centered = false;
  unbounded = false;
  checked = false;
  disabled = false;
  public OffresPublic: OffresPublic[] = [];
  constructor(private offrePublicService: OffrePublicService,
              private router: Router) { }


  p: number = 1;


  ngOnInit(): void {
    this.getOffresPublic();
  }

  public getOffresPublic(): void{
    this.offrePublicService.getOffresPublic()
        .subscribe(
            (responce:OffresPublic[]) => {
              for (let o of responce){
                if (o.source == 'keejob')
                  this.OffresPublic.push(o);
              }

            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            });
  }

  public visiter(url: string){
    window.open(url);
  }

}
