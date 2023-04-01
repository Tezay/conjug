import random
import csv


def verbChoice():
    
    with open('times irregular/infinitif.csv', newline='') as csvfile:
        reader = csv.reader(csvfile)
        rows = [row for row in reader]
        random_verbe = random.choice(rows)[0]
        
        return random_verbe

def Presente_de_indicativo():
    
    with open('times irregular/Presente de indicativo.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
                
        return rows


def Presente_de_subjonctivo():
    
    with open('times irregular/Presente de subjonctivo.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
                
        return rows

    
def Preterito_imperfecto_de_indicativo():
    
    with open('times irregular/Pretérito imperfecto de indicativo.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
        
        return rows


def Preterito_indefinido():
    
    with open('times irregular/Pretérito indefinido.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
                
        return rows


def Pretero_imperfecto_de_subjonctivo():
    
    with open('times irregular/Prétero imperfecto de subjonctivo.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
        
        return rows

def Futuro():
    
    with open('times irregular/Futuro.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
        
        return rows


def Conditional():
    
    with open('times irregular/Conditional.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        rows = [row for row in reader]
        
        return rows   

