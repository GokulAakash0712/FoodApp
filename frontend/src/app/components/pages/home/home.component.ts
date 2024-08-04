import { Component, OnInit } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];

  constructor(
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    //search foods
    this.activatedRoute.params.subscribe((params) => {
      // console.log(params);
      if (params['searchTerm']) {
        //searched food
        this.foods = this.foodService.getAllFoodBySearch(params['searchTerm']);
      } else if (params['tag']) {
        //filter
        this.foods = this.foodService.getAllFoodsByTag(params['tag']);
      } else {
        //get all foods
        this.foods = this.foodService.getAll();
      }
    });
  }
}
