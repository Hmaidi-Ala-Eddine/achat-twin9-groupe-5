# Use an official OpenJDK runtime as the base image
FROM openjdk:11-jdk


# Copier le fichier JAR dans le conteneur
COPY target/achat-1.0.jar backend.jar

# Exécuter le fichier JAR
ENTRYPOINT ["java", "-jar", "backend.jar"]


# Expose the port configured in application.properties (8089)
EXPOSE 8089


