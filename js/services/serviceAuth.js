'use strict';

var app = angular.module('WebApp');

app.factory('Auth', function($http, $cookieStore, $state, store){
    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };
    $cookieStore.remove('user');

    function changeUser(user) {
        angular.extend(currentUser, user);
    }

    return {
        authorize: function(accessLevel, role) {
            if(role === undefined) {
                role = currentUser.role;
            }
            console.log(currentUser.role);
            return accessLevel.bitMask & role.bitMask;
        },
        isLoggedIn: function(user) {
            if(user === undefined) {
                user = currentUser;
            }
            console.log(user);
            return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
        },
        login: function(user, success, error) {
            // server side authentification
           
            //http request
            $.ajax({
                type: 'POST',
                url: 'http://131.251.176.109:8080/consumer/login',
                crossDomain: true,
                data: user,
                success: function (data) {
                    console.log('Success in POST login request');
                    console.log(data);
                    if(data.jwt=='') {
                        alert('Invalid credentials');   
                    }
                    if(data.jwt!='') {
                        store.set('jwt', data.jwt);
                        changeUser({
                            user, 
                            role: userRoles.user
                        });
                        console.log('LOGIN OK');
                        success(user);
                        $state.go('user.home');
                    }
                },
                error: function (err) {
                    console.log('Error in POST login request');
                }
            });

            // dummy authentification for testin
            /*
            if(user.username == 'root' && user.password == 'toor') {
                changeUser({
                    user, 
                    role: userRoles.user
                });
                console.log('LOGIN OK');
                success(user);
            }error(error);
            */
        },
        logout: function(success, error) {
            /*
            $http.post('/logout').success(function(){
                changeUser({
                    username: '',
                    role: userRoles.public
                });
                success();
            }).error(error);
            */
            store.remove('jwt');
            changeUser({
                username: '',
                role: userRoles.public
            });
            success();
        },
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    }
});
