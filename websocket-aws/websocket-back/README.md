<!--
title: 'AWS NodeJS Example'
description: 'This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v2
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->


# Websocket AWS Gateway - Lamba - NodeJS  Example

In this repository you will find an example of websocket using api gateway and lambdas in aws, for this example I will use DynamoDB and you must have basic knowledge of IAM roles.

## Usage

you must have serverless framework installed

### Configuration
In serverless.yml replace: 

```
{your_arn_role}
```

You need to create a Dynamo table and configure these enviroment variables:

```
process.env.DYNAMODB_SOCKETS_TYPE_GSI
process.env.DYNAMODB_SOCKETS_TABLE
process.env.WEBSOCKET_API_ENDPOINT
```


### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service aws-node.zip file to S3 (711.23 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.................................
Serverless: Stack update finished...
Service Information
service: aws-node
stage: dev
region: us-east-1
stack: aws-node-dev
resources: 6
functions:
  api: aws-node-dev-hello
layers:
  None
```
