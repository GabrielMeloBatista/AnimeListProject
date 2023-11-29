import { Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SecurityService } from "../security/security.service";
import { User } from "../security/User";
import { CredencialRegisterDto } from "../../api/models/credencial-register-dto";
import { data } from "autoprefixer";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.scss"]
})
export class AuthenticationComponent implements OnInit {
  formGroupLogin!: FormGroup;
  formGroupRegister!: FormGroup;
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
    private formBuilder: FormBuilder) {
    this.createForm();
    this.showRegister = false;
  }

  createForm() {
    this.formGroupLogin = this.formBuilder.group({
      login: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      senha: [null, Validators.required]
    });
    this.formGroupRegister = this.formBuilder.group({
      nome: [null, [Validators.required]],
      login: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(3)]],
      senha: [null, Validators.required],
      statusAtivo: true
    });
  }

  public handleErrorLogin = (controlName: string, errorName: string) => {
    return this.formGroupLogin.controls[controlName].hasError(errorName);
  };
  showRegister: boolean;
  public handleErrorRegister = (controlName: string, errorName: string) => {
    return this.formGroupRegister.controls[controlName].hasError(errorName);
  };

  /**
   * Inicializa as dependências do componente.
   */
  ngOnInit(): void {
  }

  /**
   * Autentica o Usuário na aplicação conforme os parâmetros informados.
   *
   */
  public onSubmitLogin(): void {
    if (this.formGroupLogin.valid) {
      this.authenticationService.login(this.formGroupLogin.value).subscribe(data => {
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
        this.router.navigate(["/home"]);
      }, error => {
        console.log("erro", error);
        postMessage("erro ao tentar logar");
        // }
      });
    }
  }

  public onSubmitRegister(): void {
    if (this.formGroupRegister.valid) {
      this.authenticationService.register(this.formGroupRegister.value).subscribe(data => {
          const user: CredencialRegisterDto = {
            email: data.email,
            login: data.login,
            nome: data.nome,
            statusAtivo: data.statusAtivo,
            senha: data.senha,
          };
        }
      );
    }
  }

  public showRegisterForm() {
    this.showRegister = !this.showRegister;
  }
}
