import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { Signup } from './features/auth/signup/signup';
import { Login } from './features/auth/login/login';
import { Questionnaire } from './features/questionnaire/questionnaire';
import { Recommendations } from './features/recommendations/recommendations';
import { Itinerary } from './features/itinerary/itinerary';

export const routes: Routes = [
  {
    path: '',
    component: Landing
  },
  {
    path: 'signup',
    component: Signup

  },
   {
    path: 'login',
    component: Login

  },

{
  path :'questions',
  component: Questionnaire
},
{
  path :'aiRecommendation',
component: Recommendations
},
{
  path : 'itenary',
  component : Itinerary
},
{
  path : 'map-planner',
  loadComponent: () => import('./features/map-planner/map-planner').then(m => m.MapPlanner)
},
{  path : 'bucketList',
  loadComponent: () => import('./features/bucket-list/bucket-list').then(m => m.BucketList)
}
];
