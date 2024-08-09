import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { Food } from '../shared/models/Food';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();

  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find((item) => item.food.id === food.id);
    if (cartItem) {
      // already in cart, skip
      return;
    } else {
      // not in the cart, add
      this.cart.items.push(new CartItem(food));
      this.setCartToLocalStorage();
    }
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id !== foodId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);
    if (!cartItem) {
      return;
    }
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value; //always keeps the latest value
  }

  private setCartToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cart.totalPrice = this.cart.items.reduce(
        (prevSum, currentItem) => prevSum + currentItem.price,
        0
      );
      this.cart.totalCount = this.cart.items.reduce(
        (prevSum, currentItem) => prevSum + currentItem.quantity,
        0
      );
      const cartJson = JSON.stringify(this.cart);
      localStorage.setItem('Cart', cartJson);

      // Notify all listeners of the cart observables, cart will change
      this.cartSubject.next(this.cart);
    }
  }

  private getCartFromLocalStorage(): Cart {
    if (isPlatformBrowser(this.platformId)) {
      const cartJson = localStorage.getItem('Cart');
      return cartJson ? JSON.parse(cartJson) : new Cart();
    }
    return new Cart();
  }
}
