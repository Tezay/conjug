from . import csvReader
from . import csvReaderIrregular

listPronouns = ["yo", "tú", "él", "nosotros", "vosotros", "ellos"]

correspondanceTime = {
    "Conditional": csvReader.Conditional,
    "Futuro": csvReader.Futuro,
    "Presente de indicativo": csvReader.Presente_de_indicativo,
    "Presente de subjonctivo": csvReader.Presente_de_subjonctivo,
    "Pretérito imperfecto de indicativo": csvReader.Preterito_imperfecto_de_indicativo,
    "Pretérito indefinido": csvReader.Preterito_indefinido,
    "Prétero imperfecto de subjonctivo": csvReader.Pretero_imperfecto_de_subjonctivo,
}

correspondanceTimeIrregular = {
    "Conditional": csvReaderIrregular.Conditional,
    "Futuro": csvReaderIrregular.Futuro,
    "Presente de indicativo": csvReaderIrregular.Presente_de_indicativo,
    "Presente de subjonctivo": csvReaderIrregular.Presente_de_subjonctivo,
    "Pretérito imperfecto de indicativo": csvReaderIrregular.Preterito_imperfecto_de_indicativo,
    "Pretérito indefinido": csvReaderIrregular.Preterito_indefinido,
    "Prétero imperfecto de subjonctivo": csvReaderIrregular.Pretero_imperfecto_de_subjonctivo,
}

correspondanceVerb = ["dar", "decir", "estar", "haber", "hacer", "ir", "poder", "poner", "querer", "saber", "salir",
                      "ser", "tener", "venir", "ver"]

correspondanceTermination = ["ar", "er", "ir"]

