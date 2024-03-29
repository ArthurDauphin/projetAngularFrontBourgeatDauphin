import { Component, Query } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent {
  assignment: Assignment = new Assignment();
  nom = '';
  dateDeRendu!: Date;
  auteur = '';
  matiere = '';
  photoProf = '';
  photoMatiere = '';
  note!: Number;
  remarques = '';

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService
      .getAssignment(id)
      .subscribe((assignment) => (this.assignment = assignment!));

    const paramHTTP = this.route.snapshot.queryParams;
    const nom = this.route.snapshot.queryParams['nom'];
    const fragment = this.route.snapshot.fragment;
    const dateDeRendu = this.route.snapshot.queryParams['dateDeRendu'];
    const auteur = this.route.snapshot.queryParams['auteur'];
    const matiere = this.route.snapshot.queryParams['matiere'];
    const photoProf = this.route.snapshot.queryParams['photoProf'];
    const photMatiere = this.route.snapshot.queryParams['photMatiere'];
    const note = this.route.snapshot.queryParams['note'];
    const remarques = this.route.snapshot.queryParams['remarques'];
    
  }

  onSaveAssignment(event: Event): void {
    event.preventDefault();
  
    if (this.nom) {
      this.assignment.nom = this.nom;
    }
    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }
    if (this.auteur) {
      this.assignment.auteur = this.auteur;
    }
    if (this.matiere) {
      this.assignment.matiere = this.matiere;
    }
    if (this.photoProf) {
      this.assignment.photoProf = this.photoProf;
    }
    if (this.photoMatiere) {
      this.assignment.photoMatiere = this.photoMatiere;
    }
    if (this.remarques) {
      this.assignment.remarques = this.remarques;
    }
    if (this.note !== null && this.note !== undefined) {
      this.assignment.note = this.note;
    }
    this.assignmentsService.updateAssignment(this.assignment).subscribe({
      next: (response) => {
        console.log(response.message);
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
