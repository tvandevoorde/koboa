import { Component } from '@angular/core';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipes-overview',
  imports: [RecipeListComponent, MatButtonModule],
  templateUrl: './recipes-overview.component.html',
  styleUrl: './recipes-overview.component.scss'
})
export class RecipesOverviewComponent {
  constructor(private router: Router) {}

  onAddRecipe(): void {
    this.router.navigate(['/recipes/add']); // Navigeer naar het formulier voor het toevoegen van een recept
  }
}
