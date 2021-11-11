'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    
    const documentClient = new AWS.DynamoDB.DocumentClient();
    
    let responseBody = "";
    let statusCode = 0;

    const {Id, itemName, itemPrice} = JSON.parse(event.body);

    const params = {
        TableName: "Items2",
        Item:{
            Id: Id,
            itemName: itemName,
            itemPrice: itemPrice
        }
    }

    try {
    
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
        
    } catch (err) {

        responseBody = `Falha ao inserir item: ${err}`;
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