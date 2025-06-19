# conjug.fr

A french opensource website to revise conjugation in Spanish, and other languages in the future.

We also plan to implement irregular verbs, and a registration system to save scores and set up a ranking.

![image](https://user-images.githubusercontent.com/69462822/235483517-5bde266e-b815-4cb9-9cd8-2ec0ebbb683a.png)

![image](https://user-images.githubusercontent.com/69462822/234614852-9fa6415c-b730-4633-8322-7612806acfdb.png)

## Installation guide

1. **Clone the repository**
   ```bash
   git clone https://github.com/your_username/conjug.git
   cd conjug
   ```

2. **Create a virtual environment (optional)**
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install the dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure the application**
   - Copy `configExemple.py` to `config.py`.
   - Edit `config.py` to set your MySQL connection string and secret key.

5. **Run the application**
   ```bash
   python run.py
   ```
