import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActionSheetController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class Tab1Page {

  articleName: string|null = null;
  articles: { name: string, checked: boolean }[] = []

  constructor(
    private readonly actionSheetCtrl: ActionSheetController
  ) {}

  add() {
    if(!this.articleName)
      return;
    this.articles = [ ...this.articles, { name: this.articleName, checked: false }];
    this.articleName = null;
  }

  async openActionSheet(article: {name: string, checked: boolean}) {
    const as = await this.actionSheetCtrl.create({
      header: 'actions',
      buttons: [{
        text: article.checked ? 'Uncheck' : 'Check',
        icon: article.checked ? 'remove' : 'checkmark',
        handler: () => {
          article.checked = !article.checked
        }
      }, {
        text: 'Delete',
        icon: 'trash',
        role: 'destructive',
        handler: () => {
          this.articles = this.articles.filter(a => a !== article);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }]
    });

    as.present();
  }
}
