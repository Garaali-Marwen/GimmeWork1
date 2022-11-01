import {Image} from "./Image";

export interface Recruteur{
    id: number,
    nom: string,
    prenom: string,
    mail: string,
    mdp: string,
    role: string,
    adresse: string,
    date_naissance: string,
    image: Image,
    num_tel: number
}