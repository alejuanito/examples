'use strict';

const aws = require('aws-sdk');

const CONSTANTS = require('./../constants');

class DynamoDbConnector {
    constructor() {
        this._connector = new aws.DynamoDB.DocumentClient(CONSTANTS.DYNAMODB_OPTIONS);
    }

    get connector() {
        return this._connector;
    }

    async registerSocket(connectionId, code, connectionType) {
        const socketParams = {
            TableName: CONSTANTS.DYNAMODB_SOCKETS_TABLE,
            Item: {
                connectionId,
                type: connectionType,
                code: code
            }
        };
        return await this._connector.put(socketParams).promise();
    }

    async findSocketsByCode(code) {
        const queryParams = {
            TableName: CONSTANTS.DYNAMODB_SOCKETS_TABLE,
            IndexName: CONSTANTS.DYNAMODB_SOCKETS_TYPE_GSI,
            KeyConditionExpression: "code = :code",
            ExpressionAttributeValues: {
                ":code": code
            }
        };
        return await this._connector.query(queryParams).promise();
    }

    async findSocketsByConnectionId(connectionId) {
        const params = {
            TableName: CONSTANTS.DYNAMODB_SOCKETS_TABLE,
            Key: {
              "connectionId": {"S": connectionId}
             }
          };
          return await this._connector.getItem(params).promise();
    }

    

    async removeSocket(connectionId) {
        const socketParams = {
            TableName: CONSTANTS.DYNAMODB_SOCKETS_TABLE,
            Key: {
                connectionId
            }
        };
        return await this._connector.delete(socketParams).promise();
    }
}

const DYNAMODB_CONNECTOR = new DynamoDbConnector();
module.exports = DYNAMODB_CONNECTOR;
