import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

if(module.hot) {
  module.hot.accept();
}

const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    //To avoid not having any ID to load - guard clause
    if(!id) return;
    //1. Loading recipe
    await model.loadRecipe(id);
    //2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch(err) {
    recipeView.renderError()
  } 
}

const controlSearchResults = async function() {
  try {
    //1. Get query from from
    const query = searchView.getQuery();
    if (!query) return;
    //2. Load results
    await model.loadSearchResults(query);
    //3. Render results
    resultsView.render(model.getSearchResultsPage());
    //4. Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch(err) {
    console.error(err);
  }
}

const controlPagination = function(goToPage) {
  //1. Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  //2. Render new pagination buttons
  paginationView.render(model.state.search);
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init();