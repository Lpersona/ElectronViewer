import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private fileService: FileService) {}

  ngOnInit() {}

  public selectFile() {
    this.fileService.getFile();
  }
}
