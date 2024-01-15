module.exports = {
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  "moduleNameMapper": {
    "^.+\\.(css|less|scss)$": "babel-jest"
  },
  testEnvironment: 'jsdom',


};