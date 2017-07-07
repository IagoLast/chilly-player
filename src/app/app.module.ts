import { MainService } from './main/main.service';
import { WindowService } from './window.service';
import { PlayerService } from './player.service';
import { LastfmService } from './lastfm.service';
import { YoutubeService } from './youtube.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { TrackComponent } from './track/track.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    TrackComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [YoutubeService, LastfmService, PlayerService, WindowService, MainService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
