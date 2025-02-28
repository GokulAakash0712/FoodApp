import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isMenu = false;
  istoggle = true;
  cartQuantity = 0;
  user!: User;

  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });

    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }

  logout() {
    this.userService.logout();
  }

  get isAuth() {
    return this.user.token;
  }

  toggle() {
    this.isMenu = !this.isMenu;
    this.istoggle = !this.istoggle;
  }
}
