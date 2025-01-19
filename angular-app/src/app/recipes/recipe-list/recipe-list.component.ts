import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss'],
    imports: [CommonModule, MatButtonModule, MatTableModule, MatIconModule, RouterModule]
})
export class RecipeListComponent implements OnInit {
    columnsToDisplay = ['title', 'description', 'actions'];
    recipes: any[] = [];

    constructor(private recipeService: RecipeService) {}

    ngOnInit(): void {
        this.recipeService.getRecipes().subscribe(data => {
            this.recipes = data;
        });
    }
}
