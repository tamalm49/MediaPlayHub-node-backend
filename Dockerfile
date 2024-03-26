# Use Ubuntu as a base image
    FROM ubuntu:20.04
# Argument
    ARG buildname
    ARG ENV
# Define Variable
    ENV APP=mediaplayhub
    ENV PROJECT=mediaplayhub-node-backend
    ENV OS=linux
# TimeZone
    ENV DEBIAN_FRONTEND noninteractive
    ENV TZ=Asia/Kolkata
    RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# Set the working directory in the container
    WORKDIR /opt/${PROJECT}
    RUN mkdir -p /opt/${PROJECT}
# Install necessary packages
    RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

    RUN apt-get update
    RUN apt-get install -y nodejs
    RUN apt-get clean


# Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install app dependencies
# RUN npm install

# Copy the rest of the application code
COPY . /opt/${PROJECT}
# Install app dependencies
RUN npm install


# Compile TypeScript code to JavaScript (if applicable)
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD ["npm","run", "service"]
