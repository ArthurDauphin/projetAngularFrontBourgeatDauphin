import { Component, OnInit, ViewChild } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs';

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
  displayedColumns: string[] = ['dateDeRendu', 'nom', 'statut', 'photoProf', 'photoMatiere', 'auteur', 'matiere', 'note', 'remarques'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  page:number = 1;
  limit:number = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasPrevPage!: boolean;
  hasNextPage!: boolean;

  constructor(
    private assignmentsService: AssignmentsService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAssignments(this.page, this.limit);
  }
  
  loadAssignments(page: number, limit: number) {
    this.assignmentsService.getAssignmentsPagine(page, limit)
      .subscribe(
        data => {
          this.assignments = data.docs;
          this.totalDocs = data.totalDocs;
          this.totalPages = data.totalPages;
          this.nextPage = data.nextPage;
          this.prevPage = data.prevPage;
          this.hasPrevPage = data.hasPrevPage;
          this.hasNextPage = data.hasNextPage;
        }
      );
  }
  
  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1; // PageEvent page index is 0-based
    this.limit = event.pageSize;
    this.loadAssignments(this.page, this.limit);
  }
  
  isLogged() {
    return this.auth.isLoggedIn();
  }

  openAssignmentDetail(assignment: Assignment) {
    if (this.isLogged()) {
      this.router.navigate(['/assignment', assignment.id]);
    } else {
      this.router.navigate(['/home']);
    }
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadAssignments(this.paginator.pageIndex + 1, this.paginator.pageSize))
      )
      .subscribe();
  }
  
}
