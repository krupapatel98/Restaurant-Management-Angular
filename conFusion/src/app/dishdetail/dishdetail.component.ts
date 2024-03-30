import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { EmailValidator, FormBuilder, FormGroup, NgForm, Validator, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { DISHES } from '../shared/dishes';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
    dish: Dish = new Dish;
    dishIds: string[];
    prev: string;
    next: string;

    dish1: typeof DISHES[] = [];

    ratingForm: FormGroup;
    comment: Comment;

    @ViewChild('rform') feedbackFormDirective;


  constructor(private dishService: DishService,
            private route: ActivatedRoute,  
            private location: Location, private fb:FormBuilder) {
              this.createForm();
             }

  ngOnInit(): void {
    this.dishService.getDishIds()
    .subscribe((dishIds)=>this.dishIds=dishIds);
    let id = this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => {this.dish = dish; this.setPrevNext(dish.id);});
  }



  createForm() {
    this.ratingForm = this.fb.group({
      author: ['', Validators.required],
      rating: [5, Validators.required],
      comment: ['', Validators.required],
    });
  }

  // onSubmit(fform:NgForm){
  onSubmit(){
    this.comment = this.ratingForm.value;
    console.log(this.comment);
    this.ratingForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
    // this.dish.push(fform.value)
    this.feedbackFormDirective.resetForm();
  }


  setPrevNext(dishId: string)
 {
   const index = this.dishIds.indexOf(dishId);
   this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
   this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
 } 

  goBack(): void {
    this.location.back();
  }

}
