import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Option {
  label: string;
  icon: string;
}

interface Question {
  id: number;
  title: string;
  options: Option[];
}
@Component({
  selector: 'app-questionnaire',
  imports: [],
  templateUrl: './questionnaire.html',
  styleUrl: './questionnaire.scss',
})
export class Questionnaire {

  currentStep = 0;
  answers: { [key: number]: string } = {};
  finalDestination: string | null = null;



  questions: Question[] = [
    {
      id: 1,
      title: 'What kind of traveler are you?',
      options: [
        { icon: '🌄', label: 'Nature Lover' },
        { icon: '🏖', label: 'Beach Person' },
        { icon: '🏙', label: 'City Explorer' },
        { icon: '🛕', label: 'Culture Seeker' }
      ]
    },
    {
      id: 2,
      title: 'What is your travel budget (per person)?',
      options: [
        { icon: '💰', label: 'Under ₹10,000' },
        { icon: '💰', label: '₹10,000 – ₹25,000' },
        { icon: '💰', label: '₹25,000 – ₹50,000' },
        { icon: '💰', label: '₹50,000+' }
      ]
    },
    {
      id: 3,
      title: 'How many days do you plan to travel?',
      options: [
        { icon: '📆', label: '2–3 Days' },
        { icon: '📆', label: '4–6 Days' },
        { icon: '📆', label: '7–10 Days' },
        { icon: '📆', label: '10+ Days' }
      ]
    },
    {
      id: 4,
      title: 'When do you want to travel?',
      options: [
        { icon: '🌞', label: 'Summer' },
        { icon: '🌧', label: 'Monsoon' },
        { icon: '❄', label: 'Winter' },
        { icon: '📅', label: 'Flexible' }
      ]
    },
    {
      id: 5,
      title: 'Who are you traveling with?',
      options: [
        { icon: '🧍', label: 'Solo' },
        { icon: '👫', label: 'Couple' },
        { icon: '👨‍👩‍👧', label: 'Family' },
        { icon: '🧑‍🤝‍🧑', label: 'Friends' }
      ]
    },
    {
      id: 6,
      title: 'What pace do you prefer?',
      options: [
        { icon: '🐢', label: 'Relaxed' },
        { icon: '⚖', label: 'Balanced' },
        { icon: '⚡', label: 'Fast & Adventurous' }
      ]
    },
    {
      id: 7,
      title: 'Which activities excite you most?',
      options: [
        { icon: '🏞', label: 'Trekking' },
        { icon: '🏖', label: 'Beaches' },
        { icon: '🍲', label: 'Food & Cafes' },
        { icon: '🎢', label: 'Adventure Sports' }
      ]
    },
    {
      id: 8,
      title: 'Do you prefer crowded or peaceful places?',
      options: [
        { icon: '😌', label: 'Peaceful' },
        { icon: '🎉', label: 'Lively' },
        { icon: '⚖', label: 'Mix of both' }
      ]
    },
    {
      id: 9,
      title: 'How do you prefer to travel?',
      options: [
        { icon: '🚆', label: 'Train' },
        { icon: '✈', label: 'Flight' },
        { icon: '🚗', label: 'Road Trip' }
      ]
    },
    {
      id: 10,
      title: 'What matters most to you?',
      options: [
        { icon: '💸', label: 'Budget Friendly' },
        { icon: '🏨', label: 'Comfort' },
        { icon: '📸', label: 'Experiences' }
      ]
    }
  ];

  selectedOption: any = null;

selectOption(option: any) {
  this.selectedOption = option;
  this.answers[this.questions[this.currentStep].id] = option.label;
}

getBestDestination(): string {

  const scores: any = {
    'Himachal Pradesh': 0,
    'Goa': 0,
    'Rajasthan': 0,
    'Kerala': 0,
    'Uttarakhand': 0,
    'Sikkim': 0,
    'Ladakh': 0,
    'Meghalaya': 0,
    'Karnataka': 0,
    'Tamil Nadu': 0
  };

  // Traveler Type
  if (this.answers[1] === 'Nature Lover') {
    scores['Himachal Pradesh'] += 2;
    scores['Uttarakhand'] += 2;
    scores['Sikkim'] += 2;
    scores['Meghalaya'] += 2;
  }

  if (this.answers[1] === 'Beach Person') {
    scores['Goa'] += 3;
    scores['Kerala'] += 2;
    scores['Tamil Nadu'] += 2;
  }

  if (this.answers[1] === 'City Explorer') {
    scores['Karnataka'] += 2;
    scores['Tamil Nadu'] += 2;
    scores['Rajasthan'] += 2;
  }

  if (this.answers[1] === 'Culture Seeker') {
    scores['Rajasthan'] += 3;
    scores['Tamil Nadu'] += 2;
    scores['Karnataka'] += 2;
  }

  // Budget
  if (this.answers[2] === 'Under ₹10,000') {
    scores['Uttarakhand'] += 1;
    scores['Meghalaya'] += 1;
  }

  if (this.answers[2] === '₹50,000+') {
    scores['Ladakh'] += 2;
    scores['Kerala'] += 1;
  }

  // Adventure Activities
  if (this.answers[7] === 'Adventure Sports') {
    scores['Ladakh'] += 3;
    scores['Himachal Pradesh'] += 2;
  }

  if (this.answers[7] === 'Trekking') {
    scores['Sikkim'] += 2;
    scores['Uttarakhand'] += 2;
  }

  if (this.answers[7] === 'Beaches') {
    scores['Goa'] += 3;
  }

  // Find highest score
  return Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );
}

restartQuiz() {
  this.currentStep = 0;
  this.selectedOption = null;
  this.answers = {};
  this.finalDestination = null;
}


nextQuestion() {

  if (!this.selectedOption) return;

  if (this.currentStep < this.questions.length - 1) {
    this.currentStep++;
    this.selectedOption = null;
  } else {
    this.finalDestination = this.getBestDestination();
  }
}


}



