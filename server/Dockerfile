# (1) base-image
FROM openjdk:11

# ⭐ 'ARG' 예약어를 통해 인자로 전달 받아야 한다.
ARG MYSQL_USERNAME \
    MYSQL_PASSWORD \
    RDS_ENDPOINT

# ⭐ 'ENV' 예약어를 통해 전달받은 값을 실제 값과 매칭시켜야 한다.
ENV MYSQL_ID=${MYSQL_ID} \
    MYSQL_PASSWORD=${MYSQL_PASSWORD} \
    RDS_ENDPOINT=${RDS_ENDPOINT}

# (2) COPY에서 사용될 경로 변수
ARG JAR_FILE=build/libs/*-SNAPSHOT.jar

# (3) jar 빌드 파일을 도커 컨테이너로 복사
COPY ${JAR_FILE} app.jar

# (4) jar 파일 실행 시 'SPRING_PROFILES_ACTIVE' 환경 변수 지정하여 실행
# 'dev'는 원하는 프로파일로 변경하세요.
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "/app.jar"]