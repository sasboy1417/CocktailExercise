import { test, expect, request } from '@playwright/test';
import { CocktailApi } from "../api/CocktailApi";
import { cocktailSchema } from "../utils/ApiSchema";


let cocktailApi: CocktailApi;

test.beforeAll(async() =>
{
    const apiContext = await request.newContext();
    cocktailApi = new CocktailApi(apiContext);
});

test.describe("GET Ingredients By Name", () =>{  

    test("GET Alcoholic Ingredient - Vodka", async() =>
    {       
        const response = await cocktailApi.getApiResponse("i=vodka");
        expect(response.status()).toBe(200);
        await cocktailApi.assertIfIngredientPresent("Vodka");
        await cocktailApi.assertIfIngredientIdPresent("vodka")
        await cocktailApi.assertIfAlcohol("Vodka", "Yes");
        const abvIndicator = await cocktailApi.getAbvContent("Vodka");        
        expect(abvIndicator).not.toBe(null);
        
    });

    test("GET Invalid Ingredient", async() =>
    {       
        const response = await cocktailApi.getApiResponse("i=vodca");
        expect(response.status()).toBe(200);
        await cocktailApi.assertIfIngredientNotPresent("vodca");
    });
    
    test("GET Non-Alcoholic Ingredient - Water", async() =>
    {       
        const response = await cocktailApi.getApiResponse("i=water");
        expect(response.status()).toBe(200);
        await cocktailApi.assertIfIngredientPresent("Water");
        await cocktailApi.assertIfAlcohol("Water", "No");
        const abvIndicator = await cocktailApi.getAbvContent("Water");        
        expect(abvIndicator).toBe(null);
    });
});

test.describe("GET Cocktails By Name", () =>
{    
    const cocktails = ["margarita", "Margarita", "MARGARITA", "mArGaRiTa"];
    for(let cocktail of cocktails)
    {
        test(`GET Cocktail Case Insensitive - ${cocktail}`, async() =>
        {
            const response = await cocktailApi.getApiResponse(`s=${cocktail}`);
            expect(response.status()).toBe(200);           
            await cocktailApi.assertCorrectDrinkPresent(`${cocktail}`);
            await cocktailApi.assertCorrectPropertiesPresent(`${cocktail}`);            
        });
    }

    test("GET Invalid Cocktail", async() =>
    {
        const response = await cocktailApi.getApiResponse("s=margerita");
        expect(response.status()).toBe(200);
        await cocktailApi.assertIfCocktailNotPresent("margerita");
    });

    test("Valildate Schema", async() =>
    {
        const response = await cocktailApi.getApiResponse("s=margarita");
        const responseBody = await response.json();       ;
        expect(() => cocktailSchema.parse(responseBody)).not.toThrow();           
    });

    
});


   