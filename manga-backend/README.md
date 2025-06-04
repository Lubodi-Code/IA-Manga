# Manga Backend Project

This project is a backend service for generating manga-style images using AI. It utilizes the Hugging Face Inference API to create images based on user-provided stories and reference images.

## Project Structure

```
manga-backend
├── src
│   ├── controllers
│   │   └── imageController.js      # Handles image generation requests
│   ├── routes
│   │   └── index.js                 # Defines API routes
│   ├── services
│   │   └── huggingfaceService.js     # Interacts with Hugging Face API
│   ├── utils
│   │   └── modelValidator.js         # Validates model availability
│   └── server.js                     # Main entry point of the application
├── tests
│   └── imageController.test.js       # Unit tests for the image controller
├── .env                               # Environment variables
├── .gitignore                         # Git ignore file
├── package.json                       # Project metadata and dependencies
├── README.md                          # Project documentation
└── jest.config.js                    # Jest configuration for testing
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd manga-backend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values, including your Hugging Face API token.

4. **Run the server:**
   ```
   npm run dev
   ```
   The server will start on `http://localhost:3000`.

## Usage

To generate an image, send a POST request to the `/generar` endpoint with the following form data:

- `historia`: A string containing the story or description.
- `pagina`: (optional) A string indicating the page number.
- `imagen`: A file upload for the reference image (PNG format).

### Example Request

Using Postman or similar tools, set up a request as follows:

- **URL:** `http://localhost:3000/generar`
- **Method:** POST
- **Body:** form-data
  - Key: `historia`, Value: "Your story here"
  - Key: `pagina`, Value: "1" (optional)
  - Key: `imagen`, Value: [Select your image file]

## Running Tests

To run the tests, use the following command:

```
npm test
```

This will execute the unit tests defined in the `tests` directory and provide a coverage report.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.