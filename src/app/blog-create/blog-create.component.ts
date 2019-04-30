import { Component, OnInit,ViewContainerRef } from '@angular/core';

//Import the Http Service to use the post, edit and delet methods of api
import {BlogHttpService} from '../blog-http.service';

//Import the Activatedrouter to send view to fullblogview of the created blog 
import {ActivatedRoute,Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {


  public blogTitle:string;
  public blogBodyHtml:string;
  public blogDescription:string;
  public blogCategory:string;
  public possibleCategories = ["Comedy","Drama","Action","Technology"];

  constructor(public blogHttpService:BlogHttpService,public _router:ActivatedRoute,public router:Router,public vcr: ViewContainerRef,public toastr:ToastrService) { 
    
  }

  ngOnInit() {
  }

  //Method to pass the data to the service 
  public createBlog():any{
    let blogData = {
      title: this.blogTitle,
      description: this.blogDescription,
      blogBody:this.blogBodyHtml,
      category:this.blogCategory

    }
    console.log(blogData);

    //Passing the blogData to the createBlog method of HttpService but it must be as an observable 
    this.blogHttpService.createBlog(blogData).subscribe(
      data =>{
          console.log("Blog Created");
          console.log(data);
          this.toastr.success('Success', 'Blog created successfully!',{
            timeOut: 3000
          });
          //To rout the blogview of the created blog
          setTimeout(()=>{
              this.router.navigate(['/blog',data.data.blogId]);
          },1000);
      },
      error =>{

            console.log("Some Error Occured");
            console.log(error.errorMessage);
            this.toastr.error('Error', 'Unknown error occured!', {
              timeOut: 3000
            });
      }
    );
  }

}
