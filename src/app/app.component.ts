import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Shared/Layout/Additions/navbar/navbar.component";
import { FooterComponent } from "./Shared/Layout/Additions/footer/footer.component";
import { DarkMoodService } from './Shared/Services/dark-mood.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  darkMoodServices: DarkMoodService = inject(DarkMoodService);
  title = 'taskProject';
}
