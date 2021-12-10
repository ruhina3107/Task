import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, MinLengthValidator } from '@angular/forms';
import { ApiserviceService } from './apiservice.service';
import { AppModel } from './app.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FacebookIntegration';
  DataForm: any;
  data:any
  selectedLevel: any;
  formdetails: any;
  constructor( private formBuilder:FormBuilder,private service:ApiserviceService) { 

    this.DataForm = this.formBuilder.group({
     
      'Name' : ['', [Validators.required, Validators.minLength(1)]],
      'MinAge' : ['', [Validators.required, Validators.minLength(1)]],
      'MaxAge' : ['', [Validators.required, Validators.minLength(1)]],
      'Country' : ['', [Validators.required, Validators.minLength(1)]],
      'Gender' : ['', [Validators.required, Validators.minLength(1)]]
    });
}
  ngOnInit(): void {

    
    // throw new Error('Method not implemented.');
  }
  country()
  {
    this.service.country().subscribe((res: any) =>{
     // console.log(res)
      this.data = res.body.data
      
    })
  }
  selectChangeHandler (event: any) {
    //update the ui
    console.log(event);
    this.selectedLevel = event.target.value
  }
  Enroll()
  {
    console.log(this.DataForm.value)
    var sF = this.DataForm.value
    this.formdetails = new AppModel(
      sF.Name,
      sF.MinAge,
      sF.MaxAge,
      sF.Country,
      sF.Gender
    )
    this.service.createAd(this.formdetails).subscribe((res: any) =>{console.log(res)})
  }
  
}
