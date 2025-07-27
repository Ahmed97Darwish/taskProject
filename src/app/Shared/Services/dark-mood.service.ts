import { effect, Injectable, OnInit, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DarkMoodService {


  constructor(private _LocalStorageService: LocalStorageService) { 
    if (typeof localStorage !== "undefined") {
      effect (() => {
        localStorage.setItem("darkMoodSignal", JSON.stringify(this.darkMoodSignal()));
      }); 
    }
  }

  // darkMoodSignal = signal<string>("null");
  darkMoodSignal = signal<string>(
    JSON.parse(this._LocalStorageService.getItem("darkMoodSignal") ?? "null")
    // JSON.parse(localStorage.getItem("darkMoodSignal") ?? "null")
  );

  updateDarkMood () {
    this.darkMoodSignal.update(
      (value) => (value === "dark"?  "null": "dark")
    );
  }
}