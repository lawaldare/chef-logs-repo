import { Injectable } from '@angular/core';
import { Chef } from '../models/chef';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs'
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  chefs: Chef[];

  private chefSource = new BehaviorSubject<Chef>({
    id: null,
    title: null,
    name: null,
    gender: null,
    email: null,
    address: null,
    phone: null,
    date: null
  })
  selectedChef = this.chefSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    this.chefs = [];
  }

  getChefs(): Observable<Chef[]> {
    if (localStorage.getItem('chefs') === null) {
      this.chefs = []
    } else {
      this.chefs = JSON.parse(localStorage.getItem('chefs'));
    }
    return of(this.chefs.sort((a, b) => {
      return b.date - a.date;
    }))
  }

  setFormChef(chef: Chef) {
    this.chefSource.next(chef);
  }

  addChef(chef: Chef) {
    this.chefs.unshift(chef);
    localStorage.setItem('chefs', JSON.stringify(this.chefs))
  }

  updateChef(chef: Chef) {
    this.chefs.forEach((currentChef, index) => {
      if (chef.id === currentChef.id) {
        this.chefs.splice(index, 1);
      }
    })
    this.chefs.unshift(chef);
    localStorage.setItem('chefs', JSON.stringify(this.chefs))
  }

  deleteLog(chef: Chef) {
    this.chefs.forEach((currentChef, index) => {
      if (chef.id === currentChef.id) {
        this.chefs.splice(index, 1);
      }
    })
    localStorage.setItem('chefs', JSON.stringify(this.chefs))
  }

  clearState() {
    this.stateSource.next(true);
  }
}
