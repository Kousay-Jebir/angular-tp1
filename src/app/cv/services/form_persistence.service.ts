import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormPersistenceService<T> {
  private storageKeyPrefix = 'form_';

  getFormData(key: string, defaultValue: T): T {
    const saved = localStorage.getItem(this.storageKeyPrefix + key);
    return saved ? JSON.parse(saved) : defaultValue;
  }

  saveFormData(key: string, formData: T): void {
    localStorage.setItem(this.storageKeyPrefix + key, JSON.stringify(formData));
  }

  clear(key: string): void {
    localStorage.removeItem(this.storageKeyPrefix + key);
  }
}