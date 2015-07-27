import Hapi from 'hapi';
import fs from 'fs';
import Bell from 'bell';
import loginTwitterController from './controllers/loginTwitterController';
import logoutController from './controllers/logoutController';
import getUserController from './controllers/getUserController';

//import loginFacebookController from './controllers/loginFacebookController';

let {
    TECH_AUTH_FACEBOOK_CLIENT_ID,
    TECH_AUTH_FACEBOOK_CLIENT_SECRET,
    TECH_AUTH_TWITTER_CLIENT_ID,
    TECH_AUTH_TWITTER_CLIENT_SECRET
} = process.env;

let server = new Hapi.Server();

server.connection({
    port: process.env.PORT || 3002
});

server.register([Bell], (err) => {

    server.auth.strategy('twitter', 'bell', {
        provider: 'twitter',
        password: 'MUST_BE_CHANGED2',
        clientId: TECH_AUTH_TWITTER_CLIENT_ID,
        clientSecret: TECH_AUTH_TWITTER_CLIENT_SECRET,
        isSecure: false
    });



    server.route({
        method: ['GET', 'POST'],
        path: '/login/twitter',
        config: {
            auth: 'twitter',
            handler: loginTwitterController
        }
    });

    server.route({
        method: ['GET'],
        path: '/logout/{token}',
        config: {
            auth: false,
            handler: logoutController
        }
    });

    server.route({
        method: ['GET'],
        path: '/users',
        config: {
            auth: false,
            handler: getUserController
        }
    });

    /*server.auth.strategy('facebook', 'bell', {
        provider: 'facebook',
        password: 'MUST_BE_CHANGED',
        clientId: TECH_AUTH_FACEBOOK_CLIENT_ID,
        clientSecret: TECH_AUTH_FACEBOOK_CLIENT_SECRET,
        isSecure: false
    });*/

    /*server.route({
        method: ['GET', 'POST'],
        path: '/login/facebook',
        config: {
            auth: 'facebook',
            handler: loginFacebookController
        }
    });*/

    server.start(() => {
        console.log('Server running at:', server.info.uri);
    });
});