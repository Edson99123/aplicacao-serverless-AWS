'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    
    const documentClient = new AWS.DynamoDB.DocumentClient();
    
    let responseBody = "";
    let statusCode = 0;

    const {Id} =event.pathParameters;

    const params = {
        TableName: "Items2",
        Key:{
            Id: Id
        }
    }

    try {
    
        const data = await documentClient.get(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
        
    } catch (err) {

        responseBody = `Falha ao obter item: ${err}`;
        statusCode = 403;

    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body:responseBody
    };

    return response;
}