import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {NgFor} from '@angular/common';
import {RouterLink} from "@angular/router";
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  protected readonly dashboards = [
    {
      title: 'Active Users',
      icon: 'group',
      value: '1,245',
      description: 'Total number of currently active users.',
      backgroundColor: 'cornflowerblue'
    },
    {
      title: 'New Registrations',
      icon: 'person_add',
      value: '98',
      description: 'Users registered in the last 24 hours.',
      backgroundColor: 'yellow'
    },
    {
      title: 'Sales Today',
      icon: 'shopping_cart',
      value: 'R$ 12,345',
      description: 'Total volume of sales made today.',
      backgroundColor: 'beige'
    },
    {
      title: 'Tickets Pendentes',
      icon: 'support_agent',
      value: '15',
      description: 'Pending Tickets',
      backgroundColor: 'lightgray'
    }
  ];
}
