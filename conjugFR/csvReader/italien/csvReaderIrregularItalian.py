import random
import csv


def verbChoice():
    """retoune un verbe au hasard parmi la liste des verbes irréguliers"""
    with open('conjugFR/timesIrregular/espagnol/Infinitif.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile)
        rows = [row for row in reader]
        random_verbe = random.choice(rows)[0]

        return random_verbe


"""Toutes les fonctions suivantes retoune une liste des corrections selon le temps(nom de la fonction) à partir de fichier csv
    pour les verbes irréguliers"""


def Presente_de_indicativo():
    with open('conjugFR/timesIrregular/espagnol/Presente de indicativo.csv', newline='', encoding='utf8',
              errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]

        return rows


def Presente_de_subjonctivo():
    with open('conjugFR/timesIrregular/espagnol/Presente de subjonctivo.csv', newline='', encoding='utf8',
              errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]

        return rows


def Preterito_imperfecto_de_indicativo():
    with open('conjugFR/timesIrregular/espagnol/Pretérito imperfecto de indicativo.csv', newline='', encoding='utf8',
              errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]

        return rows


def Preterito_indefinido():
    with open('conjugFR/timesIrregular/espagnol/Pretérito indefinido.csv', newline='', encoding='utf8',
              errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]

        return rows


def Pretero_imperfecto_de_subjonctivo():
    with open('conjugFR/timesIrregular/espagnol/Prétero imperfecto de subjonctivo.csv', newline='', encoding='utf8',
              errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]

        return rows


def Futuro():
    with open('conjugFR/timesIrregular/espagnol/Futuro.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]

        return rows


def Conditional():
    with open('conjugFR/timesIrregular/espagnol/Conditional.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]

        return rows
