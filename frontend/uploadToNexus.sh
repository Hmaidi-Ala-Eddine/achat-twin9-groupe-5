#!/bin/bash

# Récupération du nom et de la version depuis package.json
PACKAGE_NAME=$(node -p "require('./package.json').name")
VERSION=$(node -p "require('./package.json').version")
TAR_FILE="${PACKAGE_NAME}-${VERSION}.tgz"

# URL de ton Nexus
NEXUS_URL="http://localhost:8081/repository/raw-frontend-releases"

# Identifiants Nexus
NEXUS_USER="admin"
NEXUS_PASS="pacman23"

# 1. Générer le fichier .tgz avec npm pack
echo "Génération du fichier .tgz avec npm pack..."
npm pack

# Vérifier si le fichier a été créé
if [ ! -f "$TAR_FILE" ]; then
  echo "Erreur : Le fichier $TAR_FILE n'a pas été trouvé après npm pack."
  exit 1
fi

# 2. Uploader le fichier sur Nexus via curl
echo "Uploading $TAR_FILE to Nexus..."
curl -v -u $NEXUS_USER:$NEXUS_PASS --upload-file $TAR_FILE $NEXUS_URL/$PACKAGE_NAME/$VERSION/$TAR_FILE

# Résultat
if [ $? -eq 0 ]; then
  echo "✅ Upload réussi !"
else
  echo "❌ Erreur lors de l'upload."
  exit 1
fi
