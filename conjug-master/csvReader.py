import random
import csv


def verbChoice():
    
    with open('spanishVerbsList.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile)
        rows = [row for row in reader]
        random_verbe = random.choice(rows)[0]
        
        return random_verbe

def Presente_de_indicativo():
    
    with open('times/Presente de indicativo.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
                
        return rows


def Presente_de_subjonctivo():
    
    with open('times/Presente de subjonctivo.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
                
        return rows

    
def Preterito_imperfecto_de_indicativo():
    
    with open('times/Pretérito imperfecto de indicativo.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
        
        return rows


def Preterito_indefinido():
    
    with open('times/Pretérito indefinido.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
                
        return rows


def Pretero_imperfecto_de_subjonctivo():
    
    with open('times/Prétero imperfecto de subjonctivo.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
        
        return rows

def Futuro():
    
    with open('times/Futuro.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
        
        return rows


def Conditional():
    
    with open('times/Conditional.csv', newline='', encoding='utf8', errors='ignore') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
        
        return rows   

