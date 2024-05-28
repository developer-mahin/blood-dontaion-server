# Blood Donation System

## Technology Stack:

- TypeScript for programming language
- Express.js for the web framework
- Prisma for PostgreSQL for ORM
- JWT for authentication

## Uses Technology:

Blood Donation is a basic Node.js Express application with PostgreSQL with popular ORM ( Object Relational Mapping) Prisma uses in this project. It provides RESTful APIs for creating, retrieving, updating user profile, and requesting for blood donation.
In this project I have use Zod for data validation. Authentication and authorization using jwt , and bcryptjs used for password hashing.
Authentication:
Users are required to register and log in to access to Read, Write, And Updating features. JSON Web Tokens (JWT) are used for authentication.

#### SERVER_URL : https://blooddonationproject.vercel.app/

# Functionality:

## User Management:

### CRUD Operations:

- User Registration
- Login User
- Reading My Profile
- Update My Profile

## Blood Management: (For Donor)

### CRUD Operations:

- Reading All Donor List
- Add Donation Request
- Get My Donation Request
- Update Donation Status

### Install Dependencies / Dependencies that i have used

1. express // for server creation
   - npm install express
2. prisma // Prisma ODM for connection building with PostgreSQL
   - npx prisma
   - npx prisma init
3. zod // For validation users data
   - npm install zod
4. cors // helps you handle CORS-related issues when making requests from different domains
   - npm install cors
5. dotenv // For env variables
   - npm install dotenv
6. bcryptjs // for secure password
   - npm install bcryptjs
7. JWT or jsonwebtoken // for authentication and authorization
   - npm install jsonwebtoken

### API DOCUMENTATION LINK

- URL- https://documenter.getpostman.com/view/24264729/2sA2r824DT

### LIVE URL

- SERVER - URL- https://sellsmanagement.vercel.app/
- CLIENT - URL- https://loquacious-horse-20d902.netlify.app/

### User Management // api

### i. User Registration

- POST http://localhost:5000/api/register

```json
// in below i am sharing a json data formate for register user
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword",
  "bloodType": "A_POSITIVE",
  "location": "New York",
  "age": 30,
  "bio": "A regular blood donor",
  "lastDonationDate": "2024-03-25"
}
```

### ii. Login User

- POST http://localhost:5000/api/login

```json
// in below i am sharing a json data formate for login user
{
  "email": "avagarcia10@example.com",
  "password": "avapass789"
}
```

### iii. Retrieve My Profile

- GET http://localhost:5000/api/my-profile

```
Authorization: <JWT_TOKEN>
```

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Profile retrieved successfully",
  "data": {
    "id": "5567898c-4ebb-464b-9502-cdb8d1fd8a50",
    "name": "Ava Garcia",
    "email": "avagarcia10@example.com",
    "bloodType": "O_NEGATIVE",
    "location": "Austin",
    "availability": false,
    "createdAt": "2024-04-12T11:56:16.749Z",
    "updatedAt": "2024-04-12T11:56:16.749Z",
    "userProfile": {
      "id": "689e8c6c-b866-4079-bc99-0b4a85fec515",
      "userId": "5567898c-4ebb-464b-9502-cdb8d1fd8a50",
      "bio": "Dedicated blood donor",
      "age": 12,
      "lastDonationDate": "2024-03-14",
      "createdAt": "2024-04-12T11:56:16.749Z",
      "updatedAt": "2024-04-12T11:56:16.749Z"
    }
  }
}
```

### iv. Update My Profile

- PUT http://localhost:5000/api/my-profile

```
Authorization: <JWT_TOKEN>
```

```json
{
  "bio": "Updated bio text. I have donated 5 times.",
  "age": 35
}
```

### Blood Donation Management

### i. Create Donation Request

- POST http://localhost:5000/api/donation-request

```
Authorization: <JWT_TOKEN>
```

```json
// in below i am sharing a json data formate for creating course
{
  "donorId": "f741556f-286c-4821-ac85-2a06cecb6c4d",
  "phoneNumber": "012345678591",
  "dateOfDonation": "2024-03-26",
  "hospitalName": "Chevron",
  "hospitalAddress": "Panchlaish",
  "reason": "Anemia"
}
```

### ii. Get Donation Request

- GET http://localhost:5000/api/donor-list

```
Authorization: <JWT_TOKEN>
```

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Donors successfully found",
  "meta": {
    "total": 20,
    "page": 1,
    "limit": 10
  },
  "data": [
    {
      "id": "b9964127-2924-42bb-9970-60f93c016ghi",
      "name": "John Doe",
      "email": "john@example.com",
      "bloodType": "A_POSITIVE",
      "location": "Chittagong",
      "availability": true,
      "createdAt": "2024-03-24T12:00:00Z",
      "updatedAt": "2024-03-24T12:00:00Z",
      "userProfile": {
        "id": "b9964127-2924-42bb-9970-60f93c016gkp",
        "userId": "b9964127-2924-42bb-9970-60f93c016ghi",
        "bio": "I have donated 5 times.",
        "age": 30,
        "lastDonationDate": "2024-03-21",
        "createdAt": "2024-03-22T12:00:00Z",
        "updatedAt": "2024-03-22T12:00:00Z"
      }
    }
    // More users who will donate
  ]
}
```

### iii. Get My Donation Request

- GET http://localhost:5000/api/donation-request

```
Authorization: <JWT_TOKEN>
```

```json
Response:
{
    "success": true,
    "statusCode": 200,
    "message": "Donation requests retrieved successfully",
    "data": [
        {
            "id": "b9964127-2924-42bb-9970-60f93c016ghi",
            "donorId": "b9964127-2924-42bb-9970-60f93c016bvj",
            "requesterId": "b9964127-2924-42bb-9970-60f93c016xyz",
            "phoneNumber": "012345678591",
            "dateOfDonation": "2024-03-26",
            "hospitalName": "Chevron",
            "hospitalAddress": "Panchlaish",
            "reason": "Anemia",
            "requestStatus": "PENDING",
            "createdAt": "2024-03-24T12:00:00Z",
            "updatedAt": "2024-03-24T12:00:00Z",
            "requester": {
                "id": "b9964127-2924-42bb-9970-60f93c016xyz",
                "name": "Jane Doe",
                "email": "jane@example.com",
                "location":"Chittagong",
                "bloodType":"A_POSITIVE",
                "availability":true
            }
        },
        {
            "id": "b9964127-2924-42bb-9970-60f93c016gkj",
            "donorId": "b9964127-2924-42bb-9970-60f93c016bvj",
            "requesterId": "b9964127-2924-42bb-9970-60f93c016abc",
            "phoneNumber": "012345678592",
            "dateOfDonation": "2024-03-28",
            "hospitalName": "St. Mungo's Hospital",
            "hospitalAddress": "Diagon Alley",
            "reason": "Emergency surgery",
            "requestStatus": "PENDING",
            "createdAt": "2024-03-25T09:00:00Z",
            "updatedAt": "2024-03-25T09:00:00Z",
            "requester": {
                "id": "b9964127-2924-42bb-9970-60f93c016abc",
                "name": "John Smith",
                "email": "john@example.com",
                "location":"Chittagong",
                "blood_type":"A+",
                "availability":true
            }
        }
    ]
}
```

### iv. Update Donation Request Status

- PUT http://localhost:5000/api/donation-request/:requestId

```
Authorization: <JWT_TOKEN>
```

```json
{
  "requestStatus": "APPROVED"
}
```
