import { Routes } from '@angular/router';
import { AddEmployee } from './pages/add-employee/add-employee';
import { Home } from './pages/home/home';
import { TeamPage } from './pages/team-page/team-page';
import { Labo } from './pages/labo/labo';

export const routes: Routes = [
  // title : le titre de l'onglet, différent pour chaque page.
  { path: '', title: 'Accueil | TechCorp Équipe', component: Home },
  { path: 'equipe', title: 'Équipe | TechCorp Équipe', component: TeamPage },
  { path: 'ajouter', title: 'Ajouter un collègue | TechCorp Équipe', component: AddEmployee },
  { path: 'labo', title: 'Laboratoire | TechCorp Équipe', component: Labo },
  // Toute autre adresse renvoie vers l'accueil. Toujours en dernier.
  { path: '**', redirectTo: '' },
];
