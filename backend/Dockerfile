# ─── Stage 1: Production builder ─────────────────────────────────────────────
FROM python:3.13-slim AS builder

WORKDIR /app

# Install build tools & MySQL client headers
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      build-essential \
      gcc \
      pkg-config \
      default-libmysqlclient-dev \
      netcat-openbsd \
 && rm -rf /var/lib/apt/lists/*

# Set up a virtualenv and install Python deps
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt

# Copy your backend code
COPY . ./backend

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# create a non-root user (optional but recommended)
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

# Dev-mode command
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "--threads", "4", "backend.wsgi:app"]


# ─── Stage 2: Development ────────────────────────────────────────────────────
FROM python:3.13-slim AS dev

WORKDIR /app

# Install runtime dependencies (incl. MariaDB client & netcat)
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      mariadb-client \
      default-libmysqlclient-dev \
      netcat-openbsd \
 && rm -rf /var/lib/apt/lists/*

# Copy & install Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy code & entrypoint
RUN mkdir backend
COPY . backend/

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Dev-mode command
ENTRYPOINT ["/entrypoint.sh"]
CMD ["python", "-m", "backend.app"]

EXPOSE 5000