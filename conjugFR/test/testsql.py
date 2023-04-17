import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base

# Define the MariaDB engine using MariaDB Connector/Python
engine = sqlalchemy.create_engine("mariadb+mariadbconnector://app_user:Password123!@127.0.0.1:3306/company")

Base = declarative_base()

class Employee(Base):
   __tablename__ = 'employees'
   id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
   firstname = sqlalchemy.Column(sqlalchemy.String(length=100))
   lastname = sqlalchemy.Column(sqlalchemy.String(length=100))
   active = sqlalchemy.Column(sqlalchemy.Boolean, default=True)

Base.metadata.create_all(engine)

# Create a session
Session = sqlalchemy.orm.sessionmaker()
Session.configure(bind=engine)
session = Session()

def addEmployee(firstName,lastName):
   newEmployee = Employee(firstname=firstName, lastname=lastName)
   session.add(newEmployee)
   session.commit()

def selectAll():
   employees = session.query(Employee).all()
   for employee in employees:
       print(" - " + employee.firstname + ' ' + employee.lastname)

def selectByStatus(isActive):
   employees = session.query(Employee).filter_by(active=isActive)
   for employee in employees:
       print(" - " + employee.firstname + ' ' + employee.lastname)

def updateEmployeeStatus(id, isActive):
   employee = session.query(Employee).get(id)
   employee.active = isActive
   session.commit()

def deleteEmployee(id):
   session.query(Employee).filter(Employee.id == id).delete()
   session.commit()

# Add some new employees
addEmployee("Bruce", "Wayne")
addEmployee("Diana", "Prince")
addEmployee("Clark", "Kent")

# Show all employees
print('All Employees')
selectAll()
print("----------------")

# Update employee status
updateEmployeeStatus(2,False)

# Show active employees
print('Active Employees')
selectByStatus(True)
print("----------------")

# Delete employee
deleteEmployee(1)

# Show all employees
print('All Employees')
selectAll()
print("----------------")