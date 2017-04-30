
import { NavController } from 'ionic-angular';
import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { SpeechRecognition } from 'ionic-native';
import { LoadingService } from "../../providers/loading";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [

  trigger('animate', [
    state('animating', style({
      transform: 'translate3d(0,0,0)',
    })),
    transition('* => animating', animate('300ms ease-in', keyframes([
    style({transform: 'translate3d(0,0,0)', offset: 0}),
    style({transform: 'translate3d(0,-10px,0)', offset: 0.5}),
    style({transform: 'translate3d(0,0,0)', offset: 1})
  ]))
    )
  ]),
]

})
export class HomePage {

  state: String;
  result:String="";
  constructor(public navCtrl: NavController, public loadingService: LoadingService) {
      this.state = 'initial';
  }


  animate(){
     this.state = (this.state == 'start') ? 'animating' : 'start';

   }


   startListening(){

     var options = {
      language: "en-US",
        // matches:5 ,
        // prompt:"",      // Android only
        // showPopup:true,  // Android only
         //showPartial:true // iOS only
     }
     console.log(this.state);
     var results=[];
     if (this.state === "initial") {
       this.state = "listening";
       SpeechRecognition.startListening(options)
      .subscribe(
      (matches) => {
        results=matches;
        this.result=results.join();
        console.log(matches)
        //For Android Only. Comment the following line for IOS.
        this.state = "initial";

      },
      (onerror) => {
          this.result="error, please try again";
        console.log('error:', onerror);
        }
    );

     }
    //  //For IOS only. Comment the following block for Android.
    //  else {
    //    this.state = "initial";
    //    SpeechRecognition.stopListening();
    //  }


   }

  //  stopListening(ev){
  //    console.log("stop!")
  //    //    this.state = "initial";
  //   //    //SpeechRecognition.stopListening();
  //  }

ionViewDidLoad(){

  console.log("sdfsd");
  // setTimeout(()=> {
  //   SpeechRecognition.requestPermission()
  //     .then(
  //       () => console.log('Granted'),
  //       () => console.log('Denied')
  //     );
  // },3000);

  this.loadingService.presentLoading();
      SpeechRecognition.requestPermission()
      .then(
        () => {console.log('Granted'); this.loadingService.dismissLoader();},
        () => {console.log('Denied'); this.loadingService.dismissLoader();}
      );

}

}
