import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Chef } from '../../models/chef';
import { ChefService } from '../../services/chef.service'

@Component({
  selector: 'app-chef-form',
  templateUrl: './chef-form.component.html',
  styleUrls: ['./chef-form.component.css']
})
export class ChefFormComponent implements OnInit {
  id: string;
  title: string;
  name: string;
  gender: string;
  email: string;
  address: string;
  phone: string;
  date: any;

  isNew: boolean = true;

  constructor(private chefService: ChefService, private toastr: ToastrService) { }

  ngOnInit() {
    this.chefService.selectedChef.subscribe(chef => {
      if (chef.id !== null) {
        this.isNew = false;
        this.id = chef.id;
        this.title = chef.title;
        this.name = chef.name;
        this.gender = chef.gender;
        this.email = chef.email;
        this.address = chef.address;
        this.phone = chef.phone;
        this.date = chef.date;
      }
    })
  }

  onSubmit() {
    if (this.isNew) {
      const newChef = {
        id: this.generateId(),
        title: this.title,
        name: this.name,
        gender: this.gender,
        email: this.email,
        address: this.address,
        phone: this.phone,
        date: new Date()
      }
      this.toastr.success('Chef successfully added!');
      setTimeout((() => {
        this.chefService.addChef(newChef)
      }), 1000)
    } else {
      const updChef = {
        id: this.id,
        title: this.title,
        name: this.name,
        gender: this.gender,
        email: this.email,
        address: this.address,
        phone: this.phone,
        date: new Date()
      }
      this.toastr.success('Chef successfully updated!');
      setTimeout((() => {
        this.chefService.updateChef(updChef)
      }), 1000)
    }

    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.id = '';
    this.title = '';
    this.name = '';
    this.gender = '';
    this.email = '';
    this.address = '';
    this.phone = '';
    this.date = '';
    this.chefService.clearState();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
