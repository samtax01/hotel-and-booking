## Find nearby Hotels 

Backend API for finding nearby hotels and for creating a booking record for a customer interested in booking a hotel. 


## NodeJS and Express
Built with NodeJs and Express
It is modular structured to decouple functional units. You need some indepth understanding of Repository pattern, MVC Pattern and Modular architecture
with API versioning. API documentation generated with apiDoc comment syntax, you need to also be familiar with that too



### Installation
Clone repo 

`git clone https://github.com/samtax01/hotel-and-booking.git`

Install NPM dependencies with 


``npm install``

You may have install nodemon and run `nodemon app`

It will run in some default port `8099` but you can change the port by creating a local .env from .env-example

### API Documentation
After your updates, you need to generate the API Documentation by running

````npm run docs````

### DataBase Configuration

- Step 1: setup mondodb on local or  online. 
- Step 2: create environment file `cp .env.example .env`
- Step 3: update the mongoURI in the .env file.  

### Database Seeding 
You can fill the database with necessary information to make the application work smoothly.
The command to run the seeder file is:

````npm run seed````

### Accessing the application Endpoint 



### API Endpoints

Get Nearby Hotels
- Endpoint [GET] ```http://localhost:3000/hotels/search```
- Example http://localhost:3000/hotels/search?coordinates=48.130323,11.576362&limit=10&lang=en


View all saved hotel
- Endpoint [GET] ```http://localhost:3000/hotels```

Book Hotel
- Endpoint [POST] ```http://localhost:3000/hotels/booking```

View all Booked information on a Hotel
- Endpoint [GET] ```http://localhost:3000/hotels/booking/:hotelId```

Documentation endpoint
``http://localhost:3000/docs``
