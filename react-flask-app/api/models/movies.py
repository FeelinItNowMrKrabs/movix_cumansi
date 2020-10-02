import sqlite3,csv
from sqlite3 import Error
import os


FILE = "movies.db" 
MOVIES_TABLE = "Movies"

class Movies:
    def __init__(self):
        self.conn = None
        try:
            self.conn = sqlite3.connect(FILE)
        except Error as e:
            print(e)

        self.cursor = self.conn.cursor()
        self._create_table()

    

    def _create_table(self):
        query = f"""CREATE TABLE IF NOT EXISTS {MOVIES_TABLE}
                    (assetid INTEGER PRIMARY KEY,event_count INTEGER,title TEXT)"""
        self.cursor.execute(query)
        self.conn.commit()

    def add_shit(self,id,event,title):
        query = f"INSERT INTO {MOVIES_TABLE} VALUES (?, ?,?)"
        self.cursor.execute(query, (id,event,title))

        self.conn.commit()

    def get_by_id(self,id):
        query = f"SELECT * FROM {MOVIES_TABLE} WHERE assetid = {id}"
        self.cursor.execute(query)


        result = self.cursor.fetchone()
        if not result:
            return None

        id,event,title = result

        return title

    def get_first_five(self):

        self.cursor.execute(f"SELECT assetid,event_count,title FROM {MOVIES_TABLE} LIMIT 5")

        result = self.cursor.fetchall()
        return result

 
    def fill_db(self):
        with open('/Volumes/MacOS — данные/Users/mac/Pictures/movix_cumansi/movix_cumansi/react-flask-app/api/models/boeviki.csv','r') as fin: 
            dr = csv.DictReader(fin)
            to_db = [(i['assetid'], i['event_count'],i['title']) for i in dr]
        
        query = f"INSERT INTO {MOVIES_TABLE} (assetid, event_count,title) VALUES (?, ?, ?);"

        self.cursor.executemany(query, to_db)
        self.conn.commit()

db = Movies()

print(db.get_first_five())
