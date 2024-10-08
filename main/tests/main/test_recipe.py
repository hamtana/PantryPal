
@pytestPantryPal
def test_save_recipe(user_factory):
    c = Client()
    url = reverse("api_save_recipe")
    assert c.post(url).status_code == 401 # Not logged in

    user = user_factory(username="dave", password=make_password("password123"))
    c.force_login(user)

    response = c.post(
        url,
        json.dumps({
            "recipeName": "Cheese Scones",
            "recipe": "Two Cups of Flour, One Cup of Cheese, 3 x Eggs"
        }),
        content_type='application/json'
    )

    assert response.status_code == 201
    assert len(Recipe.objects.filter(recipeName="Cheese Scones", recipe="Two Cups of Flour, One Cup of Cheese, 3 x Eggs")) == 1