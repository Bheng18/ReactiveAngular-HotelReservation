import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReservationService, ReservationRequest, Reservation } from './reservation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reservation-app';

 constructor(private _reservationService: ReservationService){}

  rooms: Room[];
  roomSearchForm: FormGroup;
  currentCheckInVal: string;
  currentCheckOutVal: string;
  currentPrice: number;
  currentRoomNumber: number;
  currentReservations: Reservation[];

  ngOnInit(){
     this.roomSearchForm = new FormGroup({
        checkin: new FormControl(''),
        checkout: new FormControl(''),
        roomNumber: new FormControl('')
     });

     this.roomSearchForm.valueChanges.subscribe(form => {
        this.currentCheckInVal = form.checkin;
        this.currentCheckOutVal = form.checkout;

        if(form.roomNumber){
           let roomValues: string[] = form.roomNumber.split('|');
           this.currentRoomNumber = Number(roomValues[0]);
           this.currentPrice = Number(roomValues[1]);
        }

     });

    this.rooms = [
      new Room("127", "127", "150"),
      new Room("128", "128", "180"),
      new Room("129", "129", "200")
    ];

    this.getCurrentReservations();
  }

  getCurrentReservations(){
    this._reservationService.getAllReservations().subscribe(getResult => {
      console.log(getResult);
      this.currentReservations = getResult;
    });
  }

  createReservation(){
    this._reservationService.createReservation(
      new ReservationRequest(this.currentRoomNumber, this.currentCheckInVal, this.currentCheckOutVal, this.currentPrice)
    ).subscribe(postResult => {
       console.log(postResult);
       this.getCurrentReservations();
      });
  }

  deleteReservation(reservation){
    console.log(reservation);
    this._reservationService.deleteReservation(reservation.id).subscribe(getResult => {
       console.log(getResult);
       this.getCurrentReservations();
    });
  }

}

export class Room{
  id: string;
  roomNumber: string;
  price: string;

  constructor(id: string, roomNumber: string, price: string){
    this.id = id;
    this.roomNumber = roomNumber;
    this.price = price;
  }

}
