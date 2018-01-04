#!/usr/bin/env python
# -*- coding: utf-8 -*-
class col:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

print col.BOLD +col.HEADER +'''
----------------------
Corruption Checksum I
----------------------
5 1 9 5
7 5 3
2 4 6 8

The first row's largest and smallest values are 9 and 1, and their difference is 8.
The second row's largest and smallest values are 7 and 3, and their difference is 4.
The third row's difference is 6.

In this example, the spreadsheet's checksum would be 8 + 4 + 6 = 18.
''' + col.ENDC



print col.OKGREEN + 'Resultado: ' + str(suma) + col.ENDC
