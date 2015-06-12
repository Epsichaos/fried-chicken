'use strict';

var app = angular.module('WebApp');

app.factory('Auth', function($http, $cookieStore){
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
            /*
            $http.post('/login', user).success(function(user){
                changeUser(user);
                success(user);
            }).error(error);
            */

            // dummy authentification for testing
            if(user.username == 'root' && user.password == 'toor') {
                changeUser({
                    user, 
                    role: userRoles.user
                });
                if(user.rememberme) {
                    /*
                    $cookieStore.put(user);
                    console.log($cookieStore.get(user));
                    */
                }
                console.log('LOGIN OK');
                success(user);
            }error(error);

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
