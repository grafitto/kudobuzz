# Kudobuzz

This appication expects data through an API, pushes it to rabbitMQ queue through the producer, an aggregate is computed from the data and persisted in the database (MongoDB).

### Requirements 
- NodeJS 8.x.x
- RabbitMQ server
- MongoDB
- Yarn

## Setup

Clone the project to a folder in your computer.

All the setup is done through the `.env` file. A fast setup can be done my renaming `.env.example` to `.env`. This assumes default settings in mongodb and rabbitmq.

The application is split into 3 subapps. The producer, consumer and server. Each subapp is started independently.

Run the bash commands below (preferably on different bash shells)

```bash
#Start the producer
$ yarn serve:producer

#Start the consumer
$ yarn serve:consumer

#Start the server
$ yarn serve:server
```
## **Push data to the producer**

Assuming default producer port number (3000)

**Request**

`POST /api/reviews HTTP /1.1`   
`HOST http://localhost:3000`

```javascript
{
    "businessId": "safaricom",
    "message": "This was the best from safcom",
    "type": "product",
    "sources": "amazon",
    "rating": 4
}
``` 
**Response**

`200 OK`
```json
{
    "success": true
}
```

`406 Not Acceptable`
```
<Error message>
```

The message is validated then pushed to the queue for the consumer.

The consumer fetches the message from the queue, creates and aggregate then stores it in the Database.

## Server

The aggregates are exposed through the server by an endpoint.

## **Fetch Aggregates**

Assuming default server port (3002)

**Request**

`GET /api/aggregates HTTP/1.1`   
`HOST http://localhost:3002`

**Response**
```json
{
    "sources": {
        "amazon": {
            "count": 3,
            "percentage": 50
        },
        "facebook": {
            "count": 3,
            "percentage": 50
        }
    },
    "types": {
        "product": {
            "count": 5,
            "percentage": 83.33333333333334
        },
        "site": {
            "count": 1,
            "percentage": 16.666666666666664
        }
    }
}
```





