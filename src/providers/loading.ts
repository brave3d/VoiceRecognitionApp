import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingService {

constructor(public loadingCtrl: LoadingController){}

private loader;
public presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Lütfen Bekleyiniz ..."
    });
    this.loader.present();
  }

  dismissLoader(){
  this.loader.dismiss();
  }

}