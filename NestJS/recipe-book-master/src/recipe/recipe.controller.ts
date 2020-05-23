import { Controller, Get, Post, Body, Put, Query, NotFoundException, Delete, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDTO } from './dto/create-recipe.dto';
import { GetRecipesFilterDTO } from './dto/get-recipes-filter.dto';

@Controller('recipe')
export class RecipeController {
    constructor(private recipeService: RecipeService) { }

    // add a recipe
    @Post('/create')
    @UsePipes(ValidationPipe)
    async addRecipe(@Body() createRecipeDTO: CreateRecipeDTO) {
        const recipe = await this.recipeService.addRecipe(createRecipeDTO);
        return recipe;
    }

    // Retrieve recipes list
    @Get('recipes')
    async getRecipes(@Query(ValidationPipe) filterDTO: GetRecipesFilterDTO) {
      if (Object.keys(filterDTO).length) {
        const filteredRecipes = await this.recipeService.getFilteredRecipes(filterDTO);
        return filteredRecipes;
      } else {
        const allRecipes = await this.recipeService.getAllRecipes();
        return allRecipes;
      }

    }

    // Fetch a particular recipe using ID
    @Get('/:recipeID')
    async getRecipe(@Param('recipeID') recipeID) {
        const recipe = await this.recipeService.getRecipe(recipeID);
        if (!recipe) throw new NotFoundException('Recipe does not exist!');
        return recipe;
    }

    // Update a recipe's details
    @Put('/update/:recipeID')
    async updateRecipe(@Param('recipeID') recipeID, @Body() createRecipeDTO: CreateRecipeDTO) {
        const recipe = await this.recipeService.updateRecipe(recipeID, createRecipeDTO);
        if (!recipe) throw new NotFoundException('Recipe does not exist!');
        return recipe;
    }
    
    // Delete a recipe
    @Delete('/delete/:recipeID')
    async deleteRecipe(@Param('recipeID') recipeID) {
        const recipe = await this.recipeService.deleteRecipe(recipeID);
        if (!recipe) throw new NotFoundException('Recipe does not exist');
        return recipe;
    }
}