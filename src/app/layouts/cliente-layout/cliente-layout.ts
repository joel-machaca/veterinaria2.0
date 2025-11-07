import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/authService';

@Component({
  selector: 'app-cliente-layout',
  imports: [RouterModule],
  templateUrl: './cliente-layout.html',
  styleUrl: './cliente-layout.css',
})
export class ClienteLayout {
  constructor(private auth:AuthService,private r:Router){}

  cerrarSesion(){
    this.auth.logout()
    this.r.navigate(['login'])
  }
}
