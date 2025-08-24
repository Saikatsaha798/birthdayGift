# Use an official Maven image with JDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Run the Maven build
RUN mvn clean package -DskipTests

# Use a slim JDK 21 image for the runtime
FROM eclipse-temurin:21-jre-slim

# Set the working directory for the application
WORKDIR /app

# Copy the built JAR file from the builder stage
COPY --from=builder /app/target/birthdayGift-0.0.1-SNAPSHOT.jar app.jar

# Expose the default Spring Boot port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]