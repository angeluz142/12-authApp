import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent  {

  get usuario(){
    return this.authSrv.usuario;
  }

  constructor(
    private route:Router,
    private authSrv:AuthService
    ) { }

  logOut(){
    this.authSrv.logOut();
    this.route.navigateByUrl('/auth');
  }
}
