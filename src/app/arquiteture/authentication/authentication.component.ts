import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from "../security/security.service";
import {User} from "../security/User";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  formGroup!: FormGroup;
  public submitted!: boolean;

  /**
   * Class Constructor.
   *
   * @param securityService
   * @param authenticationService
   * @param router
   * @param formBuilder
   */
  constructor(
    private securityService: SecurityService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,) {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      login: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      senha: [null, Validators.required],
    });
  }

  /**
   * Inicializa as dependências do componente.
   */
  ngOnInit(): void {
  }

  /**
   * Autentica o Usuário na aplicação conforme os parâmetros informados.
   *
   */
  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.authenticationService.login(this.formGroup.value).subscribe(data => {
        const user: User = {
          id: data.id,
          nome: data.nome,
          login: data.login,
          expiresIn: data.expiresIn,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          roles: data.roles
        };

        this.securityService.init(user);
        this.router.navigate(['/']);
      }, error => {
        console.log('erro', error);
        alert(error);
        // }
      });
    }
  }
}
