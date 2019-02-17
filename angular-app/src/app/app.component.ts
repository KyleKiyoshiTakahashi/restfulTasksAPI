
import { HttpService } from './http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = "TASK API"
  tasks: any = [];
  task;
  taskId: String;
  newTask: any;
  editTask: any; 
  
  constructor(private _httpService: HttpService){
    
  }

  ngOnInit(){
    this.newTask = { title: "", description: "" }
    this.editTask = { _id: "", title: "", description: "" }
    this.taskId = "";
    this.getTasksFromService();
  }
  // gets all the tasks
  getTasksFromService(){
    let obs = this._httpService.getTasks();
    obs.subscribe(data => {
        console.log("Got our data!", data)
        this.tasks = data;
    });
  }
  // gets a single task by id from button click
  getTaskFromService() {
    let obs = this._httpService.getTask(this.taskId);
    obs.subscribe(data => {
      this.task = data;
    });
    this.taskId = "";
  }
// from form to find a task by ID using keyup method to display a task
  onNewTaskKey(event: any) {
    this.taskId = event.target.value;
  }
// from form to create a new task
  onNewTaskSubmit() {
    let obs = this._httpService.createTask(this.newTask);
    obs.subscribe(data => {
      console.log('Task created.', data);
      this.getTasksFromService();
    });
    this.newTask = { title: "", description: "" }
  }
// from button click.  edit the task
  onEditTask(id, title, description) {
    this.editTask._id = id;
    this.editTask.title = title;
    this.editTask.description = description; 
  }
// from form. this edits the task and updates the database
  onEditTaskSubmit() {
    let obs = this._httpService.editTask(this.editTask._id, this.editTask);
    obs.subscribe(data => {
      console.log('Task edited.', data);
      this.getTasksFromService();
    })
    this.editTask = { _id: "", title: "", description: "" };
  }
// deletes task by id 
  onDeleteTask(id){
    let obs = this._httpService.deleteTask(id);
    obs.subscribe(data => {
      this.getTasksFromService();
    })
  }
  
}
