#FROM ubuntu:latest
#LABEL authors="soyer"
#
#ENTRYPOINT ["top", "-b"]

FROM python:3.13-slim

WORKDIR /conjug

# Copier le dossier Backend dans /app/Backend (dans le container)
COPY . /conjug/Backend

# Installer gcc, pkg-config, mariadb-client, dev libs, puis les packages Python
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    pkg-config \
    mariadb-client \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/* \
    && pip install --no-cache-dir -r /conjug/Backend/requirements.txt

EXPOSE 5000

CMD ["python", "-m", "Backend.app"]

