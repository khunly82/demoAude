import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class Tab2Page {

  result : string|undefined = undefined;
  scanActive: boolean = false;

  constructor() {}

  async ionViewDidEnter() {
    const result = await BarcodeScanner.checkPermission({ force: true });
    if(!result) {
      // afficher message
    }
  }

  async scan() {
    await BarcodeScanner.prepare();
    this.scanActive = true;
    document.body.style.background = 'transparent'
    const scanResult = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.EAN_13] });
    this.stopScan();

    this.result = scanResult.content;
  }

  stopScan() {
    this.scanActive = false;
    document.body.style.background = 'unset'
  }

}
