import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { ModalComponent } from './modal/index';
import { EventViewComponent } from './event/event-view/index';
import { CreateEventComponent } from './event/index'
import { MapComponent } from './map/index';
import { MainpageComponent } from './mainpage/index';

 
const appRoutes: Routes = [
    //{ path: '' ,component: ModalComponent },
<<<<<<< HEAD
    { path: '' ,component: HomeComponent, canActivate: [AuthGuard] },
=======
 { path: '', component: MainpageComponent },
    { path: 'home' ,component: HomeComponent, canActivate: [AuthGuard] },
>>>>>>> o-modal
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'event-view', component: EventViewComponent },
    { path: 'createEvent', component: CreateEventComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);