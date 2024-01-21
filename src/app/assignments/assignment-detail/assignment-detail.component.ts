import { Component, Output, EventEmitter } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent {
  assignmentTransmis?: Assignment;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const id:number = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
    .subscribe((assignment) => {
      this.assignmentTransmis = assignment;
    });
  }

  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;

      this.assignmentsService
        .updateAssignment(this.assignmentTransmis)
        .subscribe((reponse) => { console.log(reponse.message);
        this.router.navigate(['home']);
    });
  }
}

  //@Output() deleteAssignment = new EventEmitter<Assignment>();

  onDeleteAssignment() {
    if (this.assignmentTransmis) {
      this.assignmentsService
        .deleteAssignment(this.assignmentTransmis)
        .subscribe((reponse) => {
          console.log(reponse.message);
          this.router.navigate(['home']);
        });
    }
  }

  onClickEdit() { 
    this.router.navigate(['/assignment', this.assignmentTransmis?.id, 'edit'],
    {
      queryParams: {'nom': this.assignmentTransmis?.nom, 'dateDeRendu': this.assignmentTransmis?.dateDeRendu}, 
      fragment: 'edition'
    });
}

  isAdmin()  {
     return this.auth.isAdminUser();
  }


}