# Use an official OpenJDK runtime as the base image
FROM openjdk:11-jre-slim

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the target folder to the container
COPY target/achat-1.0.jar /app/achat-1.0.jar

# Expose the port configured in application.properties (8089)
EXPOSE 8089
RUN mkdir -p /logs
VOLUME /logs

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/achat-1.0.jar"]

