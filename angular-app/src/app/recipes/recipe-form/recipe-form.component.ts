import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'

})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  isEditMode: boolean = false;
  recipeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      instructions: ['', Validators.required],
      prep_time: [0, [Validators.required, Validators.min(0)]],
      cook_time: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.recipeId = +params['id'];
        this.loadRecipe(this.recipeId);
      }
    });
  }

  loadRecipe(recipeId: number): void {
    this.recipeService.getRecipeById(recipeId).subscribe((recipe) => {
      this.recipeForm.patchValue(recipe);
    });
  }

  onSubmit(): void {
    if (this.recipeForm.invalid) return;

    const recipeData = this.recipeForm.value;

    if (this.isEditMode && this.recipeId !== null) {
      this.recipeService.updateRecipe(this.recipeId, recipeData).subscribe(() => {
        this.router.navigate(['/recipes']); // Redirect na bewerking
      });
    } else {
      this.recipeService.createRecipe(recipeData).subscribe(() => {
        this.router.navigate(['/recipes']); // Redirect na toevoegen
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/recipes']);
  }
}
