from . import csvReader
from . import csvReaderIrregular

listPronouns = ["yo", "tú", "él", "nosotros", "vosotros", "ellos"] #liste des pronoms personnels espagnol

correspondanceTime = {
    "Conditional": csvReader.Conditional,
    "Futuro": csvReader.Futuro,
    "Presente de indicativo": csvReader.Presente_de_indicativo,
    "Presente de subjonctivo": csvReader.Presente_de_subjonctivo,
    "Pretérito imperfecto de indicativo": csvReader.Preterito_imperfecto_de_indicativo,
    "Pretérito indefinido": csvReader.Preterito_indefinido,
    "Prétero imperfecto de subjonctivo": csvReader.Pretero_imperfecto_de_subjonctivo,
} #dictionnaire des temps correspondant à leurs terminasons pour les verbes réguliers

correspondanceTimeIrregular = {
    "Conditional": csvReaderIrregular.Conditional,
    "Futuro": csvReaderIrregular.Futuro,
    "Presente de indicativo": csvReaderIrregular.Presente_de_indicativo,
    "Presente de subjonctivo": csvReaderIrregular.Presente_de_subjonctivo,
    "Pretérito imperfecto de indicativo": csvReaderIrregular.Preterito_imperfecto_de_indicativo,
    "Pretérito indefinido": csvReaderIrregular.Preterito_indefinido,
    "Prétero imperfecto de subjonctivo": csvReaderIrregular.Pretero_imperfecto_de_subjonctivo,
} #dictionnaire des temps correspondant à leurs corrections pour les verbes irréguliers

correspondanceVerb = ["dar", "decir", "estar", "haber", "hacer", "ir", "poder", "poner", "querer", "saber", "salir",
                      "ser", "tener", "venir", "ver"] #liste de tout les verbes irréguliers des fichiers csv

correspondanceTermination = ["ar", "er", "ir"] #liste des terminaisons possibles à l'infinitif
