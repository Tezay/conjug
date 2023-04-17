import random
import csv


def verbChoice():
    
    with open('conjugFR/timesIrregular/Infinitif.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile)
        rows = [row for row in reader]
        random_verbe = random.choice(rows)[0]
        
        return random_verbe

def Presente_de_indicativo():
    
    with open('conjugFR/timesIrregular/Presente de indicativo.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
                
        return rows


def Presente_de_subjonctivo():
    
    with open('conjugFR/timesIrregular/Presente de subjonctivo.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
                
        return rows

    
def Preterito_imperfecto_de_indicativo():
    
    with open('conjugFR/timesIrregular/Pretérito imperfecto de indicativo.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
        
        return rows


def Preterito_indefinido():
    
    with open('conjugFR/timesIrregular/Pretérito indefinido.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
                
        return rows


def Pretero_imperfecto_de_subjonctivo():
    
    with open('conjugFR/timesIrregular/Prétero imperfecto de subjonctivo.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
        
        return rows

def Futuro():
    
    with open('conjugFR/timesIrregular/Futuro.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
        
        return rows


def Conditional():
    
    with open('conjugFR/timesIrregular/Conditional.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
        
        return rows   

