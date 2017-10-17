# -*- coding: utf-8 -*-

import os,datetime
import psutil
import time as ti

class bc:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


class program:
	def __init__(self):
		print ''


	def headerr(self):

		print bc.HEADER + '''    
	                                     *******    ------------------------- 
	   ************                   ** *******    -                       - 
	   ************                 **   *     *    -  Machine Management   - '''+bc.OKBLUE+'''
	   *          *          **   **     *  ****    -                       - 
	   *          *        ***  **       *******    -                       - 
	   *          *     ***  ***                    -                       - '''+bc.OKGREEN+'''
	   ************   **     *                      -                       - 
	   *     ****** **                              -                       - 
	   *          *                                 - by:APeris             - '''+bc.WARNING+'''
	   ************                                 -------------------------                                                                                                                      
		''' + bc.ENDC

	def checkPercent(self,val):
		if not val < 50:
			if not val < 80:
				return bc.FAIL + str(val) + bc.ENDC
			else:
				return bc.WARNING + str(val) + bc.ENDC
		else:
			return bc.OKGREEN + str(val) + bc.ENDC

	def main(self):
		os.system('CHCP 65001')
		os.system('cls')
		self.headerr()

		mem = psutil.virtual_memory()
		perI = psutil.cpu_percent()
		muI = mem[2]		

		per = self.checkPercent(perI)
		mu = self.checkPercent(muI)

		print '.....╔══════════════════════════════════════'
		print '.....║  Uso de CPU (%)   ║  RAM (%)         '
		print '.....╠══════════════════════════════════════'
		print '.....║       '+per+'        ║  '+mu+'       '
		print '.....╚══════════════════════════════════════'


		print ' ULTIMO RESET'
		print '---------------------------------------------------------------->'
		print datetime.datetime.fromtimestamp(psutil.boot_time()).strftime("%Y-%m-%d %H:%M:%S")


		print '\n NETWORK COUNTERS:'
		print '---------------------------------------------------------------->'

		netcount = psutil.net_io_counters()
		print netcount


p = program()

while True:
	p.main()
	ti.sleep(.5)