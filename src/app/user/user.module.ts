import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { userRoutes } from './user.routes'
import { RegisterComponent } from './register.component'
import { LoginComponent } from './login.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [

  ]
})
export class UserModule { }