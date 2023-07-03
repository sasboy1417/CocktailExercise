How to run the tests.

Navigate to the below URL for the latest job which ran:

https://github.com/sasboy1417/CocktailExercise/actions/runs/5441268678

Click on Re-run all jobs button on the right corner of the screen

![image](https://github.com/sasboy1417/CocktailExercise/assets/25165419/1b987aff-c8cc-4617-8166-914ebdf7b997)

When prompt click on the Re-Run jobs button:

![image](https://github.com/sasboy1417/CocktailExercise/assets/25165419/8bb9978c-ddf7-4bf9-b3d9-5e0677b6e9ae)

The tests will now excute in the job.

![image](https://github.com/sasboy1417/CocktailExercise/assets/25165419/b6578dab-f1b9-4b70-999c-4ca0d1da72be)

After the job has completed a green checkmark should display.
An HTML report will also be generated under the artifacts section which can be downloaded in order to view the tests and their statuses.

![image](https://github.com/sasboy1417/CocktailExercise/assets/25165419/a0baf740-c2f3-4953-a7f0-2f9603abe2a0)



Two non-functional tests, both which can be automated through **Postman**, that I would have designed would have been:

1. Performance tests. For this test, you can simulate a large number of concurrent users or requests and measure the response times of the API and assess the overall performance, stability, and behavior of the API under different scenarios.. This can be achived by clicking on the runner tab then on the performance tab and dragging over your collection. The number of virtual users can now be set and the collection run in order to view the responce times.

   ![image](https://github.com/sasboy1417/CocktailExercise/assets/25165419/8a025be0-b92e-4827-ac07-9254a3a99491)



2. Security tests.  This involves testing various security aspects, such as authentication and authorization. Assuming this API required authentication such as basic auth, bearer token or authentication in the headers one would test with invalid credentials and verify the correct reponse status comes back such as 401.
