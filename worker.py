"""
worker.py
Runs SNMP polling loop separately from web server.

Data structures:
- dict (O(1) lookup)
- threading

Time complexity:
- O(D * I) per cycle
"""

from main import pollLoop
from database import initDb


def main():
    initDb()
    pollLoop()


if __name__ == "__main__":
    main()
