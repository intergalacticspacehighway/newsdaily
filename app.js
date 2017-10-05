(function(angular) {
    'use strict';
    var requestURL = "https://newsapi.org/v1/articles?source=google-news&apiKey=383daa57824a4651abc597c2f184624c"

    var mainComponent = {
        templateUrl:'./template/mainComponent.html',
        controller: function($state, $http){
            var self = this;
            if($state.params.type === 'top' || $state.params.type === 'latest' || $state.params.type === 'popular'){
                var url = angular.copy(requestURL);
                url+= '&sortBy='+$state.params.type;
                self.showLoader = true;
                $http.get(url).then(function(response){
                    self.articles = response.data.articles; 
                    self.showLoader = false;
                },function(err){
                    console.log("Error processing request!!"+err);
                })
            }else{
                $state.go('news');
            }
            self.changeCategory = function(category){
                if(category){

                    self.showLoader = true;
                    var url = "https://newsapi.org/v1/sources?category="+category+"&apiKey=383daa57824a4651abc597c2f184624c"
                    $http.get(url).then(function(response){
                        self.articles = response.data.sources; 
                        self.showLoader = false;
                    },function(err){
                        console.log("Error processing request!!"+err);
                    })
                }
            }


        }
    }
    var navComponent = {
        templateUrl:'./template/navbar.html',
        bindings:{
            changeCategory: '&'
        },
        controller: function(){

        }
    }
    var articleComponent = {
        templateUrl:'./template/article.html',
        bindings:{
            content: '<'
        },
        controller: function(){

            var self = this;
            self.$onInit = function(){
            }
        }
    }

    var myApp = angular.module("myApp", ["ui.router","ngRoute"])
    .component('navComponent',navComponent)
    .component('articleComponent',articleComponent)
    .component('mainComponent',mainComponent);

    myApp.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.when('', '/news/top');
        $urlRouterProvider.when('/news', '/news/top');
        $urlRouterProvider.otherwise('/news');
        $stateProvider.state("news",{
            template:"<main-component></main-component>",
            url:"/news/:type",
        });

    })
})(window.angular);
