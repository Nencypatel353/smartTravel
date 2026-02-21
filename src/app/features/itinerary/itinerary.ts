import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './itinerary.html',
  styleUrl: './itinerary.scss',
})
export class Itinerary {

  /* ===========================
     STATES & UNION TERRITORIES
  ============================ */
  statesAndUTs: string[] = [
    // States (28)
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',

    // Union Territories (8)
    'Andaman & Nicobar Islands',
    'Chandigarh',
    'Dadra & Nagar Haveli and Daman & Diu',
    'Delhi',
    'Jammu & Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry'
  ];

  /* ===========================
     USER SELECTIONS
  ============================ */
  selectedState: string = 'Rajasthan';
  days: number = 5;
  pace: string = 'Balanced';

  paceOptions: string[] = ['Relaxed', 'Balanced', 'Packed'];

  itinerary: {
    city: string;
    activities: string[];
  }[] = [];

  /* ===========================
     STATE → CITY MAPPING
     (Core AI Simulation)
  ============================ */
  private stateCityMap: Record<string, string[]> = {
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur'],
    'Kerala': ['Kochi', 'Munnar', 'Alleppey'],
    'Goa': ['North Goa', 'South Goa'],
    'Himachal Pradesh': ['Manali', 'Kasol', 'Dharamshala'],
    'Uttarakhand': ['Rishikesh', 'Mussoorie', 'Nainital'],
    'Maharashtra': ['Mumbai', 'Lonavala', 'Pune'],
    'Karnataka': ['Bengaluru', 'Coorg', 'Hampi'],
    'Tamil Nadu': ['Chennai', 'Ooty', 'Madurai'],
    'Gujarat': ['Ahmedabad', 'Gir', 'Kutch'],
    'West Bengal': ['Kolkata', 'Darjeeling', 'Sundarbans'],
    'Delhi': ['New Delhi', 'Old Delhi'],
    'Ladakh': ['Leh', 'Nubra Valley'],
    'default': ['City Highlights']
  };

  /* ===========================
     GENERATE ITINERARY
  ============================ */
  generateItinerary(): void {
    this.itinerary = [];

    const cities =
      this.stateCityMap[this.selectedState] ||
      this.stateCityMap['default'];

    for (let i = 0; i < this.days; i++) {
      const city = cities[i % cities.length];

      this.itinerary.push({
        city,
        activities: this.getActivitiesByPace(city)
      });
    }
  }

  /* ===========================
     ACTIVITY LOGIC BY PACE
  ============================ */
  private getActivitiesByPace(city: string): string[] {
    const baseActivities = [
      `Explore top attractions in ${city}`,
      'Local cuisine experience 🍴',
      'Evening leisure walk'
    ];

    if (this.pace === 'Packed') {
      return [
        ...baseActivities,
        'Cultural landmark visit 🏛',
        'Night market / street walk 🌙'
      ];
    }

    if (this.pace === 'Relaxed') {
      return baseActivities.slice(0, 2);
    }

    return baseActivities;
  }

  /* ===========================
     DRAG & DROP
  ============================ */
  drop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(
      this.itinerary,
      event.previousIndex,
      event.currentIndex
    );
  }

  exportPDF(): void {
  import('jspdf').then((module) => {
    const jsPDF = module.default;
    const pdf = new jsPDF();

    let y = 15;

    // Title
    pdf.setFontSize(18);
    pdf.text('Personalized Travel Itinerary 🇮🇳', 14, y);
    y += 10;

    pdf.setFontSize(12);
    pdf.text(
      `State / UT: ${this.selectedState} | Duration: ${this.days} Days | Pace: ${this.pace}`,
      14,
      y
    );
    y += 12;

    // Divider
    pdf.line(14, y, 196, y);
    y += 8;

    // Days
    this.itinerary.forEach((day, index) => {
      // Page break check
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }

      // Day Header
      pdf.setFontSize(14);
      pdf.text(`Day ${index + 1} – ${day.city}`, 14, y);
      y += 8;

      // Activities
      pdf.setFontSize(11);
      day.activities.forEach((activity: string) => {
        if (y > 280) {
          pdf.addPage();
          y = 20;
        }
        pdf.text(`• ${activity}`, 18, y);
        y += 6;
      });

      y += 6;
    });

    // Save
    pdf.save(`${this.selectedState}-Itinerary.pdf`);
  });
}

}
