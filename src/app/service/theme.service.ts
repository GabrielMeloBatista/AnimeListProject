import { Injectable } from '@angular/core';

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
  System = 'system'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private storageKey = 'theme';

  getStoredTheme(): ThemeMode {
    return localStorage.getItem(this.storageKey) as ThemeMode || ThemeMode.System;
  }

  storeTheme(theme: ThemeMode): void {
    localStorage.setItem(this.storageKey, theme);
  }
}
