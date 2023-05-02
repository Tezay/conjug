from .csvReader.espagnol import csvReaderIrregular, csvReader
from . import models

# espagnol

listPronouns = ["yo", "tú", "él", "nosotros", "vosotros", "ellos"]  # liste des pronoms personnels espagnol

correspondanceTime = {
    "Conditional": csvReader.Conditional,
    "Futuro": csvReader.Futuro,
    "Presente de indicativo": csvReader.Presente_de_indicativo,
    "Presente de subjonctivo": csvReader.Presente_de_subjonctivo,
    "Pretérito imperfecto de indicativo": csvReader.Preterito_imperfecto_de_indicativo,
    "Pretérito indefinido": csvReader.Preterito_indefinido,
    "Prétero imperfecto de subjonctivo": csvReader.Pretero_imperfecto_de_subjonctivo,
}  # dictionnaire des temps correspondant à leurs terminasons pour les verbes réguliers

correspondanceTimeIrregular = {
    "Conditional": csvReaderIrregular.Conditional,
    "Futuro": csvReaderIrregular.Futuro,
    "Presente de indicativo": csvReaderIrregular.Presente_de_indicativo,
    "Presente de subjonctivo": csvReaderIrregular.Presente_de_subjonctivo,
    "Pretérito imperfecto de indicativo": csvReaderIrregular.Preterito_imperfecto_de_indicativo,
    "Pretérito indefinido": csvReaderIrregular.Preterito_indefinido,
    "Prétero imperfecto de subjonctivo": csvReaderIrregular.Pretero_imperfecto_de_subjonctivo,
}  # dictionnaire des temps correspondant à leurs corrections pour les verbes irréguliers

correspondanceVerb = ["dar", "decir", "estar", "haber", "hacer", "ir", "poder", "poner", "querer", "saber", "salir",
                      "ser", "tener", "venir", "ver"]  # liste de tout les verbes irréguliers des fichiers csv

correspondanceTermination = ["ar", "er", "ir"]  # liste des terminaisons possibles à l'infinitif


# autre

def classements():
    user = models.User.query.all()
    dict_classement_base = {}

    for val in user:
        if val.username != "test":
            dict_classement_base.update({val.username: val.xp})

    dict_classement_final = {}
    i = 0
    for k, v in sorted(dict_classement_base.items(), key=lambda
            item: item[1], reverse=True):
        i += 1
        dict_classement_final.update({i: (k, v)})

    return dict_classement_final


def classement_month():
    user = models.User.query.all()
    dict_classement_base = {}

    for val in user:
        if val.username != "test":
            dict_classement_base.update({val.username: val.xp_month})

    dict_classement_final = {}
    i = 0
    for k, v in sorted(dict_classement_base.items(), key=lambda
            item: item[1], reverse=True):
        i += 1
        dict_classement_final.update({i: (k, v)})

    return dict_classement_final


def classement_week():
    user = models.User.query.all()
    dict_classement_base = {}

    for val in user:
        if val.username != "test":
            dict_classement_base.update({val.username: val.xp_week})

    dict_classement_final = {}
    i = 0
    for k, v in sorted(dict_classement_base.items(), key=lambda
            item: item[1], reverse=True):
        i += 1
        dict_classement_final.update({i: (k, v)})

    return dict_classement_final


def utilisateurs():
    user = models.User.query.all()
    utilisateurs = {}

    for val in user:
        if val.username != "test":
            utilisateurs.update({val.username: val.logo})

    return utilisateurs


"""
Fonction : Récuperer les colonnes d'une table 
def getColumn():
    return User.query.with_entities(ICI LES COLONNES).all()
"""
