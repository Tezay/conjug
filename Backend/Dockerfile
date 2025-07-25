FROM python:3.13-slim

# Définir le répertoire de travail à la racine de l’application
WORKDIR /app

# Optimisations pour Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Installation d'éventuelles dépendances système (build tools, client MariaDB et netcat-openbsd)
RUN apt-get update && apt-get install -y build-essential \
    gcc pkg-config mariadb-client default-libmysqlclient-dev netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Copier le fichier des dépendances et installer les packages Python
COPY Backend/requirements.txt ./Backend/requirements.txt
RUN pip install --upgrade pip && pip install -r ./Backend/requirements.txt

# Copier l'intégralité du dossier Backend dans /app/Backend
COPY Backend ./Backend

# Copier le script wait-for-it.sh depuis le répertoire parent (vérifiez le chemin si nécessaire)
COPY Backend/entrypoint.sh Backend/entrypoint.sh
RUN chmod +x Backend/entrypoint.sh
ENTRYPOINT ["Backend/entrypoint.sh"]

# Exposer le port utilisé par l’application Flask
EXPOSE 5000

# Lancer l’application via wait-for-it.sh pour attendre que MariaDB soit prêt
CMD ["python", "-m", "Backend.app"]