<h1 align="center">Denisonweb Utility Functions Repository</h1>

<br>

This repository contains a collection of utility functions written in TypeScript along with their corresponding tests.

## Getting Started

Before you begin, make sure you have [Node.js](https://nodejs.org/) installed on your system.

### Installation

1. Clone the repository:  
  ```git clone https://github.com/jordandenison/utils.git```

2. Navigate to the project directory:  
   ```cd utils```

3. Install the dependencies:  
   ```npm i```

### Installation and usage with Docker

1. Clone the repository:  
  ```git clone https://github.com/jordandenison/utils.git```

2. Navigate to the project directory:  
   ```cd utils```

3. Build the Docker image:  
   ```docker build -t utils .```

4. Run the Docker image:  
   ```docker run -v $(pwd):/usr/src/app -it utils```

### Usage in a project

1. Install the package:  
  ```npm i https://github.com/jordandenison/utils.git```

2. Example usage  
   ```javascript
    import { capitalizeFirstLetter } from 'utils';

    const result = capitalizeFirstLetter('hello');
    console.log(result); // Outputs: "Hello"
    ```

## Running Tests

To run the tests, use the following command in the project directory:  
```npm test```

## Contribution

If you would like to contribute to the project, please fork the repository and create a pull request.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/YourFeature)
3. Commit your Changes (git commit -m 'Add some YourFeature')
4. Push to the Branch (git push origin feature/YourFeature)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Jordan Denison - [@canadianwifi](https://twitter.com/canadianwifi) - jordan@denisonweb.com

Project Link: [https://github.com/jordandenison/utils](https://github.com/jordandenison/utils)
