'use strict';

angular.module('dreamjournal.profile', ['ngSanitize'])

.controller('profileController', ['$scope', 'auth', '$http', 'djMainFactory', function ($scope, auth, $http, djMainFactory ) {

  // $scope.postsData = djMainFactory.userPostsData;

  // console.log('$scope.postsData = djMainFactory.userPostsData: ', $scope.postsData = djMainFactory.userPostsData);
  $scope.userName = auth.profile.name;
  $scope.userEmail = auth.profile.email; 
  $scope.userImage = auth.profile.picture;
  $scope.postsData; 
  $scope.result;
  $scope.alreadyFoundFriend = {};
  $scope.friendData;
  $scope.friendList = [];



  // $scope.alreadyFoundFriend = djMainFactory.alreadyFoundFriend;
  // $scope.friendData = djMainFactory.friendData;
  // $scope.friendList = djMainFactory.friendList;


//======================Get All Blog Posts On Init=====================
  $scope.init = function(){
    var userEmail = auth.profile.email; 

    djMainFactory.getAllUserPosts(userEmail)
    .then(function(data){
      $scope.postsData  = data;
    });



    djMainFactory.getAllFriendsPosts(userEmail)
    .then(function(data){
      $scope.friendData = data;

      // if($scope.friendData === undefined){
      //   return;
      // }
      
      for(var i = 0; i < $scope.friendData.length; i++){
        var key = $scope.friendData[i].email;

        if(!$scope.alreadyFoundFriend[key] && $scope.friendData[i].email !== auth.profile.email){
          $scope.alreadyFoundFriend[key] = key;
          $scope.friendList.push($scope.friendData[i]);
        }
      }

    }); 




  }

  $scope.init();


  $scope.getUserEmail = function(email){
    djMainFactory.getUserEmail(email);
  };

//======================Create Comment on Post==========================

  $scope.commentOnPost = function(comment, postID){
    djMainFactory.commentOnPost(comment, postID);

    djMainFactory.getAllUserPosts(auth.profile.email)
    .then(function(data){
      $scope.postsData  = data;
    });    
  };
//==========================Delete Comment==============================

$scope.deleteComment = function(postID, commentID){
    djMainFactory.deleteComment(postID, commentID);

    djMainFactory.getAllUserPosts(auth.profile.email)
    .then(function(data){
      $scope.postsData  = data;
    });      
};

//====================================Like Post
  $scope.likeCounter = 0;
  $scope.userLikePost = false;

  $scope.likePost = function(postID){

    if($scope.likeCounter % 2 === 0){
      $scope.likeCounter++;
      $scope.userLikePost = true;
    } else {
      $scope.likeCounter++;      
      $scope.userLikePost = false;
    }  
      djMainFactory.likePost(postID, $scope.userLikePost);

     djMainFactory.getAllUserPosts(auth.profile.email)
    .then(function(data){
      $scope.postsData  = data;
    });       
  };  

  $scope.getSinglePostID = function(postID){  
      djMainFactory.getSinglePostID(postID);
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
    return $scope.isUser;
  };

}]);











