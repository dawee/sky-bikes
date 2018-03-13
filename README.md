# Sky Bikes

## Requirements

 * Node >= 8.9.1
 * MongoDB >= 2.6.10
 * Yarn >= 1.3.2

## Installation

1. Make sure MongoDB is running on http://localhost:27017 (default port)

2. Install dependencies :

```
> yarn
```

2. Start server :

```
> yarn start
```

Wait for this message in your shell: `Compiled successfully`

Then open your browser on http://localhost:3000

## Usage

### Member

As a member you can rent a bike or return a bike on a empty station slot.
When you open the browser, you'll see a link to register.

After registering you can start to rent a bike by navigating through the different stations.

**WARNING**: If you take too much time to return a bike, you'll be redirected to the login page after your next action and you'll never be able to login again !

### Admin

As an admin, you can see :

 * All stations with their returned bikes
 * All members with their personal info, bikes and banned status.

 To open the admin page connect as **admin@skybikes.com** in the login page.


## Development

The API (under *src/api*) uses Node's express framework with MongoDB API through Mongoose ORM.

The front part (under *src/app*) is completely written is vanilla JS (ECMASCRIPT 8). However, it is inspired by the **ELM architecture** style. This pattern is also know as Flux (driven by facebook) and Redux implementation.

In the app part, there is only one state and it's never mutated. Every dispatched action apply a change and returns a new state.
If you open the console, you'll see that these actions are logged to trace every system operations.

## Test

You can run the tests with this command:

```
> yarn test
```
