# Use an official Maven image with JDK 24 for building
FROM maven:3.9.9-eclipse-temurin-24 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Run the Maven build with debug output
RUN mvn clean package -DskipTests -X > build.log 2>&1 || (cat build.log && exit 1)

# Use a JRE 24 image for the runtime
FROM eclipse-temurin:24-jre

# Set the working directory for the application
WORKDIR /app

# Copy the built JAR file from the builder stage
COPY --from=builder /app/target/birthdayGift-0.0.1-SNAPSHOT.jar app.jar

# Copy the build log for debugging
COPY --from=builder /app/build.log .

# Expose the default Spring Boot port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]