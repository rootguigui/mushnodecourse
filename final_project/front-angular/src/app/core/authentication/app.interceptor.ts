// import { Injectable, Injector } from "@angular/core";
// import { Observable } from "rxjs/Observable";
// import { Router } from "@angular/router";
// import { AuthenticationToken } from "./authentication.model";
// import { AuthenticationService } from "./authentication.service";
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpSentEvent,
//   HttpHeaderResponse,
//   HttpProgressEvent,
//   HttpResponse,
//   HttpUserEvent,
//   HttpEvent,
//   HttpErrorResponse
// } from "@angular/common/http";
// import { HttpHeaders } from "@angular/common/http";
// import { SpinnerService } from "../services/spinner.service";



// @Injectable()
// export class AppInterceptor implements HttpInterceptor {

//   spinnerCount: number = 0;

//   constructor(
//     private router: Router,
//     private injector: Injector,
//     private spinner: SpinnerService
//   ) { }

//   showSpinner(): void {
//     this.spinnerCount++;

//     if (this.spinnerCount == 1)
//       this.spinner.show();
//   }

//   hideSpinner(): void {
//     this.spinnerCount--;

//     if (this.spinnerCount == 0)
//       this.spinner.hide();
//   }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     this.showSpinner();

//     if (req.url.indexOf("token") > -1) {
//       return next.handle(req).do(
//         (event) => {
//           this.hideSpinner();
//         },
//         (err) => {
//           this.hideSpinner();
//           if (err instanceof HttpErrorResponse) {
//             if (err.status === 401) {
//               this.router.navigate(["login"]);
//             }
//             if (err.status === 404) {
//               this.router.navigate(["404"]);
//             }
//           }
//         }
//       );
//     }

//     let auth = this.injector.get(AuthenticationService);
//     let authHeader = auth.getAuthorizationHeader();
//     let contentTypeHeader = "application/json";

//     let clonedReq = req.clone({
//       setHeaders: {
//         "Authorization": authHeader,
//         "Content-Type": contentTypeHeader
//       }
//     });

//     if (req.url.includes('http://viacep.com.br/ws/')) {
//       clonedReq = clonedReq.clone({ headers: req.headers.delete('Authorization') })
//     }

//     return next.handle(clonedReq).do(
//       (event) => {
//         if (event instanceof HttpResponse)
//           this.hideSpinner();
//       },
//       (err) => {
//         this.hideSpinner();
//         if (err instanceof HttpErrorResponse) {
//           if (err.status === 401) {
//             this.router.navigate(["login"]);
//           }
//           if (err.status === 404) {
//             this.router.navigate(["404"]);
//           }
//         }
//       }
//     );

//   }

// }
