import sqlite3,csv
from sqlite3 import Error
import os


FILE = "client_views.db" 
VIEWS_TABLE = "Views"

class DataBasa:
    def __init__(self):
        self.conn = None
        try:
            self.conn = sqlite3.connect(FILE)
        except Error as e:
            print(e)

        self.cursor = self.conn.cursor()
        self._create_table()

    

    def _create_table(self):
        query = f"""CREATE TABLE IF NOT EXISTS {VIEWS_TABLE}
                    (id INTEGER PRIMARY KEY,views INTEGER )"""
        self.cursor.execute(query)
        self.conn.commit()

    def add_shit(self,id,views):
        query = f"INSERT INTO {VIEWS_TABLE} VALUES (?, ?)"
        self.cursor.execute(query, (id,views))

        self.conn.commit()

    def get_by_id(self,id):
        query = f"SELECT * FROM {VIEWS_TABLE} WHERE id = {id}"
        self.cursor.execute(query)


        result = self.cursor.fetchone()
        if not result:
            return None

        id,views = result

        return views

    def update_playlist(self, movie_id):
        query = f"UPDATE {VIEWS_TABLE} set views=? WHERE id = {movie_id}"
        self.cursor.execute(query, 77)
        self.conn.commit()

    def fill_db(self):
        with open('/Volumes/MacOS — данные/Users/mac/Pictures/movix_cumansi/movix_cumansi/react-flask-app/api/models/subscriberid_cnt_view.csv','r') as fin: 
            dr = csv.DictReader(fin)
            to_db = [(i['id'], i['views']) for i in dr]
        
        query = f"INSERT INTO {VIEWS_TABLE} (id, views) VALUES (?, ?);"

        self.cursor.executemany(query, to_db)
        self.conn.commit()

