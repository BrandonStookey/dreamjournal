'use strict';

angular.module('dreamjournal.home', ['ngSanitize'])

.controller('homeController', ['$scope', '$rootScope', 'djMainFactory', '$http', 'auth', '$interval', function ($scope, $rootScope, djMainFactory,  $http, auth, $interval) {

  $scope.postsData = djMainFactory.allPostsData;
  $scope.isUserSignedIn = $rootScope.signedIn;
  console.log('$scope.postsData = djMainFactory.allPostsData: ', $scope.postsData = djMainFactory.allPostsData);

  $scope.init= function() {
//======================Get All Blog Posts On Init=====================
    djMainFactory.getAllPosts();
  };

  $scope.init();

//==========================Get All User Posts==========================

  $scope.getAllUserPosts = function(email){
    console.log('on home controller: ', email);
    djMainFactory.getAllUserPosts(email);
  };

//======================Create Comment on Post==========================

  $scope.commentOnPost = function(comment, postID){
    djMainFactory.commentOnPost(comment, postID);
  };
//==========================Delete Comment==============================

$scope.deleteComment = function(postID, commentID){
    djMainFactory.deleteComment(postID, commentID);
};

//====================================Like Post
  $scope.likeCounter = 0;
  $scope.userLikePost = false;
  $scope.userLikeData = djMainFactory.getUserLikeData;

  $scope.getUserLike = function(postID){
    console.log('getUserLike on home controller: ');
    djMainFactory.getUserLike(postID); 
  }


  $scope.likePost = function(postID){

    if($scope.likeCounter % 2 === 0){
      $scope.likeCounter++;
      $scope.userLikePost = true;
    } else {
      $scope.likeCounter++;      
      $scope.userLikePost = false;
    }  
      djMainFactory.likePost(postID, $scope.userLikePost);
  };  

  $scope.viewSinglePost = function(postID){  
      djMainFactory.viewSinglePost(postID);
  };

//=========================Shows/Hide Comments===============================
  $scope.viewComments;
  $scope.counter = 0;
  $scope.isUser;

  $scope.showComments = function(postID){
    if($scope.counter % 2 === 0){
      $scope.counter++;
      $scope.viewComments = postID;
      return $scope.viewComments;
    }
    $scope.counter++;
    $scope.viewComments = 0;
    return $scope.viewComments;
  };

//=========================Shows delete button only if it is user's comment  

  $scope.showDeleteCommentButton = function(){
    $scope.isUser = $scope.userName;
    console.log('showButton ', $scope.isUser);
    return $scope.isUser;
  };

}]);














