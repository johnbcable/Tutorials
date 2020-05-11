<template>
  <div>
    <div class="container p-3 w-50">
      <h4>Edit recipe</h4>
      <hr />
      <form id="edit-recipe-form" @submit.prevent="editRecipe">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" v-model="recipe.title" class="form-control" id="title" name="title" />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea class="form-control" id="description" name="description" v-model="recipe.description" rows="2"></textarea>
        </div>

            <input type="radio" id="breakfast" value="Breakfast" v-model="recipe.category" /> Breakfast
  
            <input type="radio" id="lunch" value="Lunch" v-model="recipe.category" /> Lunch

            <input type="radio" id="dinner" value="Dinner" v-model="recipe.category" /> Dinner

        <p class="mt-3">Ingredients</p>

        <div id="ingredients" class="input-group">
          <input type="text" class="form-control" v-model="newIngredient" />
          <div class="input-group-append">
            <button type="button" class="btn btn-primary" @click="addIngredient">
              <span class="mr-2">
                <i class="fa fa-plus"></i>
              </span>Add ingredient
            </button>
          </div>
        </div>

        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="(ingredient, index) in recipe.ingredients" :key="index">{{ingredient}}<a href="#" class="btn btn-light btn-sm" @click="recipe.ingredients.splice(index, 1)">
              <i class="fa fa-trash"></i>
            </a></li>
        </ul>

        <div class="form-group mt-3">
          <label for="instructions">Instructions</label>
          <textarea class="form-control" id="instructions" name="instructions" v-model="recipe.instructions" rows="4"></textarea>
        </div>

        <div class="form-group d-flex justify-content-end">
          <button type="button" class="btn btn-secondary btn-sm mr-2 w-25" @click="cancel">Cancel</button>
          <button type="submit" class="btn btn-primary btn-sm w-25">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import { server } from "../../helper";
import router from "../../router";

export default {
  data() {
    return {
      id: 0,
      recipe: {},

      newIngredient: "",
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getRecipe();
  },
  methods: {
    editRecipe() {
      let recipeData = {
        title: this.recipe.title,
        description: this.recipe.description,
        category: this.recipe.category,
        ingredients: this.recipe.ingredients,
        instructions: this.recipe.instructions
      };
      axios
        .put(
          `${server.baseURL}/recipe/update/${this.id}`,
          recipeData
        )
        .then(() => {
          router.push({ name: "home" });
        });
    },
    getRecipe() {
      axios
        .get(`${server.baseURL}/recipe/${this.id}`)
        .then(data => (this.recipe = data.data));
    },
    addIngredient() {
      if (this.newIngredient != ""){
        this.recipe.ingredients.push(this.newIngredient);
      }
      this.newIngredient = "";
    },
    cancel() {
      router.push({ name: "home" });
    }
  }
};
</script>