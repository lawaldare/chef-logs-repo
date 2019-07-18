import { Component, OnInit } from '@angular/core';
import { Chef } from '../../models/chef';
import { ChefService } from '../../services/chef.service'
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { timer } from 'rxjs';


@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.css']
})
export class ChefsComponent implements OnInit {

  chefs: Chef[];
  selectedChef: Chef;
  loaded: boolean = false;

  constructor(private chefService: ChefService, private toastr: ToastrService) { }

  ngOnInit() {

    this.chefService.stateClear.subscribe(clear => {
      if (clear) {
        this.selectedChef = {
          id: '',
          title: '',
          name: '',
          gender: '',
          email: '',
          address: '',
          phone: '',
          date: ''
        }
      }
    })

    setTimeout((() => {
      this.chefService.getChefs().subscribe(chefs => {
        this.chefs = chefs
        this.loaded = true;
      })
    }), 2000)
  }

  onSelect(chef: Chef) {
    this.chefService.setFormChef(chef);
    this.selectedChef = chef;
  }

  onDelete(chef: Chef) {
    // if (confirm('Are you sure?')) {
    //   this.chefService.deleteLog(chef);
    //   this.toastr.error('chef deleted successfully');

    // }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.chefService.deleteLog(chef);
        this.toastr.error('chef deleted successfully');
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

}


