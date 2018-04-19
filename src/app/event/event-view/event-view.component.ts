import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { EventService, UserService } from '../../_services/index';
import { Router } from '@angular/router';
import { Event, SportType, PlayType, SkillLevel, User } from '../../_models';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {
  eventID: string;
  event: Event;
  host: User;
  currentUser: User;
  id: any = {};
  geocoder = new google.maps.Geocoder;
  address: string;
  joining: boolean;

  constructor(
    private router: Router,
    protected eventService: EventService,
    private userService: UserService,
    private bsModalRef: BsModalRef) {
    var currentU = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = currentU.Account;
    this.id.accountId = this.currentUser.accountId;
  }

  ngOnInit() {
    this.loadEvent();
  }
 

  private loadEvent() {
    this.eventID = sessionStorage.getItem("eventId");
    console.log(this.eventID);
    this.eventService.getEventById(this.eventID).subscribe(event => {
      this.event = event; 
      this.host = event[0].host;
      this.joining = false;
    });
  }

  deleteEvent(id:string) {
    this.eventService.deleteEvent(id).subscribe(() => { EventService.refreshEventList.next(true)});
    this.close();
  }

  joinEvent() {
    this.joining = true;
    this.eventService.joinEvent(this.eventID, this.id).subscribe();
    this.loadEvent();
  }

  leaveEvent() {
    this.eventService.leaveEvent(this.eventID, this.id).subscribe();
    this.loadEvent();
  }

  close() {
    EventService.refreshEventList.next(true);
    this.bsModalRef.hide();
  }

  isHost() {
    if (this.currentUser.accountId == this.host.accountId) {
      return true;
    }
    else {
      return false;
    }
  }

  hasJoined() {
    var isJoined = false;
    for(var i = 0; i < this.event[0].players.length; i++) {
      if(this.event[0].players[i].accountId === this.currentUser.accountId) {
        isJoined = true;
      }
    }
    return isJoined;
  }

  editEvent() {
    this.close();
    this.router.navigate(['/edit-event']);
  }

  reverseGeocode(lat: number, lng: number, map){
    var latlng = {lat: +lat, lng: +lng };
   
    this.geocoder.geocode({'location': latlng}, function(results, status) {
      if (status.toString() === 'OK') {
        if (results[0]) {
          // Address can't get out of scope without geocode function
          this.address = results[0].formatted_address.toString();
          localStorage.setItem('address', this.address);
        } else {
          window.alert('No results found');
        } 
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
    this.address = localStorage.getItem('address');
  }
}
