Dan Kershner, Dylan Zucker, John Venditti

Our application is a meal tracking and planning service. It allows users to plan and log future and past meals tied to their google account.
They are able to view their past meals including stats like calories and carbs, as well as add new meals for the future.

Clone the fullstackFinalProject repo at https://github.com/dkershner/fullstackFinalProject.git

Our application is set up to fetch from the server hosted on an AWS EC2 instance found at ec2-18-191-0-236.us-east-2.compute.amazonaws.com
The server is continually running there for use.

The application is not continuously running on AWS (due to free tier limits) so it can simply be run locally by:
cd mealTracker
npm run start

This will open a browser window to the application ready for use. The user is first prompted to login with google.
Then, he/she is able to add new meals, delete existing meals, and look at meals they have on different dates.