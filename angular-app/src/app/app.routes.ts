import { Routes } from '@angular/router';
import { RecipesOverviewComponent } from './recipes/recipes-overview/recipes-overview.component';
import { RecipeFormComponent } from './recipes/recipe-form/recipe-form.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RecipeDeleteComponent } from './recipes/recipe-delete/recipe-delete.component';

export const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesOverviewComponent, canActivate: [AuthGuard] },
  { path: 'recipes/add', component: RecipeFormComponent, canActivate: [AuthGuard] },
  { path: 'recipes/edit/:id', component: RecipeFormComponent, canActivate: [AuthGuard] },
  { path: 'recipes/delete/:id', component: RecipeDeleteComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
];
