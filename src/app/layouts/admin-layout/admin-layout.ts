import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/authService';


@Component({
  selector: 'app-admin-layout',
  imports: [RouterModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',

})
export class AdminLayout {
  constructor(private auth:AuthService,private r:Router){}

  cerrarSesion(){
    this.auth.logout()
    this.r.navigate(['login'])
  }
}
