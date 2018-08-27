#!/usr/bin/env python3

from collections import namedtuple
from optparse import IndentedHelpFormatter, OptionGroup, OptionParser
import os.path

Coordinates = namedtuple("Coordinates", "lat lon")

VISITED_ACTIONS = (
    "created field",
    "created link",
    "hacked enemy portal",
    "hacked friendly portal",
    "hacked neutral portal",
    "resonator deployed",
    "resonator upgraded",
)

CAPTURED_ACTIONS = (
    "captured portal",
)


def parse_game_log(game_log_path):
    visited = set()
    captured = set()

    with open(game_log_path) as fp:
        header = fp.readline().rstrip("\n").split("\t")
        if tuple(header) != ("Event Time", "Event Lat", "Event Lng", "Tracker Trigger", "Comments"):
            raise RuntimeError("Malformed data in game_log.tsv")

        line = fp.readline().rstrip("\n")
        while line:
            line = line.split("\t")
            action = line[3]
            if line[1] != 'None' and line[2] != None:
                lat = int(round(float(line[1]) * 1e6))
                lon = int(round(float(line[2]) * 1e6))
                coordinates = Coordinates(lat, lon)
                if action in CAPTURED_ACTIONS:
                    captured.add(coordinates)
                elif action in VISITED_ACTIONS:
                    visited.add(coordinates)
            line = fp.readline().rstrip("\n")

    for coordinate in (visited - captured):
        print("{}\t{}\tVISITED".format(*coordinate))
    for coordinate in captured:
        print("{}\t{}\tCAPTURED".format(*coordinate))

if __name__ == "__main__":
    # Parse command line arguements
    optp = OptionParser(formatter=IndentedHelpFormatter(max_help_position=20), conflict_handler="resolve", usage="usage: %prog path/to/game_log.tsv")

    opts,args = optp.parse_args()

    if len(args) != 1:
        optp.print_help()
        raise SystemExit(1)

    game_log_path = args[0]
    if not os.path.isfile(game_log_path):
        print("Invalid game log path '{}'".format(game_log_path))

    parse_game_log(game_log_path)
