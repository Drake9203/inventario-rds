import { Injectable, inject } from '@angular/core';
import {
    CanActivateFn,
    Router
} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class GoogleGuard {
    constructor(private router: Router) { }
    canActivate() {
        const googleUser = localStorage.getItem('googleUser');
        let autoriced: boolean = true;
        if (!googleUser) {
            autoriced = false;
        }
        if (!autoriced) {
            localStorage.removeItem('googleUser');
            this.router.navigate(['/login']);
        }
        this.router.navigate(['/']);
        return autoriced;
    }
}

export const validateGoogle: CanActivateFn = (route, state) => {
    return inject(GoogleGuard).canActivate()
}