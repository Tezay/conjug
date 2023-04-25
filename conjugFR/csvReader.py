import random
import csv


def verbChoice():
    """retourne un verbe aléatoire parmi les 720 dans un fichier csv"""
    with open('conjugFR/times/spanishVerbsList.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile)
        rows = [row for row in reader]
        random_verbe = random.choice(rows)[0]
        
        return random_verbe

 """Toutes les fonctions suivante retoune une liste des terminasions selon le temps(nom de la fonction) à partir de fichier csv"""
def Presente_de_indicativo():
    
    with open('conjugFR/times/Presente de indicativo.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
                
        return rows


def Presente_de_subjonctivo():
    
    with open('conjugFR/times/Presente de subjonctivo.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
                
        return rows

    
def Preterito_imperfecto_de_indicativo():
    
    with open('conjugFR/times/Pretérito imperfecto de indicativo.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
        
        return rows


def Preterito_indefinido():
    
    with open('conjugFR/times/Pretérito indefinido.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
                
        return rows


def Pretero_imperfecto_de_subjonctivo():
    
    with open('conjugFR/times/Prétero imperfecto de subjonctivo.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
        
        return rows

def Futuro():
    
    with open('conjugFR/times/Futuro.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
        
        return rows


def Conditional():
    
    with open('conjugFR/times/Conditional.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
        
        return rows   

