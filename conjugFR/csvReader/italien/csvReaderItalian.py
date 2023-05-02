import random
import csv


def verbChoice():
    """retourne un verbe aléatoire parmi les 720 dans un fichier csv"""
    with open('conjugFR/times/italien/italianVerbsList.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile)
        rows = [row for row in reader]
        random_verbe = random.choice(rows)[0]

        return random_verbe


"""Toutes les fonctions suivante retoune une liste des terminasions selon le temps(nom de la fonction) à partir de fichier csv"""


def Presente_de_indicativo():
    with open('conjugFR/times/italien/présent.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]

        return rows


def imparfait():
    with open('conjugFR/times/italien/imparfait.csv', newline='', encoding='utf8',
              errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]

        return rows


def passe_simple():
    with open('conjugFR/times/italien/passé simple.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]

        return rows


def futur():
    with open('conjugFR/times/italien/futur.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]

        return rows


def conditionnel():
    with open('conjugFR/times/italien/conditionnel.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]

        return rows
