import { Component, OnInit, OnDestroy } from '@angular/core';

//Declare the activated route to capture the argument
import {ActivatedRoute,Router} from '@angular/router';
//Declare the BlogService to import the Service header 
//import { BlogService } from '../blog.service';
import {BlogHttpService} from '../blog-http.service';
//Location service to get the previous page
import {Location} from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit,OnDestroy {
  
  //Property for reciving the contents of the individual blog for blogView
  public currentBlog;

  constructor(private _route:ActivatedRoute,private router:Router,private blogHttpService:BlogHttpService,public location:Location,public toastr:ToastrService) { 
        console.log("BlogView Constructure is called");
  }

  ngOnInit() {
    console.log("Blog view ngOnInit is called!");
    //Capture the blog ID here 
    let myBlogId = this._route.snapshot.paramMap.get('blogId'); 
    console.log(myBlogId);
    //call the getSingleBlogInformation of the blogService to get the perticular blog using the blogId
     this.currentBlog = this.blogHttpService.getSingleBlogInformation(myBlogId).subscribe(
       data =>{
          console.log("Logging Data");
          console.log(data);
          this.currentBlog = data["data"];
       },
       error =>{
          console.log("Some error occured!");
          console.log(error.errorMessage);
       }
     );
  }
  ngOnDestroy(){
    console.log("The Blog view is destroyed!");
  }
  public deleteThisBlog():any {
    this.blogHttpService.deletBlog(this.currentBlog.blogId).subscribe(
      data =>{
        console.log(data);
        this.toastr.success('Success', 'Blog deleted successfully!!', {
          timeOut: 2000
        });
          setTimeout(() =>{
            this.router.navigate(['/home']);
          },1000);
      },
      error =>{
        console.log("Some Error occured");
        console.log(error.errorMessage);
        this.toastr.error('Error', 'Unknown error occured!', {
          timeOut: 2000
        });
      }
    );
    }

  public goBachToPreviousPage(){
    this.location.back();   
  }
  }

