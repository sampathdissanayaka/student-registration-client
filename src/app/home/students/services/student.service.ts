import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { Student } from '../models/student.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiStudentUrl = 'api/Students';

  constructor(private baseDataService: BaseDataService) {}

  getAllStudents(search: string): Observable<Student[]> {
    return this.baseDataService.makeGetCall(`${this.apiStudentUrl}/?search=${search}`);
  }

  createStudent(student: Student): Observable<any> {
    return this.baseDataService.makePostCall(`${this.apiStudentUrl}`, student);
  }

  editStudent(student: Student): Observable<any> {
    return this.baseDataService.makePutCall(`${this.apiStudentUrl}`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.baseDataService.makeDeleteCall(`${this.apiStudentUrl}/${id}`);
  }

  getStudentById(id: number): Observable<Student> {
    return this.baseDataService.makeGetCall(`${this.apiStudentUrl}/${id}`);
  }

  uploadProfileImage(file: File): Observable<{ fileUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.baseDataService.makeImageUploadCall(`${this.apiStudentUrl}/upload`, formData);

  }

}
