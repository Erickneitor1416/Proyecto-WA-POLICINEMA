import { Component } from '@angular/core';

@Component({
  selector: 'app-add-review-body',
  templateUrl: './add-review-body.component.html',
  styleUrls: ['./add-review-body.component.scss']
})
export class AddReviewBodyComponent {

  modalOpen = false;
  feedback: string = ''
  rating: number = 0;

  saveForm() {
    // Perform logic to save the form data
    console.log('Rating:', this.rating);
    console.log('Feedback:', this.feedback);
    // Close the modal
    this.modalOpen = false;
  }
}
