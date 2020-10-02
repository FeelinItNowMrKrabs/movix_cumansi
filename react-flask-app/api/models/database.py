import sqlite3
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
                    (views INTEGER,id INTEGER PRIMARY KEY )"""
        self.cursor.execute(query)
        self.conn.commit()

    def add_shit(self,views,id):
        query = f"INSERT INTO {VIEWS_TABLE} VALUES (?, ?)"
        self.cursor.execute(query, (views,id))

        self.conn.commit()

    def get_by_id(self,id):
        query = f"SELECT * FROM {VIEWS_TABLE} WHERE id = {id}"
        self.cursor.execute(query)


        result = self.cursor.fetchone()
        if not result:
            return None

        views,id = result

        return views

    def update_playlist(self, movie_id):
        query = f"UPDATE {VIEWS_TABLE} set views=? WHERE id = {movie_id}"
        self.cursor.execute(query, 77)
        self.conn.commit()


db = DataBasa()
print(db.get_by_id(32))