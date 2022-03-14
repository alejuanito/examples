'use strict';

const apigatewayConnector = require('./../connector/apigateway.connector');
const dynamodbConnector = require('./../connector/dynamodb.connector');

const defaultSocketHandler = async (event, context) => {
    try {
        const action = data.action;
        const connectionId = event.requestContext.connectionId;
        switch (action) {
            case 'PING':
                const pingResponse = JSON.stringify({action: 'PING', value: 'PONG'});
                await apigatewayConnector.generateSocketMessage(connectionId, pingResponse);
                break;
            default:
                const invalidResponse = JSON.stringify({action: 'ERROR', error: 'Invalid request'});
                await apigatewayConnector.generateSocketMessage(connectionId, invalidResponse);
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            },
            body: 'Default socket response.'
        };
    } catch (err) {
        console.error('Unable to generate default response', err);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            },
            body: 'Default socket response error.'
        }
    }
};

const handlerSocketSendMessage = async (event, context) => {
    try {
        const action = event.queryStringParameters.action;
        const connectionId = event.requestContext.connectionId;
        console.log('action', action);
        switch (action) {
            case 'PING':
                const pingResponse = JSON.stringify({action: 'PING', value: 'PONG'});
                await apigatewayConnector.generateSocketMessage(connectionId, pingResponse);
                break;
            case 'ORDER':
                const sockets = await dynamodbConnector.findSocketsByCode(event.queryStringParameters.code);
                for (const element of sockets.Items) {
                    await apigatewayConnector.generateSocketMessage(element.connectionId, `${element.code}: ${event.queryStringParameters.message}`);
                  };
                break;
            default:
                const invalidResponse = JSON.stringify({action: 'ERROR', error: 'Invalid request'});
                await apigatewayConnector.generateSocketMessage(connectionId, invalidResponse);
        }
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            },
            body: 'Default socket response.'
        };
    } catch (err) {
        console.error('Unable to generate default response', err);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            },
            body: 'Default socket response error.'
        }
    }
};

const handleSocketConnect = async (event, context) => {
    try {
        const connectionId = event.requestContext.connectionId;
        const connectionType = event.queryStringParameters.connectionType;
        const code = event.queryStringParameters.code;
        await dynamodbConnector.registerSocket(connectionId, code, connectionType);
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            },
            body: 'Socket successfully registered.'
        };
    } catch (err) {
        console.error('Unable to initialize socket connection', err);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            },
            body: 'Unable to register socket.'
        }
    }
};

const handleSocketDisconnect = async (event, context) => {
    try {
        const connectionId = event.requestContext.connectionId;
        await dynamodbConnector.removeSocket(connectionId);
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            },
            body: 'Socket successfully terminated.'
        };
    } catch (err) {
        console.error('Unable to terminate socket connection', err);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            },
            body: 'Unable to terminate socket.'
        }
    }
};



module.exports = {
    handlerSocketSendMessage,
    handleSocketConnect,
    handleSocketDisconnect,
    defaultSocketHandler
};
