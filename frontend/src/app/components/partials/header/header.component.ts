import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isMenu = false;
  istoggle = true;
  cartQuantity = 0;

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });
  }

  toggle() {
    this.isMenu = !this.isMenu;
    this.istoggle = !this.istoggle;
  }
}
