import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//RouterModule used to setup the application level routing 
import {RouterModule,Routes} from '@angular/router';
import { ToastrModule } from 'ngx-toastr';



//Bowser Animation import
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
//Import HttpClientModule to work with the HTTP Request and Response Which makes its access global 
import { HttpClientModule } from '@angular/common/http';

//Forms Modul to include the forms in the page 
import {FormsModule} from '@angular/forms';

//BlogService is created and imported from blog.service
//import { BlogService } from './blog.service';
import { BlogHttpService } from './blog-http.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogViewComponent,
    BlogCreateComponent,
    BlogEditComponent,
    AboutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    //RouterModule forRoot method to declare  the possible routes in the application 
    RouterModule.forRoot([
     {path:'home',component:HomeComponent},
     {path:'',redirectTo:'home',pathMatch:'full'},
     {path:'about',component:AboutComponent},
     {path:'blog/:blogId',component:BlogViewComponent},
     {path:'create',component:BlogCreateComponent},
     {path:'edit/:blogId',component:BlogEditComponent},
     {path:'**',component:NotFoundComponent}
    ])
  ],
  providers: [BlogHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
