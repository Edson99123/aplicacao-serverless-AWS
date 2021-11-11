'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const { Id } = event.pathParameters;
  const { itemName, itemPrice } = JSON.parse(event.body);

  const params = {
    TableName: "Items2",
    Key: {
      Id: Id
    },
    UpdateExpression: "set itemName = :n, itemPrice = :p",
    ExpressionAttributeValues: {
      ":n": itemName,
      ":p": itemPrice
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const data = await documentClient.update(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch(err) {
    responseBody = `Falha ao atualizar produto: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  return response;
};