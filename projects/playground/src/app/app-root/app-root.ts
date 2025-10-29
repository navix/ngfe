import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.html',
  styleUrls: ['./app-root.scss'],
  imports: [RouterOutlet, RouterLink],
})
export default class AppRoot {}
