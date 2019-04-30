import { Injectable } from '@angular/core';

//Import Http Client and Http Error Response to Meake the Http request
import {HttpClient,HttpErrorResponse} from '@angular/common/http';

import {observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BlogHttpService {
  //Property to recive the allBlogs Response 
  public myResponse;
  public currentBlog;

  //Property which states thebase url of the API
  public baseURL = 'https://blogapp.edwisor.com/api/v1/blogs';
  private authToken = "YmIzMThlZTU3NjNhMWU4Y2I1OWRiODFiMzhmYWNkYWRjMDU3ODM1ZjQ3ODNkM2YzMDY0NmZhZTE2ZWFkZmRlYzgzNDJlZjU0MTNjNzA0OWZjMDUyZmJhNDQ3MDFiMzZjOTFiZDBjMDBlNDA0MGM0MGIyN2I2NTAyYWE5ZmRhMDYzNQ==";
  constructor(public _http:HttpClient) {
    console.log("Blog-Http service is called!!!");
   }

  //Method to get the response from the API
  getAllBlogs(){
    this.myResponse = this._http.get(this.baseURL+'/all?authToken='+this.authToken);
    if(this.myResponse){
      console.log("The data is got!");
    }
    console.log(this.myResponse);
    return this.myResponse;
  }

   /* private handleError(err:HttpErrorResponse){
    console.log("Handle Error Https calls");
    console.log(err.message);
    return observable.throw(err.message);
   } */
  //Method to get the single Blog 
  getSingleBlogInformation(myBlogId){
    this.currentBlog = this._http.get(this.baseURL+"/view/"+myBlogId+"?authToken="+this.authToken);
    return this.currentBlog;
  }

  //Method to post the blog
  createBlog(blogData):any{
    let myResponse = this._http.post(this.baseURL+'/create'+'?authToken='+this.authToken,blogData);
    return myResponse;
  }

  //Delete blog
  deletBlog(blogId):any{
    let data ={};
    let myResponse = this._http.post(this.baseURL+'/'+ blogId + '/delete' +'?authToken='+this.authToken,data);
    return myResponse;
  }

  //Edit blog
  editBlog(blogId,blogData):any{
    let myResponse = this._http.put(this.baseURL+'/'+blogId+'/edit'+'?authToken='+this.authToken,blogData);
    return myResponse;
  }
}
