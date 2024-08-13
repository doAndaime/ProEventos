import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any;

  // Passado o parametro HttpClient para ser usado internamente, mas para funcionar é preciso ir ao 'app.module.ts'
  // e nos imports do @NgModule e adicionar 'HttpClientModule'
  constructor(private http: HttpClient) { }

  //Método chamado antes do HTML ser interpretado
  ngOnInit(): void {
    this.getEventos();
  }

  //Este método está a usar o httpClient para ir buscar a informação à API ProEventos, mas para funcionar a página da API tem de estar a correr
  public getEventos(): void{
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => this.eventos = response,
      error => console.log(error)
    );
  }
}
