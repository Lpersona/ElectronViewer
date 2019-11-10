import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public name: string;
  public serviceUrl: string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar
  ) {
    this.name = '';
    this.serviceUrl = '';
  }

  ngOnInit() {}

  closeDialog() {
    this.name = this.name || '倾斜模型';
    const returnData = {
      name: this.name,
      serviceUrl: this.serviceUrl
    };

    if (this.data.url && !this.serviceUrl) {
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 200,
        data: {
          message: '请输入准确的服务地址'
        }
      });

      return;
    }
    this.dialogRef.close(returnData);
  }
}
