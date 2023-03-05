import { Sportista } from "./sportista";

export class Takmicenje {
    disciplina: string;
    tip: string;
    format: string;
    pocetak: Date;
    kraj: Date;
    lokacija: string;
    brojTakmicara: string;
    brojKrugova: number;
    formatRezultata: string;
    rangiranjeRezultata: string;
    delegat: string;
    sportisti: Sportista[];
    status: string;
}