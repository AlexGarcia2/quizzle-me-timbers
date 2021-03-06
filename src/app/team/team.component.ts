import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { FirebaseService } from '../services/firebase.service';
import { Game } from '../models/game';
import { Team } from '../models/team';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamNameSelected: boolean = false;
  teamName: string;
  currentTeam: Team;

  currentGame: Observable<any> = null;
  gameId: string;
  displayGameView: boolean = false;
  displayTeamSelectionCard: boolean = false;
  gameKeyView: boolean = true;
  gameplayView: boolean = false;

  constructor(public fb: FirebaseService) {
    // this.currentGame = this.fb.getCurrentGame();
  }

  ngOnInit() {
  }

  addTeamToGame(){
    this.currentTeam = new Team(this.teamName);
    this.fb.addTeam(this.gameId, this.currentTeam);
    this.showGameView();
    this.hideSetup();
  }

  toggleEditTeamName(){
    this.teamNameSelected = !this.teamNameSelected;
  }

  joinGame(){
    this.displayGameView = !this.displayGameView;
    this.fb.setGameById(this.gameId);
    this.currentGame = this.fb.initComponentWithGameObservable();
    if (this.currentGame){
      this.displayTeamSelectionCard = true;
    }
  }

  showGameView(){
    this.displayGameView = true;
  }

  hideSetup(){
    this.displayTeamSelectionCard = false;
    this.gameKeyView = false;
    this.gameplayView = true;
    
  }
}
