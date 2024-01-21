import { Component } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent {
  // Evenement qu'on enverra au père avec la soumission
  // du formulaire
  //@Output() nouvelAssignment = new EventEmitter<Assignment>();

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private auth: AuthService
  ) {}

  // pour le formulaire
  nomDevoir = '';
  dateDeRendu?: Date = undefined;
  newAssignment = new Assignment();

  onSubmit(event: any) {
    event.preventDefault();
    const newAssignment = new Assignment();
    newAssignment.id = this.assignmentsService.getNewID();
    newAssignment.nom = this.nomDevoir;
    if (this.dateDeRendu) newAssignment.dateDeRendu = this.dateDeRendu;

    newAssignment.rendu = false;

    //this.assignments.push(a);
    this.assignmentsService
      .addAssignment(newAssignment)
      .subscribe((reponse) => { console.log(reponse.message)
    console.log('Dernier devoir ajouté:', newAssignment);
    this.router.navigate(['/home']);
      });
    // pass an argument of type number to the getAssignment() function
  }

  isLogged()  {
    return this.auth.isLoggedIn();
 }
}
