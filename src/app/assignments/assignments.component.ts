import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = "Formulaire d'ajout de devoir";
  color = 'green';
  boutonDesactive = true;
  assignmentSelectionne?: Assignment;
  assignments!: Assignment[];

  constructor(
    private assignmentsService: AssignmentsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.assignmentsService
      .getAssignments()
      .subscribe((assignments: Assignment[]) => {
        this.assignments = assignments;
      });
  }

  isLogged() {
    return this.auth.isLoggedIn();
  }
}
