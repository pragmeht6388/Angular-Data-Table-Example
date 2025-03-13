import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../country.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {


  isModalVisible = false; 
  users:any[]=[];

constructor(private service:CountryService){}
  ngOnInit(): void {
    this.loadUsers();
  }


    loadUsers(){
      this.service.getUsers().subscribe(
        (data)=>{
            this.users=data
        }
        
      )
    }
    
  // row = [
  //   {
  //     id : '1',
  //     name: 'ganesh',
  //     email: 'ganesh@gmail.com'
  //   },
  //   {
  //     id : '2',
  //     name: 'gana',
  //     email: 'ganesh@gmail.com'
  //   },
  //   {
  //     id : '3',
  //     name: 'gana',
  //     email: 'ganesh@gmail.com'
  //   }
  // ];


  
  addTable() {
    const obj = {
      id: '4',
      name: 'saumya',
      email: 'saumya@gmail.com'
    }
    this.users.push(obj)
  }
  
//   deleteRow(x:any){
//     var delBtn = confirm(" Do you want to delete ?");
//     if ( delBtn == true ) {
//       this.row.splice(x, 1 );
//     }   
// }

rowIndexToDelete: number | null = null; // To store the index of the row to delete

// Function to open the modal
openDeleteModal(index: number): void {
  this.isModalVisible = true;
  this.rowIndexToDelete = index; // Set the row index to delete
}

// Function to delete the row
// deleteRow(): void {
//   if (this.rowIndexToDelete !== null) {
//     this.users.splice(this.rowIndexToDelete, 1); // Remove the row
//   }
//   this.closeModal(); // Close the modal
// }
deleteRow(index: number): void {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // Delete the row if confirmed
      this.users.splice(index, 1);

      swalWithBootstrapButtons.fire({
        title: 'Deleted!',
        text: 'The row has been deleted.',
        icon: 'success'
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: 'Cancelled',
        text: 'The row is safe.',
        icon: 'error'
      });
    }
  });

// Function to close the modal without deleting
// cancelDelete(): void {
//   this.closeModal();
// }

// // Function to hide the modal
// private closeModal(): void {
//   this.isModalVisible = false;
//   this.rowIndexToDelete = null;
// }
}
}