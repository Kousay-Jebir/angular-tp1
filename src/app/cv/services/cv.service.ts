import { Injectable, signal, inject } from '@angular/core';
import { Cv } from '../model/cv';
import { API } from '../../../config/api.config';

@Injectable({ providedIn: 'root' })
export class CvService {
  selectedCv = signal<Cv | null>(null);

  private fake: Cv[] = [
    new Cv(1, 'aymen', 'sellaouti', 'teacher', 'as.jpg', '1234', 40),
    new Cv(2, 'skander', 'sellaouti', 'enfant', '       ', '1234', 4),
  ];

  getFakeCvs(): Cv[] {
    return this.fake;
  }
  selectCv(cv: Cv | null) {
    this.selectedCv.set(cv);
  }
  private async request<T>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...init,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(text || `HTTP ${res.status}`);
    }
    return (await res.json()) as T;
  }

  async getCvs(): Promise<Cv[]> {
    return this.request<Cv[]>(API.cv);
  }

  async getCvById(id: number): Promise<Cv> {
    return this.request<Cv>(API.cv + id);
  }

  async addCv(cv: Cv): Promise<Cv> {
    return this.request<Cv>(API.cv, {
      method: 'POST',
      body: JSON.stringify(cv),
    });
  }

  async deleteCvById(id: number): Promise<void> {
    await this.request(API.cv + id, { method: 'DELETE' });
  }

  async selectByName(name: string): Promise<Cv[]> {
    const filter = encodeURIComponent(
      JSON.stringify({ where: { name: { like: `%${name}%` } } })
    );
    return this.request<Cv[]>(`${API.cv}?filter=${filter}`);
  }

  async selectByProperty(property: string, value: string): Promise<Cv[]> {
    const filter = encodeURIComponent(
      JSON.stringify({ where: { [property]: value } })
    );
    return this.request<Cv[]>(`${API.cv}?filter=${filter}`);
  }

  // Optional: find in local fake cache
  findCvByIdLocal(id: number): Cv | null {
    return this.fake.find((cv) => cv.id === id) ?? null;
  }

  // Optional: delete in local fake cache
  deleteCvLocal(cv: Cv): boolean {
    const i = this.fake.indexOf(cv);
    if (i > -1) {
      this.fake.splice(i, 1);
      return true;
    }
    return false;
  }
}
