import { test, expect, request } from '@playwright/test';
import { CocktailApi } from "../api/CocktailApi";
import { validCocktail, alcoholicIngredient, nonAlcoholicIngredient, invalidIngredient,invalidCocktail } from '../utils/Ingredients';
const cocktails = JSON.parse(JSON.stringify(require('../utils/cocktails.json')));

let cocktailApi: CocktailApi;

test.beforeAll(async() =>
{
  const apiContext = await request.newContext();
  cocktailApi = new CocktailApi(apiContext);
});

test.describe("GET Ingredients By Name", () =>
{  
  test("GET Alcoholic Ingredient - Vodka", async() =>
  {       
    await cocktailApi.assertApiResponseStatus(alcoholicIngredient, 200);
    await cocktailApi.assertIfIngredientPresent(alcoholicIngredient);
    await cocktailApi.assertIfIngredientIdPresent(alcoholicIngredient);
    await cocktailApi.assertIfAlcohol(alcoholicIngredient, "Yes");
    const abvIndicator = await cocktailApi.getAbvContent(alcoholicIngredient);        
    expect(abvIndicator).not.toBe(null);
        
  });

  test("GET Invalid Ingredient", async() =>
  {       
    await cocktailApi.assertApiResponseStatus(invalidIngredient, 200);  
    await cocktailApi.assertIfIngredientNotPresent(invalidIngredient);
  });
    
  test("GET Non-Alcoholic Ingredient - Water", async() =>
  {       
    await cocktailApi.assertApiResponseStatus(nonAlcoholicIngredient, 200);
    await cocktailApi.assertIfIngredientPresent(nonAlcoholicIngredient);
    await cocktailApi.assertIfIngredientIdPresent(nonAlcoholicIngredient);
    await cocktailApi.assertIfAlcohol(nonAlcoholicIngredient, "No");
    const abvIndicator = await cocktailApi.getAbvContent(nonAlcoholicIngredient);        
    expect(abvIndicator).toBe(null);
  });
});

test.describe("GET Cocktails By Name", () =>
{   
   
  for(let cocktail of cocktails)
  {
   test(`GET Cocktail Case Insensitive - ${cocktail.name}`, async() =>
   {
      await cocktailApi.assertApiResponseStatus(`${cocktail.name}`, 200);           
      await cocktailApi.assertCorrectDrinkPresent(`${cocktail.name}`);
      await cocktailApi.assertCorrectPropertiesPresent(`${cocktail.name}`);            
   });
  }

  test("GET Invalid Cocktail", async() =>
  {
    await cocktailApi.assertApiResponseStatus(invalidCocktail, 200);
    await cocktailApi.assertIfCocktailNotPresent(invalidCocktail);
  });

  test("Valildate API Schema", async() =>
  {
    await cocktailApi.validateApiSchema(validCocktail);
  });    
});


   