# Use an OpenJDK base image for Java
FROM eclipse-temurin:17

# Set working directory
WORKDIR /app

# Copy application JAR file
COPY weather-0.0.1-SNAPSHOT.jar main.jar
COPY opentelemetry-javaagent.jar opentelemetry-javaagent.jar

EXPOSE 7093
RUN chmod +x main.jar
CMD ["java", "-Dotel.exporter.otlp.endpoint=http://jaeger:4318", "-javaagent:/app/opentelemetry-javaagent.jar", "-Dserver.port=7093", "-jar", "main.jar"]
