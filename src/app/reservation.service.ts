import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private _httpClient: HttpClient){ }

  // private baseUrl:string = 'http://localhost:8080';
  private baseUrl:string = 'https://springboot-webflux.herokuapp.com';
  private reservationUrl:string = this.baseUrl + '/room/v1/reservation/';
  
   httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getAllReservations(): Observable<Reservation[]>{
     return this._httpClient.get<Reservation[]>(this.reservationUrl);
  }

  createReservation(body: ReservationRequest): Observable<Reservation> {
      return this._httpClient.post<Reservation>(this.reservationUrl, body, this.httpOptions);
  }

  deleteReservation(id): Observable<Reservation>{
    console.log(id);
      return this._httpClient.delete<any>(this.reservationUrl + `${id}`, this.httpOptions);
  }

}

export class ReservationRequest{
  guestName: string;
  roomNumber: number;
  checkIn: string;
  checkOut: string;
  price: number;

  constructor(guestName: string, roomNumber: number, checkIn: string, checkOut: string, price: number){
     this.guestName = guestName;
     this.roomNumber = roomNumber;
     this.checkIn = checkIn;
     this.checkOut = checkOut;
     this.price = price;
  }
}

export interface Reservation{
  id: string;
  guestName: string;
  roomNumber: number;
  checkIn: Date;
  checkOut: Date;
  price: number;
}
