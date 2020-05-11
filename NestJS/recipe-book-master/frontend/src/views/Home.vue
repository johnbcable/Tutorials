<template>
  <div>
    <div class="container w-50 p-3">
      <div class="d-flex justify-content-between">
        <h3>Recipe Book</h3>
        <button type="button" class="btn btn-secondary btn-sm h-25 mt-1" @click="createRecipe">
          <span class="mr-2">
            <i class="fa fa-plus"></i>
          </span>Create recipe
        </button>
      </div>
      <hr class="mt-0" />

      <form>
        <div class="form-group row">
          <div class="col-6">
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <i class="fa fa-search"></i>
                </div>
              </div>
              <input id="text2" name="text2" type="text" class="form-control form-control-sm" v-model.trim="search" @keyup="fetchRecipes" />
            </div>
          </div>
          <div class="col-6">
            <select class="custom-select custom-select-sm" v-model="category" @change="fetchRecipes">
              <option selected>All</option>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
            </select>
          </div>
        </div>
      </form>

      <div class="card" v-for="recipe in recipes" :key="recipe._id">
        <div class="card-header d-flex justify-content-between p-1">
          <div>
            <span class="badge badge-primary">{{recipe.category}}</span>
          </div>
          <div>
            <a href="#" class="btn btn-light btn-sm" @click="editRecipe(recipe._id)">
              <i class="fa fa-edit"></i>
            </a>
            <a href="#" class="btn btn-light btn-sm" @click="deleteRecipe(recipe._id)">
              <i class="fa fa-trash"></i>
            </a>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{recipe.title}}</h5>
          <p
            class="card-text"
          >{{recipe.description}}</p>
          <button type="button" class="btn btn-light" data-toggle="collapse" :data-target="'#collapse' + recipe._id">
            Show recipe details</button>
          <div class="collapse" :id="'collapse' + recipe._id">
          <div class="card mt-3">
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(ingredient, index) in recipe.ingredients" :key="index">{{ingredient}}</li>
              </ul>
              <p
                class="card-text mt-3"
              >{{recipe.instructions}}</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { server } from "../helper";
import axios from "axios";
import router from '../router';

export default {
  data() {
    return {
      recipes: [],
      search: "",
      category: "All"
    };
  },
  created() {
    this.fetchRecipes();
  },
  methods: {
    fetchRecipes() {
      let route = "";
      if (!this.search && this.category == "All") {
        route = "recipes";
      } else if (this.search && this.category == "All") {
        route = `recipes?search=${this.search}`;
      } else if (!this.search && this.category != "All") {
        route = `recipes?category=${this.category}`;
      } else if (this.search && this.category != "All") {
        route = `recipes?search=${this.search}&category=${this.category}`;
      }
      axios
        .get(`${server.baseURL}/recipe/${route}`)
        .then(data => (this.recipes = data.data));
    },
    createRecipe() {
      router.push({name: 'create'});
    },
    editRecipe(id) {
      router.push({name: 'edit', params: {id} });
    },
    deleteRecipe(id) {
      axios
        .delete(`${server.baseURL}/recipe/delete/${id}`)
        .then(() => {
          window.location.reload();
        });
    },

  }
};
</script>
