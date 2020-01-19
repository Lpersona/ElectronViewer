import { Component } from '@angular/core';
import { MissionService } from './service/mission.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private title = 'easy-viewer';
  private subscription: Subscription;
  public sidebarState: boolean;

  constructor(private missionService: MissionService) {
    this.subscription = this.missionService.missionSide$.subscribe(state => {
      this.sidebarState = !this.sidebarState;
    });
  }
}
