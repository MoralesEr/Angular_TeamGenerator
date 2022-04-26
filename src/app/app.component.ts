import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newMemberName = "";
  members: string[] = [];
  errorMessage = "";
  numberOfTeams: number | ""="";
  teams: string[][] =  []

  onInput(member: string){ /**Guarda el valor del input a un string member */
    this.newMemberName = member; /**Guardem el valor de member al String newMemberName */
  
  }

  onTeamInput(number: string){ /**Guarda el valor del input d'equips a un string */
    this.numberOfTeams = Number(number); /**Guardem el valor de number a numberOfTeams */
  }

  addMember(){ /**Entra el valor de newMemberName al array members tipus String */
    if (!this.newMemberName) { /**Si el camp del nom està buit mostrarà un error */
      this.errorMessage = "El camp 'Nom' no pot ser buit!";
      return;
    }else{ /**Si no, executarà el codi */
      this.members.push(this.newMemberName);
      this.newMemberName = "";
      this.errorMessage = "";
    }
  }

  deleteMembers(){ /**Borra els members que hi ha al array */
    this.members.length = 0;
    this.newMemberName = "";
    this.errorMessage = "";
  }

  generateTeams(){ /**Genera els equips de forma aleatoria */
    if(this.numberOfTeams <= 0 || !this.numberOfTeams){ /**Si no entrem res o bé entrem més equips que persones dona error */
        this.errorMessage = "Nombre d'equips invalid!";
        return;
    }
    if(this.numberOfTeams > this.members.length){
      this.errorMessage="No hi han membres suficients!"
      return;
    }


      this.teams = [];
      this.errorMessage = "";
      const allMembers = [...this.members]; /**Creem un nou array amb els continguts del de membres */
      while(allMembers.length){ /**Mentre hi hagin persones dins del array es repetirà el següent codi en bucle */
        for (let index = 0; index < this.numberOfTeams; index++) { /**Bucle que per cada equip que hi ha assigna un membre utilitzant un index aleatori */
          const randomIndex = Math.floor(Math.random()*allMembers.length);/**Generació del index aleatori */
          const member = allMembers.splice(randomIndex, 1)[0] /**Agafem el membre que hi ha al index */
          if(!member){
            break;
          }
          if(this.teams[index]){ /**Si ja existeix un array a la posició actual afegeix el membre */
            this.teams[index].push(member)
          }else{ /**Si no existeix crea un nou array amb el membre a la primera posició */
            this.teams[index] = [member]
          }
        }
      }
      this.numberOfTeams = "";
      this.members = [];
  }

}
