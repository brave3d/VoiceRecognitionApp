
import { NavController, Platform } from 'ionic-angular';
import { animate, ChangeDetectorRef, Component, keyframes, state, style, transition, trigger } from '@angular/core';
import { SpeechRecognition } from 'ionic-native';
import { LoadingService } from "../../providers/loading";
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


//https://github.com/jcsmesquita/cordova-speechrecognition

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [

    trigger('animate', [
      state('animating', style({
        transform: 'translate3d(0,0,0)',
      })),
      transition('* => animating', animate('300ms ease-in', keyframes([
        style({ transform: 'translate3d(0,0,0)', offset: 0 }),
        style({ transform: 'translate3d(0,-10px,0)', offset: 0.5 }),
        style({ transform: 'translate3d(0,0,0)', offset: 1 })
      ]))
      )
    ]),
  ]

})
export class HomePage {

  state: String;
  question: String = "";
  answer: String = "";
  isRecording: boolean;

  subscription;
  i = 0;

  constructor(public navCtrl: NavController, public loadingService: LoadingService, private plt: Platform, private cd: ChangeDetectorRef, public http: Http) {
    this.state = 'initial';
  }


  animate() {
    this.state = (this.state == 'start') ? 'animating' : 'start';
  }


  startListening() {
    this.answer = "";
    this.question = "";
    if (this.state === "initial") {
      this.loadingService.presentLoading();
      this.state = "listening";
      this.isRecording = true;

      if (!this.isIos()) {
        var maxMatches = 1;
        var language = "tr-TR";
        window['plugins'].speechrecognizer.start((matches) => {
          //When everything go correctly.
          this.question = matches.results[0][0].transcript;
          this.state = "initial";
          this.isRecording = false;
          this.loadingService.dismissLoader();

          //Get the answer from the server.
          this.http.get('http://4c929904.ngrok.io/api/getAnswer/' + this.question.trim()).map(res => res.text()).subscribe(data => {
            this.answer = data;
            console.log(data);


            //Detect the changes on the UI.
            this.cd.detectChanges();
          });

        },
          () => {
            //When something wrong happenes.
            this.question = "An error ocuured";
            this.cd.detectChanges();
            this.loadingService.dismissLoader();
            this.state = "initial";
            this.isRecording = false;
          }
          , maxMatches, language);
      }

      else if (this.isIos()) {

        var results = [];
        var options = {
          language: "tr-TR",
          matches: 1
        };

        this.subscription = Observable.interval(1000).subscribe(x => {
          // the number 1000 is on miliseconds so every second is going to have an iteration of what is inside this code.
          console.log(this.i);
          this.i++;
        });

        SpeechRecognition.startListening(options)
          .subscribe(
          (matches) => {
            results = matches;
            this.question = results.join();
            console.log(matches)

            this.http.get('http://4c929904.ngrok.io/api/getAnswer/' + this.question.trim()).map(res => res.text()).subscribe(data => {
              this.answer = data;
              console.log(data);
              this.cd.detectChanges();
              this.loadingService.dismissLoader();
            });
          },
          (onerror) => {
            this.question = "error, please try again";
            console.log('error:', onerror);
            this.loadingService.dismissLoader();
          }
          );
      }

    }


  }


  //IOS ONLY
  stopListening() {
    console.log("stop!")
    this.subscription.unsubscribe();
    this.i = 0;

    // window['plugins'].speechrecognizer.stop(() => {
    //   this.state = "initial";
    //   this.isRecording = false;
    // });
    SpeechRecognition.stopListening().then(() => {
      this.isRecording = false;
      this.state = "initial";
    }, ()=> {
      this.isRecording = false;
      this.state = "initial";
      console.log("Stop Error")
    });

  }




  ionViewDidLoad() {

    if (this.isIos()) {
      console.log("sdfsd");
      this.loadingService.presentLoading();
      SpeechRecognition.requestPermission()
        .then(
        () => { console.log('Granted'); this.loadingService.dismissLoader(); },
        () => { console.log('Denied'); this.loadingService.dismissLoader(); }
        );
    };

  }


  isIos() {
    return this.plt.is('ios');
  }

}
