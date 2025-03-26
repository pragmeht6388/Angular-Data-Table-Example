import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface CacheItem {
  value: Array<{data: any, expiry: number}>;
}

interface CarModel {
  modelId: number;
  modelName: string;
}

interface CarMake {
  makeId: number;
  makeName: string;
  country: string;
}

interface CarData {
  makes: CarMake[];
  models: Record<number, CarModel[]>; // All models in one object
}

@Injectable({
  providedIn: 'root'
})
export class CarDataService {
  private cache = new Map<string, CacheItem>();
  private defaultExpiration = 120000; // 1 hour
  private readonly MODELS_CACHE_KEY = 'all-models'; // Single static key

  private readonly carData: CarData = {
    makes: [
      { makeId: 1, makeName: "Toyota", country: "Japan" },
      { makeId: 2, makeName: "Ford", country: "USA" },
      { makeId: 3, makeName: "BMW", country: "Germany" }
    ],
    models: {
      1: [
        { modelId: 101, modelName: "Corolla" },
        { modelId: 102, modelName: "Camry" },
        { modelId: 103, modelName: "RAV4" }
      ],
      2: [
        { modelId: 201, modelName: "F-150" },
        { modelId: 202, modelName: "Mustang" },
        { modelId: 203, modelName: "Explorer" }
      ],
      3: [
        { modelId: 301, modelName: "3 Series" },
        { modelId: 302, modelName: "5 Series" },
        { modelId: 303, modelName: "X5" }
      ]
    }
  };

  // Cache methods remain unchanged
  private setCache(key: string, data: any): void {
    const expiry = Date.now() + this.defaultExpiration;
    this.cache.set(key, { value: [{ data, expiry }] });
  }

  private getCache(key: string): any {
    const cacheItem = this.cache.get(key);
    if (!cacheItem) return undefined;

    const now = Date.now();
    const cachedEntry = cacheItem.value[0];
    if (now > cachedEntry.expiry) {
      this.cache.delete(key);
      return undefined;
    }
    return cachedEntry.data;
  }

  getMakes(): Observable<CarMake[]> {
    const cachedMakes = this.getCache('makes');
    if (cachedMakes) return of(cachedMakes);

    const makes = this.carData.makes;
    this.setCache('makes', makes);
    return of(makes);
  }

  getModels(makeId: number): Observable<CarModel[]> {
    // Try to get all models from cache first
    const cachedModels = this.getCache(this.MODELS_CACHE_KEY);
    
    if (cachedModels) {
      // If cache exists, return the specific make's models from cache
      const models = cachedModels[makeId] || [];
      return of(models);
    } else {
      // If no cache exists, get from hardcoded data and cache it
      const allModels = this.carData.models;
      this.setCache(this.MODELS_CACHE_KEY, allModels);
      
      // Return the specific make's models
      const models = allModels[makeId] || [];
      return of(models);
    }
  }
  // New method to delete specific make's models
  deleteModels(makeId: number): void {
    const allModels = this.getCache(this.MODELS_CACHE_KEY);
    if (allModels) {
      delete allModels[makeId];
      this.setCache(this.MODELS_CACHE_KEY, allModels);
    }
  }
}