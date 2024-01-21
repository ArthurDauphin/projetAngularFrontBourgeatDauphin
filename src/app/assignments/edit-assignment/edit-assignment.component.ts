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
  nom: string | undefined;
  dateDeRendu: Date | undefined;

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
    console.log('Query Params = ' + nom + ' ' + dateDeRendu + ' ' + fragment);
    console.log(paramHTTP);
    
  }

  onSaveAssignment(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (this.nom) {
      this.assignment.nom = this.nom;
    }

    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((reponse) => console.log(reponse.message));

    this.router.navigate(['home']);
  }
}
