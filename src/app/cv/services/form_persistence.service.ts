import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormPersistenceService<T> {
  private storageKeyPrefix = 'form_';
  private subjects = new Map<string, BehaviorSubject<T>>();
  getFormSubject(key: string, defaultValue: T): BehaviorSubject<T> {
    if (!this.subjects.has(key)) {
      const saved = localStorage.getItem(this.storageKeyPrefix + key);
      const initialValue = saved ? JSON.parse(saved) : defaultValue;
      const subject = new BehaviorSubject<T>(initialValue);
      subject.subscribe(value => {
        localStorage.setItem(this.storageKeyPrefix + key, JSON.stringify(value));
      });

      this.subjects.set(key, subject);
    }
    return this.subjects.get(key)!;
  }

  clear(key: string) {
    localStorage.removeItem(this.storageKeyPrefix + key);
    this.subjects.get(key)?.next({} as T);
  }
}