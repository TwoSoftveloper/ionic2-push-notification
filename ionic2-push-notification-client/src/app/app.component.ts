import { Component } from "@angular/core";
import { Http } from "@angular/http";
import { Platform } from "ionic-angular";
import { Push, PushObject, PushOptions } from "@ionic-native/push";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(private http: Http, platform: Platform, private push: Push, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initPushNotification();
    });
  }

  initPushNotification() {
    const options: PushOptions = {
      android: {
        senderID: "327940925628",
        sound: true,
        vibrate: true
      }
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on("registration").subscribe(
      data => {
        this.http.post("http://0.0.0.0:5555/open", { token: data }).subscribe(res => {
          console.log("Register send");
        });
      });
    pushObject.on("notification").subscribe(
      notification => {
        alert("You are in app");
      });
  }
}

