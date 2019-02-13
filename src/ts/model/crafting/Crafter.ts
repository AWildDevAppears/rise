import Recipe from '../crafting/Recipe';
import Item from '../abstract/Item';

export default class Crafter {
    recipes: Recipe[];

    craft(recipe: Recipe, ingredients: Item[]): false | Item {
        const requiredIngredients = recipe.ingredients.map((item: Item) => item.id);
        const givenIngredients = ingredients.map((item: Item) => item.id);

        const isMissingIngredients = requiredIngredients.some(item => {
            return givenIngredients.indexOf(item) === -1;
        });

        if (isMissingIngredients) {
            return false;
        }

        return recipe.output;
    }
}
