Neighborhood Map (React)
  An application built using ReactJS. It helps travelers to find there place goals in Egypt using google API map !

How it works?
  its uses Google Maps API to display a Map, and FourSquare API to get places info. It has also a list component that display a List of Places, and a Search Filter. Just Click on any place from the list and it would trigger its Marker on the Map and give you the whole info about it :)

Setup Instructions
  npm install
  npm start A Live Preview will opens via http://localhost:3000/ by your default browser!
  
Production Instructions
  npm build or yarn build
  This will build the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.


Offline First
  The service worker is only enabled in the production environment. It's recommended that you do not enable an offline-first service worker in a development environment.
  If you need to test your offline-first service worker locally, build the application (using npm run build) and run a simple http server from your build directory.

Technology
  ReactJs
  HTML
  CSS
  Foursquare API
  Google Maps API
