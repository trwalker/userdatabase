/*

INITIALIZATION

*/

// Firebase Configuration
var config = {
  apiKey: "AIzaSyA2_fVDRCKhCJ5QueXY-Xb2CxFFuxY-rdU",
  authDomain: "user-database-d1a70.firebaseapp.com",
  databaseURL: "https://user-database-d1a70.firebaseio.com",
  storageBucket: "user-database-d1a70.appspot.com",
  messagingSenderId: "528331985076"
};

// Initialize Firebase
firebase.initializeApp(config);
var database = firebase.database();
var auth = firebase.auth();

// Initialize AngularJS
var app = angular.module('FirebaseTest', [
  'ngRoute', 'ngMaterial', 'ngMessages', 'ngSanitize'
]);
