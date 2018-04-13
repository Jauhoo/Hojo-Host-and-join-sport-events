import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Event } from '../../_models/index';

import { UserService, EventService } from '../../_services/index';
import { EventViewComponent } from '../../event/event-view';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {

  events: Event[] = [];
  modalRef: BsModalRef;

  constructor(
    private userService: UserService,
    protected eventService: EventService,
    private modalService: BsModalService) {
      EventService.refreshEventList.subscribe(res => {
        this.loadAllEvents();
      });
    }

  ngOnInit() {
    this.loadAllEvents();
  }

  loadAllEvents() {
    this.eventService.getAllEvents().subscribe(events => { this.events = events });
  }


  private openEventView(id: string){
    sessionStorage.setItem("eventId", id);
    this.modalRef = this.modalService.show(EventViewComponent, {class: 'modal-lg'});

  }

}
