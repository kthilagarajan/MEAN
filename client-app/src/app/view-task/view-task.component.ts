import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../shared/http.service';
@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  task_list = []

  constructor(private httpService : HTTPService) { }

  ngOnInit() {
    this.refreshTasks()
  }

  refreshTasks(){
    this.httpService.getAllTasks({}).subscribe((response:any)=>{
      this.task_list = response.data
    })
  }

  doDeleteAction(id){
    if(confirm("Would you like to delete? Press ok to proceed...")){
      this.httpService.deleteTask({taskId: id}).subscribe((response:any)=>{
        this.refreshTasks()
      })
    }
  }

}
