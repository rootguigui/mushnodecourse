import { Injectable } from "@angular/core";
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class GlobalConfig {
  local: string;
  user: any;

  innerWidth: any;

  constructor() { }

  baseUrl: string = 'http://localhost:3000/';
  apiUrl: string = this.baseUrl + 'api/'
}
