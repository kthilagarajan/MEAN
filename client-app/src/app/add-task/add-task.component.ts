import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HTTPService } from '../shared/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  constructor(private httpService: HTTPService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.taskForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required)
    });
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.taskForm.patchValue({
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        // this.cd.markForCheck();
      };
    }
  }

  doAddTask({ value, valid }: { value: any, valid: boolean }) {
    this.httpService.addTask({}, value).subscribe((response: any) => {
      this.taskForm.reset()
    })
  }

}
