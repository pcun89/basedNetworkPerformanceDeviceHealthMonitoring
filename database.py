"""
database.py
SQLite persistence layer.

Data structures:
- SQLite tables (devices, metrics, alerts)
Time complexity:
- Inserts: O(1)
- Queries: O(n)
"""

import sqlite3
from typing import List, Tuple

DB_NAME = "network.db"


def getConnection():
    return sqlite3.connect(DB_NAME, check_same_thread=False)


def initDb():
    conn = getConnection()
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS devices (
        host TEXT PRIMARY KEY,
        community TEXT,
        last_seen INTEGER
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS metrics (
        host TEXT,
        ts INTEGER,
        ifIndex INTEGER,
        inBytes INTEGER,
        outBytes INTEGER
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS alerts (
        id INTEGER PRIMARY KEY,
        severity INTEGER,
        ts INTEGER,
        message TEXT
    )
    """)

    conn.commit()
    conn.close()


def upsertDevice(host: str, community: str, ts: int):
    conn = getConnection()
    cur = conn.cursor()
    cur.execute("""
    INSERT INTO devices (host, community, last_seen)
    VALUES (?, ?, ?)
    ON CONFLICT(host) DO UPDATE SET last_seen=excluded.last_seen
    """, (host, community, ts))
    conn.commit()
    conn.close()


def addMetrics(host: str, ts: int, ifIndex: int, inBytes: int, outBytes: int):
    conn = getConnection()
    cur = conn.cursor()
    cur.execute("""
    INSERT INTO metrics VALUES (?, ?, ?, ?, ?)
    """, (host, ts, ifIndex, inBytes, outBytes))
    conn.commit()
    conn.close()


def addAlert(alertId: int, severity: int, ts: int, message: str):
    conn = getConnection()
    cur = conn.cursor()
    cur.execute("""
    INSERT INTO alerts VALUES (?, ?, ?, ?)
    """, (alertId, severity, ts, message))
    conn.commit()
    conn.close()


def recentAlerts(limit: int) -> List[Tuple]:
    conn = getConnection()
    cur = conn.cursor()
    cur.execute("""
    SELECT * FROM alerts ORDER BY severity DESC, ts DESC LIMIT ?
    """, (limit,))
    rows = cur.fetchall()
    conn.close()
    return rows


def recentMetrics(host: str, limit: int):
    conn = getConnection()
    cur = conn.cursor()
    cur.execute("""
    SELECT ts, ifIndex, inBytes, outBytes
    FROM metrics
    WHERE host=?
    ORDER BY ts DESC
    LIMIT ?
    """, (host, limit))
    rows = cur.fetchall()
    conn.close()
    return rows
