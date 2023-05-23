import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInTable: any = []
  PageType: any = '';
  error='';
  pageType: PageType = 'login';
  signInObj = {
    "email": '',
    "password": '',
    "birthday": ''
  }
  constructor(public http: HttpClient,public router:Router) { 
     
  }
  ngOnInit(): void {

  }
  newUser() {

    this.http.post('http://127.0.0.1:5000/signup', this.signInObj).subscribe(res => {
      console.log(res)
      this.signInObj.email = '';
      this.signInObj.password = '';
      this.signInObj.birthday = '';
      this.pageType = 'login';
      this.error='';
    })

  }
  goToLogin() {
    this.pageType = 'login';
  }
  toRegister() {
    this.pageType = 'register';
  }
  displayNotification: boolean = false

  login() {

    this.http.post('http://127.0.0.1:5000/login', this.signInObj).subscribe((res: any) => {
      console.log(res)
      this.signInObj.email = '';
      this.signInObj.password = '';
      if (res.status == 'success') {
        this.error='';
        this.router.navigate(['home'])
       
      }
      else {
        this.error='incorrect user name or password'
  
      }
    })


  }



  onCancel() {
    this.displayNotification = true
  }
}
export type PageType = 'login' | 'register'; {

}
