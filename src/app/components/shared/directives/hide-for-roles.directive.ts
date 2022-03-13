import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHideForRoles]'
})
export class HideForRolesDirective {

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef:      TemplateRef<any>,
  ) { }

  @Input() set (hideForRoles: Array<string>){
    const hideFor = hideForRoles || [];
      if(hideFor.length > 0){
        this.roleChecker(hideFor);
      }
      this.viewContainerRef.createEmbeddedView(this.templateRef)
  }

  roleChecker(hideFor:Array<string>){
    //Current user roles
    const userRoles: Array<string> = ['Cliente'];
      if(userRoles.length === 0){
         this.viewContainerRef.clear();
      }
      const idx = userRoles.findIndex(role => hideFor.indexOf(role) !== -1);
      return idx < 0 ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear;
  }
}

