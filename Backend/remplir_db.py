from backend import create_app, db
from backend.models import ConjugaisonVerbe, ConjugaisonRegulier

def populate_spanish_verbs():
    """Populate the database with Spanish regular verbs"""

    # Spanish regular verbs (10 examples)
    spanish_verbs = [
        # -ar verbs
        "hablar",    # to speak
        "caminar",   # to walk
        "estudiar",  # to study
        "trabajar",  # to work
        # -er verbs
        "comer",     # to eat
        "beber",     # to drink
        "aprender",  # to learn
        # -ir verbs
        "vivir",     # to live
        "escribir",  # to write
        "abrir"      # to open
    ]

    print("Adding Spanish regular verbs...")
    for verb in spanish_verbs:
        existing_verb = ConjugaisonVerbe.query.filter_by(
            language="es",
            verb=verb,
            verb_type="regulier"
        ).first()

        if not existing_verb:
            new_verb = ConjugaisonVerbe(
                language="es",
                verb_type="regulier",
                verb=verb
            )
            db.session.add(new_verb)
            print(f"  Added: {verb}")
        else:
            print(f"  Already exists: {verb}")

def populate_spanish_regular_endings():
    """Populate the database with Spanish present indicative regular endings"""

    # Spanish present indicative endings
    spanish_endings = [
        {
            "language": "es",
            "tense": "present_ind",
            "verb_group": "ar",
            "prem_pers_sing": "o",      # yo hablo
            "deux_pers_sing": "as",     # tú hablas
            "trois_pers_sing": "a",     # él/ella habla
            "prem_pers_plur": "amos",   # nosotros hablamos
            "deux_pers_plur": "áis",    # vosotros habláis
            "trois_pers_plur": "an"     # ellos/ellas hablan
        },
        {
            "language": "es",
            "tense": "present_ind",
            "verb_group": "er",
            "prem_pers_sing": "o",      # yo como
            "deux_pers_sing": "es",     # tú comes
            "trois_pers_sing": "e",     # él/ella come
            "prem_pers_plur": "emos",   # nosotros comemos
            "deux_pers_plur": "éis",    # vosotros coméis
            "trois_pers_plur": "en"     # ellos/ellas comen
        },
        {
            "language": "es",
            "tense": "present_ind",
            "verb_group": "ir",
            "prem_pers_sing": "o",      # yo vivo
            "deux_pers_sing": "es",     # tú vives
            "trois_pers_sing": "e",     # él/ella vive
            "prem_pers_plur": "imos",   # nosotros vivimos
            "deux_pers_plur": "ís",     # vosotros vivís
            "trois_pers_plur": "en"     # ellos/ellas viven
        }
    ]

    print("Adding Spanish present indicative endings...")
    for ending_data in spanish_endings:
        existing_ending = ConjugaisonRegulier.query.filter_by(
            language=ending_data["language"],
            tense=ending_data["tense"],
            verb_group=ending_data["verb_group"]
        ).first()

        if not existing_ending:
            new_ending = ConjugaisonRegulier(**ending_data)
            db.session.add(new_ending)
            print(f"  Added endings for: {ending_data['verb_group']} verbs")
        else:
            print(f"  Already exists: {ending_data['verb_group']} endings")

def main():
    """Main function to populate the database"""
    app = create_app()

    with app.app_context():
        print("Starting database population for Spanish...")

        # Create tables if they don't exist
        db.create_all()

        # Populate verbs and endings
        populate_spanish_verbs()
        populate_spanish_regular_endings()

        # Commit all changes
        try:
            db.session.commit()
            print("\n✅ Database populated successfully!")
        except Exception as e:
            db.session.rollback()
            print(f"\n❌ Error populating database: {e}")
            raise

if __name__ == "__main__":
    main()