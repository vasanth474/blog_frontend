import { Component, OnInit,OnDestroy } from '@angular/core';
//import { BlogService } from '../blog.service';
import { BlogHttpService } from '../blog-http.service';
import {AnimationTransitionMetadata} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy{
  //Property used to recive allBlogs
  public allBlogs;
  

  constructor(public blogHttpService:BlogHttpService) { 
    console.log("Home constructer is called");

  }

  ngOnInit() {
    console.log("The Home OnInit is called");
    this.allBlogs = this.blogHttpService.getAllBlogs().subscribe(
      data =>{
        console.log("Logging Data");
          console.log(data);
          this.allBlogs  = data["data"];
      },
      error=>{
          console.log("some error occured");
          console.log(error.errorMessage);
      }
    ); 
    console.log(this.allBlogs);
  }
  ngOnDestroy(){
    console.log("The Home view is destroyed!");
  }

}
