from importlib_metadata import csv
import psycopg2


def pipeline_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="pipeline",
        user="postgres",
        password="root@1234")
    return conn


def database_setup():

    # Open a cursor to perform database operations
    session = pipeline_connection()
    cur = session.cursor()

    # Execute a command: this creates a new table
    try:
        cur.execute('DROP TABLE IF EXISTS youtube;')
        cur.execute('CREATE TABLE youtube (id serial PRIMARY KEY,'
                    'channel_name varchar (150) NOT NULL,'
                    'category varchar (150) NOT NULL,'
                    'subscribers integer NOT NULL,'
                    'audience_country varchar NOT NULL,'
                    'average_views integer NOT NULL,'
                    'average_likes varchar NOT NULL,'
                    'average_comments varchar NOT NULL,'
                    'date_added date DEFAULT CURRENT_TIMESTAMP);'
                    )
        session.commit()
        print("Youtube table created")

        with open('./csv/youtube.csv', 'r') as f:
            reader = csv.reader(f)
            next(reader)  # Skip the header row.
            for row in reader:
                cur.execute(
                    "INSERT INTO youtube VALUES (%s, %s, %s, %s,%s, %s, %s, %s)",
                    row
                )
                print("Youtube Data Inserted")
                session.commit()
    except Exception as error:
        print("Error: ", error)

    # Execute a command: this creates a new table
    try:
        cur.execute('DROP TABLE IF EXISTS instagram;')
        cur.execute('CREATE TABLE instagram (id serial PRIMARY KEY,'
                    'influencer_insta_name varchar (150) NOT NULL,'
                    'category varchar (150) NOT NULL,'
                    'followers integer NOT NULL,'
                    'audience_country varchar NOT NULL,'
                    'authentic_engagement integer NOT NULL,'
                    'engagement_avg integer NOT NULL,'
                    'date_added date DEFAULT CURRENT_TIMESTAMP);'
                    )
        session.commit()
        print("Instagram table created")

        with open('./csv/instagram.csv', 'r') as f:
            reader = csv.reader(f)
            next(reader)  # Skip the header row.
            for row in reader:
                cur.execute(
                    "INSERT INTO instagram VALUES (%s, %s, %s, %s,%s, %s, %s)",
                    row
                )
                print("Instagram Data Inserted")
        session.commit()
    except Exception as error:
        print("Error: ", error)
    session.close()
