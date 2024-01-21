import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignments: Assignment[] = [];

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) {}
  url = 'http://localhost:8010/api/assignments';

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url);
  }

  getAssignment(id: number): Observable<Assignment> {
    return this.http.get<Assignment>(this.url + '/' + id)
    .pipe(tap(a => {
      console.log("tap : " + a.nom);
    }),
    catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id)));
  }

  getNewID(): number {
    return this.assignments.length + 1;
  }

  addAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment.nom, 'ajouté');
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete(this.url + '/' + assignment._id);
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
 
      return of(result as T);
    }
 };
 
}
