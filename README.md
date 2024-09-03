# Word App
## Overview
The Word App is a simple one page app that allows the user to enter a single word and displays the definitions to the word.  There is a frontend that interacts with the user and a backend that  communicates to Words API to retrieve the definitions.
## Project Structure
- **frontend:** The frontend application that prompts for a word and sends a query to the backend application to retrieve the definitions for the word.  The definitions are displayed to the user. 
- **backend:** The backend is a REST API with one endpoint used to retrieve the definitions of the word from the Words API and return the definitions.  
### Repository
- [WordApp.git](https://github.com/ryanhilton2013/wordapp): For ease of installation, both the frontend and backend application are located in the same repository.  
## Building 
### Setup
>The minimum version of node required is node 18.17.0 but the app has only been tested on Node 22.7.0.

1. **Clone the repository:**
```bash
   git clone https://github.com/ryanhilton2013/wordapp.git
   cd wordapp
```
### Testing
#### Build the Backend
1. Open a terminal window and cd to the wordapp repository directory.
2. Go the the backend directory.
```
cd backend
```
3. **Create a `.env` file:**    
- Copy `.env.example` to `.env` and update the environment variable.
	- The WORDS_API_URL is the URL provided in the [Words API documentation](https://www.wordsapi.com/docs/) and should not have to be changed.
	- The WORDS_API_KEY is the API key to access the Words API.  Update this variable with the X-RapidAPI-Key  provided when you subscribed to the [WordsAPI](https://rapidapi.com/dpventures/api/wordsapi/playground/54b863d2e4b0417be3482942)
	- The WORDAPP_BACKEND_API_KEY is an API key used  to access the backend API.  This can be  a self generated API key string.  This value will need to be the same as the WORDAPP_BACKEND_API_KEY value defined in the  .`env.local` file for the frontend.
	- The WORDAPP_BACKEND_PORT is the port number for the backend server.  This value will need to be the same  as the port in the WORDAPP_BACKEND_API_URL variable defined in the `.env.local` file for the front end and should not have to be changed.
4. **Install dependencies:**
```bash
npm install
```
5. **Run the development server:**
- Start the backend server.  This terminal will need to remain active to test the frontend applciation.
```bash
npm run start:dev
```
#### Build the Frontend
1. Open a terminal window and cd to the wordapp repository directory.
2. Go to the front end directory.  
```
cd frontend
```
3. **Create a `.env.local` file:**    
- Copy `.env.local.example` to `.env.local` and update the environment variable.
	- The WORDAPP_BACKEND_API_URL is the URL for the backend application and should not have to be changed for development.  
	- The WORDAPP_BACKEND_API_KEY is an API key used by the server side of the frontend to access the backend API. This can be  a self generated API key string.   This value will need to be the same as the WORDAPP_BACKEND_API_KEY variable defined in the `.env` file for the backend.
4. **Install dependencies:**
```bash
npm install
```
5. **Run the development server:**
```bash
npm run dev
```
6. **Open your browser:**
- Visit `http://localhost:3000` to view the application.
### Production 
Note: **By default, the processes will stop when you close the terminal.** To keep the frontend and backend running even after the terminal is closed, you need to put a process manager, such as pm2,  or another mechanism in place.  

- Clone the WordAPP repository as described in the Setup step above.
#### Build the Backend
1. Open a terminal window and cd to the wordapp repository directory.
2. Go the the backend directory.
```
cd backend
```
3. **Create a `.env` file:**    
- Copy `.env.example` to `.env` and update the environment variable.
	- The WORDS_API_URL is the URL provided in the [Words API documentation](https://www.wordsapi.com/docs/) and should not have to be changed.
	- The WORDS_API_KEY is the API key to access the Words API.  Update this variable with the X-RapidAPI-Key  provided when you subscribed to the [WordsAPI](https://rapidapi.com/dpventures/api/wordsapi/playground/54b863d2e4b0417be3482942)
	- The WORDAPP_BACKEND_API_KEY is an API key used  to access the backend API.  This can be  a self generated API key string.  This value will need to be the same as the WORDAPP_BACKEND_API_KEY value defined in the  .`env.local` file for the frontend.
	- The WORDAPP_BACKEND_PORT is the port number for the backend server.  This value will need to be the same  as the port in the WORDAPP_BACKEND_API_URL variable defined in the `.env.local` file for the front end and should not have to be changed.
4. **Install dependencies:**
```bash
npm install
```
5. **Run the development server:**
- Start the backend server.  This terminal will need to remain active to test the frontend applciation.
```bash
npm run build
npm run start:prod
```
#### Build the Frontend
1. Open a terminal window and cd to the wordapp repository directory.
2. Go to the front end directory.  
```
cd frontend
```
3. **Create a `.env.local` file:**    
- Copy `.env.local.example` to `.env.local` and update the environment variable.
	- The WORDAPP_BACKEND_API_URL is the URL for the backend application and should not have to be changed for development.  
	- The WORDAPP_BACKEND_API_KEY is an API key used by the server side of the frontend to access the backend API. This can be  a self generated API key string.   This value will need to be the same as the WORDAPP_BACKEND_API_KEY variable defined in the `.env` file for the backend.
4. **Install dependencies:**
```bash
npm install
```
5. **Run the development server:**
```bash
npm run build
npm run start
```
6. **Open your browser:**
- Visit `http://localhost:3000` to view the application.
## License
This project is licensed under the MIT License. See the LICENSE file for details.
