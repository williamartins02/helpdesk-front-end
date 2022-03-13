import { HideForRolesDirective } from './directives/hide-for-roles.directive';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    HideForRolesDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HideForRolesDirective
  ]
})
export class SharedModule { }
