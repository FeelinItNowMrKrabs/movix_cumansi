import csv
from clickhouse_driver import connect

conn = connect('clickhouse://localhost')
cursor = conn.cursor()
cursor.execute('DROP TABLE IF EXISTS events')

cursor.execute('CREATE TABLE events ('
                'subscriberid Int64, deviceid UInt64, '
                'itemtype String, eventtype UInt64, assetid UInt64, platformid String, '
                'extidcity String,ts UInt64, progressvalue Float64'
                ') ENGINE = MergeTree '
                'ORDER BY (ts)')

with open('/home/peter/Desktop/main project/movix_cumansi/vod_events_sr.csv') as events:
    rows = []
    for n, line in enumerate(csv.reader(events)):
        if n > 15000000:
            break
        elif n == 0:
            continue
        elif n % 1000000 == 0:
            print(n)
        subscriberid = int(line[0])
        deviceid = int(line[1])
        itemtype = str(line[2])
        eventtype = int(line[3])
        assetid = int(line[4])
        platformid = int(line[5])
        extidcity = str(line[6])
        ts = int(line[7])
        progressvalue = float(line[8]) if line[8] != '' else 0
        rows.append([subscriberid, deviceid, itemtype, 
                     eventtype, assetid, platformid, 
                     extidcity, ts, progressvalue])


# List of rows is materialized. 
cursor.executemany('INSERT INTO events (subscriberid, deviceid) VALUES', [[rows[0][:2]]])


cursor.executemany('INSERT INTO events (subscriberid, deviceid, itemtype, '
                    'eventtype, assetid, platformid, '
                    'extidcity, ts, progressvalue) VALUES', rows)


cursor.executemany('INSERT INTO events (subscriberid, deviceid, itemtype, '
                    'eventtype, assetid, platformid, '
                    'extidcity, ts, progressvalue) VALUES', rows)


cursor.executemany('INSERT INTO events (subscriberid, deviceid, itemtype, '
                    'eventtype, assetid, platformid, '
                    'extidcity, ts, progressvalue) VALUES', rows)

cursor.executemany('INSERT INTO events (subscriberid, deviceid, itemtype, '
                    'eventtype, assetid, platformid, '
                    'extidcity, ts, progressvalue) VALUES', rows)


cursor.executemany('INSERT INTO events (subscriberid, deviceid, itemtype, '
                    'eventtype, assetid, platformid, '
                    'extidcity, ts, progressvalue) VALUES', rows)