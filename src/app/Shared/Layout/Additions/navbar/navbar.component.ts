import { DarkMoodService } from './../../../Services/dark-mood.service';
import { Component, inject, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../Services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  darkMoodService: DarkMoodService = inject(DarkMoodService);

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    if (typeof localStorage !== "undefined" ) {
      localStorage.setItem("currentPage", "/Products");
    }
  
  }

  toggleDarkMood() {
    this.darkMoodService.updateDarkMood();
  }

}
