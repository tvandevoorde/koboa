import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, pipe } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-recipe-delete',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatListModule],
  templateUrl: './recipe-delete.component.html',
  styleUrl: './recipe-delete.component.scss'
})
export class RecipeDeleteComponent {
  recipeId$ = this.route.params.pipe(map((params: any) => parseInt(params['id'], 10)));
  recipe$ = this.recipeId$.pipe(switchMap((id: number) => this.recipeService.getRecipeById(id)));

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onConfirm(): void {
    this.recipeId$.subscribe((id: number) => {
      this.recipeService.deleteRecipe(id).subscribe(() => {
        this.router.navigate(['/recipes']);
      });
    });
  }

  onCancel(): void {
    this.router.navigate(['/recipes']);
  }
}
