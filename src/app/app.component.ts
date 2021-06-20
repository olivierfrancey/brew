import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Brew', url: '/brew', icon: 'water' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
  ];
  public labels = [];
  constructor() {}
}
