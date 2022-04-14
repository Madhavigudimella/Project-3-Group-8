
 # SM- Analtics- API Readme

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Please find the below steps to run this repo:
> - Set Up Python [3+ recommended] in your system -- I am currently using python 3.10

>  - Create the virtual environment ```python3 -m venv /path/to/new/virtual/environment ``` -- I created a folder call datascrapers and run the command --> `python3 -m venv ./datascrapers
> - Install with pip: ```pip install -r requirements.txt```
> - Setup Postgres Sql in your system and your can use pg admin for visualisation -- the database name is pipeline
> - Add your database name, username & password in database.py file -- see the database.py file for the password and username
> - Uncomment database.py function in app.py only for the first time to create database set then u can make it remain commented.
> - You can update your csv in csv folders make sure don't change file name or field names. -- The two csv are located in that folder
> - Then finally run the project by ```python app.py ```
