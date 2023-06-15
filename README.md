# Online Voting System - Backend

This is the backend application for an Online Voting System built with Express and MongoDB. It provides the necessary APIs for user management, candidate management, and vote management.

## API Documentation

### User Management

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Authenticate and login a user.
- **POST /api/auth/verify**: Verify the JWT of a user.
- **POST /api/auth/logout**: Logout a user.

### Candidate Management

- **POST /api/candidate**: Create a new candidate.
- **GET /api/candidate/:id**: Get a specific candidate by ID.

### Vote Management

- **POST /api/voteEvents**: Create a new voting event.
- **GET /api/voteEvents/:id**: Get a specific voting event by id.
- **GET /api/voteEvents/active**: Get the list of active voting events.
- **POST /api/voteEvents/:id/vote**: Cast vote for a candidate.

## Postman Collection

[Download Postman Collection](https://raw.githubusercontent.com/anwesha07/voting-app-backend/main/voting-app-backend.postman_collection.json)

## Database Schema

The MongoDB database schema used in this application consists of the following collections:

- **Users**: Stores user information (userName, password, email, aadhaar, token, isAdmin).
- **Candidates**: Stores candidate information (name, email, gender, age).
- **VoteEvents**: Stores vote information (name, startDate, endDate, candidates, votedBy, votes).

## Security

- Passwords are securely hashed and stored using bcrypt.
- JSON Web Tokens (JWT) is used for user authentication.
