import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../shared/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskForm: FormGroup;
  constructor(private httpService : HTTPService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.taskForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required)
    });
    this.doGetTask()
  }

  doGetTask(){
    this.httpService.getTask({id:this.route.snapshot.paramMap.get('id')}).subscribe((response:any)=>{
      this.taskForm.setValue({
        title : response.data.title,
        description : response.data.description,
        file : response.data.file
      })
    })
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

  doUpdateTask({ value, valid }: { value: any, valid: boolean }){
    value.taskId = this.route.snapshot.paramMap.get('id')
    this.httpService.updateTask({},value).subscribe((response:any)=>{
      this.router.navigate(["/tasks"])
    })
  }

}
