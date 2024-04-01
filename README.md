Assumptions and Course of Action:

1.Operating Room Hours: It is assumed, based on the provided hours, that an operating room is active for 16 hours per day.
2.Active Days: Active days in the operating room are considered as any day where surgeries are performed, with at least one surgery. Calculation of active days is based on this assumption.
3.Staff Data: Staff data is presented as general for the entire hospital.
4.Room Usage Percentages: Usage percentages for rooms are presented as a general overview.

The algorithm follows a simple process of data collection, iterating over the provided data and returning it in a JSON object. To avoid counting duplicates erroneously, the algorithm utilizes data structures such as sets extensively.

## Running the Backend:
To run the backend, follow these commands:
1.Navigate to the backend directory:
### `cd backend`
2.Run the application using Node.js:
### `node app`

Runs the app in the development mode.\
Open [http://localhost:3890](http://localhost:3000) to view it in your browser.

note: The controller is located in the app.js file and all calculations are performed in calculation.js

## Running the Frontend:

1.Navigate to the frontend directory:
### `cd frontend`
2.Start the application using npm:
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Running Tests:
Ensure that the server and client are running before executing the tests.

1.Navigate to the testing directory:
### `cd testing`
2.Run the tests using npx nyc and playwright:
### `npx nyc --reporter=text-summary npx playwright test`

After the output appears in the terminal, press Ctrl + C to display the test coverage percentages.
Execute these commands in order to run the tests for your project.

In order to see the results of the calculations, be sure to select a date that has data on it.