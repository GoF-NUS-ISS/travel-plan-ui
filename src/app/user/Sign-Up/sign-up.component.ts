import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
// import { CountryCodeSelectComponent } from "../country-code-select/country-code-select.component";
// import { CountryCode } from "../country-code-select/country-codes";
import { AuthService } from "../auth.service";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  hide = true;
  signupForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.min(10)]),
    name: new FormControl("", [Validators.min(2)]),
  });

  // countryCode = "+1";

  get emailInput() {
    return this.signupForm.get("email");
  }
  get passwordInput() {
    return this.signupForm.get("password");
  }
  get nameInput() {
    return this.signupForm.get("name");
  }
  get phoneInput() {
    return this.signupForm.get("phone");
  }

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {}

  // selectCountryCode() {
  //   this._bottomSheet
  //     .open(CountryCodeSelectComponent)
  //     .afterDismissed()
  //     .subscribe((data: CountryCode) => {
  //       // this.countryCode = data ? data.dial_code : this.countryCode;
  //     });
  // }

  getNameInputError() {
    if (this.nameInput.hasError("name")) {
      return "Please enter a valid email address.";
    }
    if (this.nameInput.hasError("required")) {
      return "An Email is required.";
    }
  }

  getPasswordInputError() {
    if (this.passwordInput.hasError("required")) {
      return "A password is required.";
    }
  }

  shouldEnableSubmit() {
    return (
      !this.emailInput.valid ||
      !this.passwordInput.valid ||
      !this.nameInput.valid ||
      !this.phoneInput.valid
    );
  }

  signUp() {
    this._authService
      .signUp({
        name: this.nameInput.value,
        password: this.passwordInput.value,
        email: this.emailInput.value,
        // phone: this.countryCode + this.phoneInput.value
        phone: this.phoneInput.value
      })
      .then(data => {
        environment.confirm.name = this.nameInput.value;
        environment.confirm.password = this.passwordInput.value;
        this._router.navigate(["user/confirm"]);
      })
      .catch(error => console.log(error));
  }
}
