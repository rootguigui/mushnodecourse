import { Component, ReflectiveInjector } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { GlobalService } from '../services/global.service';

@Component({ template: '' })
export class StateResolve {

  constructor(private globalService: GlobalService) {
  }

  resolve(route: ActivatedRouteSnapshot): string {
    let state: string = route.data['state']
    this.globalService.checkUrl(state);
    return state;
  }

}
