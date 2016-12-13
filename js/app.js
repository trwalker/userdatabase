/*

INITIALIZATION

*/

// Firebase Configuration
var config = {
  apiKey: "AIzaSyC3QMg4_g9fIOFNa7aKZuGEGeVj93O8KTQ",
  authDomain: "user-database-2.firebaseapp.com",
  databaseURL: "https://user-database-2.firebaseio.com",
  storageBucket: "user-database-2.appspot.com",
  messagingSenderId: "948996009406"
};

// Initialize Firebase
firebase.initializeApp(config);
var database = firebase.database();
var auth = firebase.auth();

// Initialize AngularJS
var app = angular.module('UserDatabase', [
  'ngRoute', 'ngMaterial', 'ngMessages', 'ngSanitize'
]);
