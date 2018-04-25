![alt tag](http://ctnovatec.com.br/wp-content/uploads/2015/03/nodejs-logo.png)

## Installation process

To get started, you can simply clone this repository and install the dependencies:

### Prerequisites

#### 1. Git

You must have GIT to clone this repository:

```
sudo apt-get update
sudo apt-get install git
```

#### 2. Node.js and Npm

You must have node.js and its package manager (npm) installed.

```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Install dependencies

We get the tools we depend upon via `npm`. And install 

```
npm install
```

if nightmare show error 'EACCES: permission denied', use this command:

```
sudo npm install nightmare --unsafe-perm=true --allow-root
```

You should find that you have two new folder in your project.

* `node_modules` - contains the npm packages for the tools we need such as express and mongoose

### Run application
```
npm run recovery
```

## Adding New Tests

Create folder test inside folder
