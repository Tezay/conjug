from .csvReader.espagnol import csvReaderIrregularSpanish, csvReaderSpanish
from .csvReader.italien import csvReaderIrregularItalian, csvReaderItalian
from . import models

# espagnol

listPronounsSpanish = ["yo", "tú", "él", "nosotros", "vosotros", "ellos"]  # liste des pronoms personnels espagnol

correspondanceTimeSpanish = {
    "Conditional": csvReaderSpanish.Conditional,
    "Futuro": csvReaderSpanish.Futuro,
    "Presente de indicativo": csvReaderSpanish.Presente_de_indicativo,
    "Presente de subjonctivo": csvReaderSpanish.Presente_de_subjonctivo,
    "Pretérito imperfecto de indicativo": csvReaderSpanish.Preterito_imperfecto_de_indicativo,
    "Pretérito indefinido": csvReaderSpanish.Preterito_indefinido,
    "Prétero imperfecto de subjonctivo": csvReaderSpanish.Pretero_imperfecto_de_subjonctivo,
}  # dictionnaire des temps correspondant à leurs terminasons pour les verbes réguliers

correspondanceTimeIrregularSpanish = {
    "Conditional": csvReaderIrregularSpanish.Conditional,
    "Futuro": csvReaderIrregularSpanish.Futuro,
    "Presente de indicativo": csvReaderIrregularSpanish.Presente_de_indicativo,
    "Presente de subjonctivo": csvReaderIrregularSpanish.Presente_de_subjonctivo,
    "Pretérito imperfecto de indicativo": csvReaderIrregularSpanish.Preterito_imperfecto_de_indicativo,
    "Pretérito indefinido": csvReaderIrregularSpanish.Preterito_indefinido,
    "Prétero imperfecto de subjonctivo": csvReaderIrregularSpanish.Pretero_imperfecto_de_subjonctivo,
}  # dictionnaire des temps correspondant à leurs corrections pour les verbes irréguliers

correspondanceVerbSpanish = ["dar", "decir", "estar", "haber", "hacer", "ir", "poder", "poner", "querer", "saber", "salir",
                      "ser", "tener", "venir", "ver"]  # liste de tout les verbes irréguliers des fichiers csv

correspondanceTerminationSpanish = ["ar", "er", "ir"]  # liste des terminaisons possibles à l'infinitif

# italien

listPronounsItalian = ["io", "tu", "lui", "noi", "voi", "loro"]

correspondanceTimeItalian = {
    "conditionnel": csvReaderItalian.conditionnel,
    "futur": csvReaderItalian.futur,
    "présent": csvReaderItalian.present,
    "imparfait": csvReaderItalian.imparfait,
    "passé simple": csvReaderItalian.passe_simple,
}  # dictionnaire des temps correspondant à leurs terminasons pour les verbes réguliers

correspondanceTerminationItalian = ["are", "ere", "ire"]  # liste des terminaisons possibles à l'infinitif


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
        dict_classement_final.update({i: [k, v]})

    for val in user:
        if val.username != "test":
            for place in dict_classement_final:
                if val.username == dict_classement_final[place][0]:
                    dict_classement_final[place].append(val.logo)

    return dict_classement_final


def classement_month():
    user = models.User.query.all()
    dict_classement_base = {}

    for val in user:
        if val.username != "test":
            dict_classement_base.update({val.username: val.XP_month})

    dict_classement_final = {}
    i = 0
    for k, v in sorted(dict_classement_base.items(), key=lambda
            item: item[1], reverse=True):
        i += 1
        dict_classement_final.update({i: [k, v]})

    i = 0
    for val in user:
        if val.username != "test":
            for place in dict_classement_final:
                if val.username == dict_classement_final[place][0]:
                    dict_classement_final[place].append(val.logo)

    return dict_classement_final


def classement_week():
    user = models.User.query.all()
    dict_classement_base = {}

    for val in user:
        if val.username != "test":
            dict_classement_base.update({val.username: val.XP_week})

    dict_classement_final = {}
    i = 0
    for k, v in sorted(dict_classement_base.items(), key=lambda
            item: item[1], reverse=True):
        i += 1
        dict_classement_final.update({i: [k, v]})

    i = 0
    for val in user:
        if val.username != "test":
            for place in dict_classement_final:
                if val.username == dict_classement_final[place][0]:
                    dict_classement_final[place].append(val.logo)

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
