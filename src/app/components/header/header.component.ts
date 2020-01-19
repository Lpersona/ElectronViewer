import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FileService } from 'src/app/service/file.service';
import { MissionService } from 'src/app/service/mission.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private fileService: FileService,
    private missionService: MissionService
  ) {}

  ngOnInit() {}

  public selectFile() {
    this.fileService.getFile();
  }

  public useUrl() {
    this.fileService.loadUrl();
  }

  public toggleSideState() {
    this.missionService.sideMission(true);
  }
}
