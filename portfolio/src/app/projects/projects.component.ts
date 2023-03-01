import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { __values } from 'tslib';
import { FileService } from '../file.service';
import { Project, Projects } from '../model/projects.model';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
  projects:Project[];
  projectsToShow: Project[] = [];
  archivedProjects: boolean = false;
  hideArchivedProjects: boolean = false;

  constructor(private fileService:FileService, 
              private route: ActivatedRoute){
    this.fileService.readFile('../assets/json/projects.json').subscribe(data=> {
      let jsonData = data as Projects;
      this.projects = jsonData.projects;
      this.hideArchivedProjects = jsonData.hideArchivedProjects;
      this.seperateProjects();
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((value)=>{
      if(value){
        this.archivedProjects = value['archived']=='archived';
      }
    });
  }

  seperateProjects():void {
    this.projects.forEach(project => {
      if(this.archivedProjects){
        if(project.archived)
          this.projectsToShow.push(project);
      }else {
        if(!project.archived){
          this.projectsToShow.push(project);
        }
      }
    });
  }

}
