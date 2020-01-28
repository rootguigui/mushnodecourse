import { Injectable, ViewChild, Injector, OnDestroy } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { LocalStorageService } from "angular-2-local-storage";
import { GlobalConfig } from "../global.config";

declare var $: any;
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable()
export class GlobalService {
  rou: any;
  showDash: boolean;
  countBank: boolean;
  countInvoice: boolean;

  constructor(
    private globalConfig: GlobalConfig,
    private localStorageService: LocalStorageService,
    private injector: Injector,
  ) {}

  checkUrl(param) {
    this.rou = param;
    if (param == "Home") {
      this.showDash = true;
    } else {
      this.showDash = false;
    }
  }

}
