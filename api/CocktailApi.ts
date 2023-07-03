import { APIRequestContext, expect } from "@playwright/test";
import { cocktailSchema } from "../utils/ApiSchema";


export class CocktailApi 
{
    readonly apiContext: APIRequestContext;    
    readonly apiUrl: string;

    constructor(apiContext: APIRequestContext)
    {
        this.apiContext = apiContext;
        this.apiUrl = "https://thecocktaildb.com/api/json/v1/1/search.php?"
    }

    private async getApiResponse(parameter:string)
    {
        const response = await this.apiContext.get(`${this.apiUrl}${parameter}`)
        return response
    }

    private async getApiResponseBody(parameter:string)
    {
        const reponse = await this.getApiResponse(`${parameter}`);
        const responseBody = JSON.parse(await reponse.text());
        return responseBody;
    }

    async assertApiResponseStatus(name: string, status: number)
    {
        const response = await this.getApiResponse(`i=${name}`);
        expect(response.status()).toBe(status);
    }
    

    async assertIfIngredientPresent(name: string)
    {
        const responseBody = await this.getApiResponseBody(`i=${name}`);
        const ingredient = responseBody['ingredients'][0].strIngredient
        expect(ingredient).toBe(name);
    }

    async assertIfIngredientIdPresent(name: string)
    {
        const responseBody = await this.getApiResponseBody(`i=${name}`);
        const ingredientId = responseBody['ingredients'][0].idIngredient
        expect(ingredientId).not.toBe(null);
    }

    async assertIfCocktailNotPresent(name: string)
    {
        const responseBody = await this.getApiResponseBody(`s=${name}`);
        expect(responseBody['drinks']).toBe(null);
    }

    async assertIfIngredientNotPresent(name: string)
    {
        const responseBody = await this.getApiResponseBody(`i=${name}`);
        expect(responseBody['ingredients']).toBe(null);
    }

    async assertIfAlcohol(name: string, indicator: string)
    {
        const responseBody = await this.getApiResponseBody(`i=${name}`);
        const alcoholIndicator = responseBody['ingredients'][0].strAlcohol        
        expect(alcoholIndicator).toBe(indicator);       
    }

    async getAbvContent(name: string)
    {
        const responseBody = await this.getApiResponseBody(`i=${name}`);
        const abvIndicator = responseBody['ingredients'][0].strABV
        return abvIndicator;
    }

    async assertCorrectDrinkPresent(name: string)
    {
        const responseBody = await this.getApiResponseBody(`s=${name}`);
        const drink = responseBody['drinks'][0].strDrink
        expect(drink).toBe("Margarita");
    }

    async assertCorrectPropertiesPresent(name: string)
    {
        const responseBody = await this.getApiResponseBody(`s=${name}`);
        const drinks = responseBody['drinks'];
        let pass = true;
        for (const drink of drinks) {
            if (
              !drink.hasOwnProperty('strDrink') ||
              !drink.hasOwnProperty('strTags') ||
              !drink.hasOwnProperty('strCategory') ||
              !drink.hasOwnProperty('strAlcoholic') ||
              !drink.hasOwnProperty('strGlass') ||
              !drink.hasOwnProperty('strInstructions')
            ) {
              pass = false;
              console.log('Required properties are missing for drink:', drink);
            }
          }
         expect(pass).toBe(true);
    }

    async validateApiSchema(name: string)
    {
        const reponse = await this.getApiResponse(`s=${name}`);
        const responseBody = await reponse.json();
        expect(() => cocktailSchema.parse(responseBody)).not.toThrow(); 
    }
}