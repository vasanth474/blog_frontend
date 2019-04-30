import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {BlogHttpService} from '../blog-http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
   public currentBlog;
   public possibleCategories = ["Comedy","Drama","Action","Technology"];

  constructor(public _route : ActivatedRoute,public router:Router,public blogHttpService:BlogHttpService,public toastr:ToastrService) { }

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
  public editThisBlog():any{
    this.blogHttpService.editBlog(this.currentBlog.blogId,this.currentBlog).subscribe(
      data=>{
          console.log(data);
         // alert("Blog Edited successfully");
          this.toastr.success('Success','Blog edited successfully',{
            timeOut: 2000
          });
          setTimeout(()=>{
              this.router.navigate(['/blog',this.currentBlog.blogId]);
          },1000);
      },
      error =>{
        console.log("Some error occured!");
        console.log(error.errorMessage);
        this.toastr.error('oops!','Some error occured',{
          timeOut: 2000
        });

      }
    );

  }

}
