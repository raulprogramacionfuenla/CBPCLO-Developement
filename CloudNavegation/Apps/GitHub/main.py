# -*- coding: utf-8 -*-
import os
from git import Repo

class bc:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


class gitApp():	
	os.system('cls')
	def __init__(self, path):
		self.path = path
		self.options = ['Add Path', 
						'Clone project',
						'Show Paths']
		self.main()


	def header(self):
		print bc.OKBLUE + bc.BOLD +  '''
		            **********
		            **********             ***
		            ***    ***    ***   *********
		   ^  ^     ***           ***   *********
		 ((0 . 0))   ***   ****             ***
		 ((((())))   ***     **    ***      ***
		            **********    ***      ******
		            **********    ***      ******
		-- GITHUB '''+bc.ENDC+'''         ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡'''+bc.OKBLUE+'''                    
		-- BY: APeris  v1.0 ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡                                                                                               
		''' + bc.ENDC

		print '--------------------------------------------------------------------------------------------------'
		print ' >> Current path:  ' +  bc.UNDERLINE + bc.HEADER + self.path + bc.ENDC 
		print '---------------------------------------------------------------------------------------------------\n\n'

	def menu(self):
		count = 0
		for el in self.options:
			print ' └>['+str(count)+'] ' + el
			count+=1 

		exit = False
		print '____________________________________________________________'
		while not exit:
			na = raw_input(bc.OKBLUE + ' ╚> Option : ' + bc.ENDC)
			if int(na) < len(self.options):
				print '\n Option: ' + p[int(na)] + '...\n\n'
				return int(na)

			if na == 'q':
				exit = True

	def main(self):
		self.header()
		self.menu()
		


gith = gitApp('pepe')
		
			
			#Repo.clone_from(git_url, repo_dir)
