import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public filteredEvents: any = [];
  widthImg: number = 150;
  marginImg: number = 2;
  showImg: boolean = true;
  private _listFilter: string = '';

  public get listFilter() : string{
    return this._listFilter;
  }

  public set listFilter(value: string){
    this._listFilter = value;
    this.filteredEvents = this.listFilter ?
      this.filterEvents(this.listFilter) : this.eventos;
  }

  filterEvents(filterBy: string) : any{
    filterBy = filterBy.toLocaleLowerCase();
    return this.eventos.filter(
      (evento : any) => evento.tema
                        .toLocaleLowerCase()
                         .indexOf(filterBy) !== -1 ||
                        evento.local
                        .toLocaleLowerCase()
                        .indexOf(filterBy) !== -1
    );
  }

  // Passado o parametro HttpClient para ser usado internamente, mas para funcionar é preciso ir ao 'app.module.ts'
  // e nos imports do @NgModule e adicionar 'HttpClientModule'
  constructor(private http: HttpClient) { }

  //Método chamado antes do HTML ser interpretado
  ngOnInit(): void {
    this.getEventos();
  }

  // Method to show/hide the images
  changeImg(){
    this.showImg = !this.showImg;
  }

  //Este método está a usar o httpClient para ir buscar a informação à API ProEventos, mas para funcionar a página da API tem de estar a correr "dotnet watch run"
  public getEventos(): void{
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => {
        this.eventos = response;
        this.filteredEvents = this.eventos;
      },
      error => console.log(error)
    );
  }
}
