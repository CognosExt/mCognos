# Installing

1. Clone the project on your local machine
2. Make sure you have [nodejs](https://nodejs.org) installed
3. Install the npm packages

  ```
  npm install
  ```

## Android

- Make sure you have Android Studio installed and adb in your path

  ```
  cordova platform add android
  cordova run android
  ```

## Browser

- Just:

  ```
  cordova run browser -- --lr
  ```

  That will run the application in the browser and hot-reload when you change any file in /src
