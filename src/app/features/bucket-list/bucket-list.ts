import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bucket-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bucket-list.html',
  styleUrl: './bucket-list.scss',
})
export class BucketList {

  bucket = {
    destination: '',
    place: '',
    type: '',
    priority: '',
    year: '',
    notes: ''
  };

  bucketList: any[] = [];

  addBucket() {
    if (!this.bucket.destination) return;

    this.bucketList.push({
      ...this.bucket,
      completed: false
    });

    this.bucket = {
      destination: '',
      place: '',
      type: '',
      priority: '',
      year: '',
      notes: ''
    };
  }

  markCompleted(index: number) {
    this.bucketList[index].completed = true;
  }

  removeBucket(index: number) {
    this.bucketList.splice(index, 1);
  }
}