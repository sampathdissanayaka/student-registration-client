import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent {
  student: any;
  studentReq: any;
  type: string = '';
  studentId: string = '';
  studentForm: FormGroup;
  profileImageUrl: string | undefined;


  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.studentId =
      this.route?.snapshot?.queryParamMap?.get('studentId') ?? '';
    this.type = this.route?.snapshot?.queryParamMap?.get('type') ?? '';

    if (this.studentId) {
      let id = Number(this.studentId);
      this.getStudentById(id);
    }

    this.studentForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Mobile: ['', Validators.required],
      Email: ['', Validators.required],
      NIC: ['', Validators.required],
      DateOfBirth: [null],
      Address: [null],
      ProfileImagePath: [null],
    });
  }

  ngOnInit() {}

  onClickSave(fromData: any) {
    if (this.type == 'edit') {
      this.setEditStudentReqBody(fromData);
      this.updateStudentInDb();
    } else if (this.type == 'create') {
      this.setStudentReqBody(fromData);
      this.saveStudentInDb();
    }
  }

  setStudentReqBody(formData: any) {
    this.studentReq = {
      firstName: formData.FirstName,
      lastName: formData.LastName,
      mobile: formData.Mobile,
      email: formData.Email,
      nic: formData.NIC,
      dateOfBirth: formData.DateOfBirth ?? null,
      address: formData.Address ?? null,
      profileImagePath: this.profileImageUrl ?? null,
    };
  }

  saveStudentInDb() {
    this.studentService.createStudent(this.studentReq).subscribe(
      (res: any) => {
        if (res) {
          Swal.fire({
            title: 'Created Successfully',
            icon: 'success',
          });
          this.router.navigateByUrl('');
        }
      },
      () => {}
    );
  }

  setEditStudentReqBody(formData: any) {
    this.studentReq = {
      id: this.student.id,
      firstName: formData.FirstName,
      lastName: formData.LastName,
      mobile: formData.Mobile,
      email: formData.Email,
      nic: formData.NIC,
      dateOfBirth: formData.DateOfBirth ?? null,
      address: formData.Address ?? null,
      profileImagePath: this.profileImageUrl ?? null,
    };
  }

  updateStudentInDb() {
    this.studentService.editStudent(this.studentReq).subscribe(
      (res: any) => {
        if (res) {
          Swal.fire({
            title: 'Updated Successfully',
            icon: 'success',
          });
          this.router.navigateByUrl('');
        }
      },
      () => {}
    );
  }

  getStudentById(id: number) {
    this.studentService.getStudentById(id).subscribe(
      (res: any) => {
        if (res) {
          this.student = res;
          this.profileImageUrl = res.profileImagePath;
          if (this.type == 'edit') {
            this.mapData();
          } else if (this.type == 'view') {
            this.mapViewData();
          }
        }
      },
      () => {}
    );
  }

  mapData() {
    this.studentForm = this.fb.group({
      FirstName: [this.student.firstName, Validators.required],
      LastName: [this.student.lastName, Validators.required],
      Mobile: [this.student.mobile, Validators.required],
      Email: [this.student.email, Validators.required],
      NIC: [this.student.nic, Validators.required],
      DateOfBirth: [this.student.dateOfBirth],
      Address: [this.student.address],
      ProfileImagePath: [''],
    });
  }

  mapViewData() {
    this.studentForm = this.fb.group({
      FirstName: { value: this.student.firstName, disabled: true },
      LastName: { value: this.student.lastName, disabled: true },
      Mobile: { value: this.student.mobile, disabled: true },
      Email: { value: this.student.email, disabled: true },
      NIC: { value: this.student.nic, disabled: true },
      DateOfBirth: { value: this.student.dateOfBirth, disabled: true },
      Address: { value: this.student.address, disabled: true },
      ProfileImagePath: {
        value: '',
      },
    });
  }

  cancel() {
    this.router.navigateByUrl('');
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.studentService.uploadProfileImage(file).subscribe(
        (response) => {
          this.profileImageUrl = response.fileUrl;
          alert('Image uploaded successfully!');
        },
        (error) => {
          console.error('Error uploading image:', error);
          alert('Image upload failed!');
        }
      );
    }
  }

  deleteImg() {
    this.profileImageUrl = '';
  }
}
