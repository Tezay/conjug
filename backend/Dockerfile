FROM python:3.13-slim
WORKDIR /app

RUN apt-get update \
 && apt-get install -y \
      build-essential \
      gcc \
      pkg-config \
      mariadb-client \
      default-libmysqlclient-dev \
      netcat-openbsd \
 && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir backend
COPY . backend/

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD ["python",  "-m", "backend.app"]
EXPOSE 5000