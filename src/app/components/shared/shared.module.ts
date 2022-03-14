import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowForRolesDirective } from './directives/show-for-roles.directive';



@NgModule({
  declarations: [
    ShowForRolesDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShowForRolesDirective
  ]
})
export class SharedModule { }
