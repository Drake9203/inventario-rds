import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export default function httpHandlePrivateError(error: HttpErrorResponse) {
	console.error(error)
	let errorMessage = '';
	if (error.error.error && error.error.error.publicMessage) {
		errorMessage = ` Error: ${error.error.error.publicMessage}`;
	}else if (error.error.error && error.error.error.message){
		errorMessage = ` Error: ${error.error.error.message}`;
	}
	return throwError(errorMessage);
}