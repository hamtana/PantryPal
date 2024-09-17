from django.urls import path

from . import views

urlpatterns = [
    path("", views.index_page, name="index"),
    path("createAccount", views.index_page, name="create_account"),
    path("createRecipe", views.index_page, name="create_account"),
    path("savedRecipe", views.index_page, name="saved_recipe"),
    path("showRecipe", views.index_page, name="show_recipe"),
    path("saveRecipe", views.index_page, name="save_recipe"),
    path("api/login/", views.api_login, name="api_login"),
    path("api/aiRecipe/<str:baking_type>", views.ai_recipe, name="ai_recipe"),
    path("api/session/", views.session_view, name="api_session"),
    path("api/whoami/", views.whoami_view, name="api_whoami"),
    path("api/logout/", views.logout_view, name="api_logout"),
    path("api/deleteAccount/", views.delete_account_view, name="api_delete_account"),
    path("api/createIngredient/", views.create_ingredient, name="api_create_ingredient"),
    path("api/createAccount/", views.create_account, name="create_account"),
    path("api/getIngredients/", views.get_user_ingredients, name="api_get_ingredients"),
    path("api/deleteIngredient/<int:ingredient_id>", views.delete_ingredient_view, name="api_delete_ingredients"),
    path("api/editIngredient/<int:ingredient_id>", views.edit_ingredient_view, name="api_edit_ingredient"),
    path("api/createRecipe/", views.create_recipe, name="api_create_recipe"),
    path("api/getRecipes/", views.get_user_recipes, name="api_get_recipes"),
    path("api/saveRecipe/", views.save_recipe, name="api_save_recipe"),
]
