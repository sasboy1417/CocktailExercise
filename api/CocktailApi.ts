import { APIRequestContext, expect } from "@playwright/test";

export class CocktailApi 
{
    readonly apiContext: APIRequestContext;
    readonly apiUrl: string;

    constructor(apiContext: APIRequestContext)
    {
        this.apiContext = apiContext;
        this.apiUrl = "https://thecocktaildb.com/api/json/v1/1/search.php?"
    }

     async getApiResponse(parameter:string)
    {
        const response = await this.apiContext.get(`${this.apiUrl}${parameter}`)
        return response
    }

    async assertApiResponseStatus(name: string, status: number)
    {
        const response = await this.getApiResponse(name);
        expect(response.status()).toBe(status);
    }
    

    async assertIfIngredientPresent(name: string)
    {
        const response = await this.getApiResponse(`i=${name}`);
        const responseBody = JSON.parse(await response.text());
        const ingredient = responseBody['ingredients'][0].strIngredient
        expect(ingredient).toBe(name);
    }

    async assertIfIngredientIdPresent(name: string)
    {
        const response = await this.getApiResponse(`i=${name}`);
        const responseBody = JSON.parse(await response.text());
        const ingredientId = responseBody['ingredients'][0].idIngredient
        expect(ingredientId).not.toBe(null);
    }

    async assertIfCocktailNotPresent(name: string)
    {
        const response = await this.getApiResponse(`s=${name}`);
        const responseBody = JSON.parse(await response.text());
        expect(responseBody['drinks']).toBe(null);
    }

    async assertIfIngredientNotPresent(name: string)
    {
        const response = await this.getApiResponse(`i=${name}`);
        const responseBody = JSON.parse(await response.text());
        expect(responseBody['ingredients']).toBe(null);
    }

    async assertIfAlcohol(name: string, indicator: string)
    {
        const response = await this.getApiResponse(`i=${name}`);
        const responseBody = JSON.parse(await response.text());
        const alcoholIndicator = responseBody['ingredients'][0].strAlcohol        
        expect(alcoholIndicator).toBe(indicator);       
    }

    async getAbvContent(name: string)
    {
        const response = await this.getApiResponse(`i=${name}`);
        const responseBody = JSON.parse(await response.text());
        const abvIndicator = responseBody['ingredients'][0].strABV
        return abvIndicator;
    }

    async assertCorrectDrinkPresent(name: string)
    {
        const response = await this.getApiResponse(`s=${name}`);
        const responseBody = JSON.parse(await response.text());
        const drink = responseBody['drinks'][0].strDrink
        expect(drink).toBe("Margarita");
    }

    async assertCorrectPropertiesPresent(name: string)
    {
        const response = await this.getApiResponse(`s=${name}`);
        const responseBody = JSON.parse(await response.text());
        const drinks = responseBody['drinks'];
        let pass = true;
        for (let i = 0; i < drinks.length; i++)
         {
            const drink = drinks[i];
            if (
              !drink.hasOwnProperty('strDrink') ||
              !drink.hasOwnProperty('strTags') ||
              !drink.hasOwnProperty('strCategory') ||
              !drink.hasOwnProperty('strAlcoholic') ||
              !drink.hasOwnProperty('strGlass') ||
              !drink.hasOwnProperty('strInstructions')
            ) 
            {
              pass = false;  
              console.log('Required properties are missing for drink:', drink);
            }
         }
         expect(pass).toBe(true);
    }
}