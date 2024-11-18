import { Component, ViewChild } from '@angular/core';
import { Student } from '../../models/student.model';
import { ReplaySubject, takeUntil } from 'rxjs';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent {
  displayedColumns: string[] = [
    'FirstName',
    'LastName',
    'Mobile',
    'Email',
    'NIC',
    'Action',
  ];
  // dataSource: Student[] = [];
  dataSource = new MatTableDataSource<Student>([]);

  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);
  searchForm: FormGroup;
  searchText: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(
    private studentService: StudentService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      Search: [''],
    });
  }

  ngOnInit() {
    this.getAllStudentList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  handleSearch() {
    this.searchText = this.searchForm.get('Search')?.value;
    this.getAllStudentList();
  }

  getAllStudentList() {
    this.studentService
      .getAllStudents(this.searchText)
      .pipe(takeUntil(this.destroy))
      .subscribe((students: Student[]) => {
        // this.dataSource = students;
        this.dataSource = new MatTableDataSource<Student>(students);

        this.dataSource.paginator = this.paginator;
      });
  }

  addStudent() {
    this.router.navigateByUrl('studentAdd?type=create');
  }

  editStudent(id: number) {
    this.router.navigateByUrl('studentEdit?type=edit&studentId=' + id);
  }
  viewStudent(id: number) {
    this.router.navigateByUrl('studentView?type=view&studentId=' + id);
  }

  deleteStudent(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(id);
      }
    });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Deleted!',
      text: 'Your file has been deleted.',
      icon: 'success',
    });

    this.studentService
      .deleteStudent(id)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (res) => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your record has been deleted.',
            icon: 'success',
          });
          this.getAllStudentList();
        },
        (err) => {}
      );
  }
}
