import { RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutes } from './authentication.routing';
import { AuthenticationService } from './authentication.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationGuard } from './authentication-guard.service';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    RouterModule.forChild(AuthenticationRoutes),
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
  ],
  providers: [AuthenticationGuard, AuthenticationService],
})
export class AuthenticationModule {}
