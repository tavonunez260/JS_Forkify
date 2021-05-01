import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

if(module.hot) {
  module.hot.accept();
}

const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    //To avoid not having any ID to load - guard clause
    if(!id) return;
    //0. Update results view to selected search result
    resultsView.update(model.getSearchResultsPage());
    //1. Update bookmarks
    bookmarksView.update(model.state.bookmarks);
    //2. Loading recipe
    await model.loadRecipe(id);
    //3. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch(err) {
    recipeView.renderError();
    console.error(err);
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

const controlServings = function(newServings) {
  //Update recipe servings (in state)
  model.updateServings(newServings);
  //Update the view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function() {
  //1. Add/delete bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //2. Update recipe view
  recipeView.update(model.state.recipe)
  //3. Render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks)
}

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init();
