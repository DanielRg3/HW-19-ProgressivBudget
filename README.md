# HomeWork 19 "Online/Offline Budget Tracker"

## Project Description
In this project, we need to add functionality to a Budget Tracker application in order to allow the user to use the app even when they are offline.

The user must be able to add expenses and deposits to their budget with or wothout a connection.
It is expected that, when entering transactions offline, the app should populate the total when brought back online.

Offline Functionality:
- Enter deposits.
- Enter expenses.

When brought back online:
- Offline entries should be added to the tracker.

## Table of Content
- Package.json installation (in this case the compression package)
- Server.js
- api.js at routes
- transactions.js file at models was provided in this project
- db.js
- service-worker.js
- manifest.webmanifest

## What I Learned
In this project I learned the importance of the PWAs for apps that does not require too much data transaction and so they can run out of internet connection.
As an important aspect of this project was to developed the service-worker.js file in order to set up all the caches that will allocate the date enterded by the user.
Also, we rehearce how to set up the server file to interact with between the front-end and the database.
and how to call for the different app routs at the api file.

## Credits
I would like to thanks my TA <cite>Fer Sosa </cite> and my tutor <cite>Alexis San Javier </cite> for helping me in all doubts I have had with this project.