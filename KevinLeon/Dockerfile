# Etapa 1: Construcción del proyecto
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copiar archivo pom.xml
COPY pom.xml .

# Descargar dependencias para acelerar compilación
RUN mvn dependency:go-offline

# Copiar código fuente
COPY src ./src

# Compilar y generar JAR
RUN mvn clean package -DskipTests

# Etapa 2: Imagen ligera para producción
FROM eclipse-temurin:21-jdk-alpinesi

WORKDIR /app

# Copiar el JAR generado
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

# Comando de ejecución
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
