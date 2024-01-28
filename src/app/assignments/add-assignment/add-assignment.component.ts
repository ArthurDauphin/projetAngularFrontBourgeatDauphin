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
  nomDevoir = '';
  dateDeRendu?: Date = undefined;
  auteur = '';
  matiere = '';
  photo = '';
  note?: number;
  remarques = '';

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private auth: AuthService
  ) {}

  onSubmit(event: any) {
    event.preventDefault();
    const newAssignment = new Assignment();
    newAssignment.id = this.assignmentsService.getNewID();
    newAssignment.nom = this.nomDevoir;
    newAssignment.auteur = this.auteur;
    newAssignment.matière = this.matiere;
    newAssignment.photo = this.photo;
    if (this.dateDeRendu) newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;

    this.assignmentsService.addAssignment(newAssignment).subscribe((reponse) => {
      console.log(reponse.message);
      console.log('Dernier devoir ajouté:', newAssignment);
      this.router.navigate(['/home']);
    });
  }

  isLogged() {
    return this.auth.isLoggedIn();
  }
}
