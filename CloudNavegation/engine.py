# -*- coding: utf-8 -*-
import os
from time import *
import shutil
from distutils.dir_util import copy_tree
from favoritos import *
from current import *
import front as fron
import webProject as wpro

class bc:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


class naut:
	"""docstring for naut"""
	
	copyFPath = ''
	storedPaths = []

	def __init__(self):
		self.path = current
		self.leftBack = '/' 

	def okMessage(self, info):
		print bc.OKGREEN+ info + bc.ENDC
		sleep(1)

	def koMessage(self, info):
		print bc.FAIL+ info + bc.ENDC
		sleep(1)


	def ps(self,n):
		dif = 25 - len(n)
		#print '20 -' + str(len(n))  + ' = '+str(dif)
		return dif

	def printGrid(self,arr, letter,color):
		rowCount = 0
		first = True
		for el in arr:
			if first:		
				print eval(color) + '['+letter+'] ' + bc.ENDC + el + ' ' * self.ps(el),
			else:
				print eval(color) + '['+letter+'] ' + bc.ENDC + el + ' ' * self.ps(el),
			
			first = False

			if rowCount == 3:
				print ''
				rowCount = 0
				first = True

			rowCount += 1

	def execGo(self, info):
		f = raw_input(bc.OKBLUE + '	╚> folder name: ' + bc.ENDC)
		if not f == '':
			self.leftBack = self.path
			self.path += f + '/'
			os.chdir(self.path)

	def storeCurrentPath(self):
		print 'Writingg......................................................'
		with open("current.py", "w") as f: 
			stri = 'current = "' + self.path +'"'
			f.write(stri)
			f.close()
	

	def execStorePath(self):
		self.storedPaths.append(self.path)
		self.okMessage('Path stored ...')

	def execBack(self):
		paths = self.path.split("/")
		del paths[-2]
		newP = ''
		if not len(paths) == 1:
			for el in paths:
				if not el == '':
					newP += '/' + el
			newP += '/'
		else:
			newP = '/'

		self.path = newP
		self.storeCurrentPath()

	def execPasteRecursive(self):
		if os.path.isdir(self.copyFPath):
			arr = self.copyFPath.split('/') 
			os.mkdir(self.path +'/'+ arr[-1], 0755 );
			copy_tree(self.copyFPath, self.path +'/'+ arr[-1])
			self.okMessage('Folder copied ...')
		else:
			os.system("cp "+self.copyFPath+" "+self.path)
			self.okMessage('File copied ...')

	def execMakeDir(self):
		f = raw_input(bc.OKBLUE + '	╚> New folder name: ' + bc.ENDC)

		if not f == '':
			os.mkdir(self.path +'/'+ f, 0755 );

	def execShowPaths(self):
		count = 0
		enable = True
		if not len(self.storedPaths) == 0:
			for el in self.storedPaths:
				print '				└>['+str(count)+']    ' + bc.UNDERLINE + el + bc.ENDC
				count+=1

			while enable:
			 	f = raw_input(bc.OKBLUE + '	╚> Go to path: ' + bc.ENDC)
			 	if not f == '':
			 		if int(f) < (len(self.storedPaths)):
			 			self.path = self.storedPaths[int(f)]
			 			self.storeCurrentPath()
			 			enable = False
			 		else:
			 			self.koMessage('Bad request, This value might be a INT')
			 	else:
			 		enable = False
			else:
				self.koMessage('There arent stored paths')
	
	def execLoadFav(self):
		count = 0
		for el in fav:
			print '			└> ['+str(count)+'] ' + el[0]
			count+=1

		enable = True
		while enable:
			f = raw_input(bc.OKBLUE + '	╚> Go to path: ' + bc.ENDC)
			if not f == '':
				if int(f) < (len(fav)):
					self.path = fav[int(f)][1]
					self.storeCurrentPath()
					enable = False
				else:
					self.koMessage('Bad request, This value might be a INT')
			else:
				enable = False
		

	def execShowContent(self):
		f = raw_input(bc.OKBLUE + '	╚> File name: ' + bc.ENDC)
	
		if f is not '':
			if os.path.isfile(f):
				fl = open(self.path +'/'+f, 'r')
				print '\n\n-..................... FILE CONTENT: \n\n'
				for row in fl:
					print '			'+row
				print '\n......................................................'
				oeoe =  raw_input(bc.OKBLUE + '	╚> Close: ' + bc.ENDC)
			else:
				self.koMessage('This is not a file')

	def execMakeProject(self):
		p = ['Web Project', 'Python Project']

		count = 0
		for el in p:
			print '			└>['+str(count)+'] ' + el
			count+=1 


		enable = True
		while enable:
			f = raw_input(bc.OKBLUE + '	╚> Project type: ' + bc.ENDC)
			if not f == '':
				if int(f) < (len(fav)):
					#--------------- Project Maker
					if p[int(f)] == 'Web Project':
						
						na = raw_input(bc.OKBLUE + '	╚> Project Name: ' + bc.ENDC)

						os.mkdir(self.path +'/'+ na + '_WP', 0755 );

						with open(self.path +'/'+ na + '_WP/index.html', "w") as f: 
							f.write(wpro.getHtmlPage())
							f.close()

						with open(self.path +'/'+ na + '_WP/style.css', "w") as f: 
							f.write(wpro.getCSSPage())
							f.close()
					#------------------------------
					enable = False
				else:
					self.koMessage('Bad request, This value might be a INT')
			else:
				enable = False

	def appLauncher(self):
		exit = False
		p = ['Network Manager', 'El penjat']

		count = 0
		for el in p:
			print '			└>['+str(count)+'] ' + el
			count+=1 

		while not exit:
			na = raw_input(bc.OKBLUE + '	╚> Launch App: ' + bc.ENDC)

			if na == 'q':
				exit = False

	
	def copyPath(self):
		f = raw_input(bc.OKBLUE + '	╚> Folder/File name: ' + bc.ENDC)
		#We check if file or folder exists:
		if os.path.isdir(self.path + f) or os.path.isfile(self.path + f):
			self.copyFPath = self.path + f
			self.okMessage('File copied ...')
		else:
			self.koMessage('This file or folder does not exists in this folder')


	def showContent(self):
		os.system('CHCP 65001')
		os.system('cls')
		dirs = os.listdir(self.path)

		print bc.OKGREEN + '\n\n ◄ back '+ bc.ENDC +' current:  ' + bc.UNDERLINE + bc.HEADER + self.path + '\n' + bc.ENDC

		if not self.copyFPath == '':
			fpa = self.copyFPath.split('/')	
			print bc.HEADER + 'File in buffer : '+ bc.ENDC + fpa[-1] + '\n'


		folders = []
		files = []
		for el in dirs:
			if os.path.isdir(self.path + el):
				folders.append(el)
			else:
				files.append(el)
			
		self.printGrid(folders,'🗀', 'bc.OKBLUE')
		print '\n_______________________________\n'
		self.printGrid(files,'🖉', 'bc.WARNING')

		print '\n\n'

		print bc.OKGREEN + '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬'
		print bc.OKGREEN + ' [1]Back ▐ [2]Go ▐ [3]NewDir ▐ [4]Copy File/Folder ▐ [5]StorePath  ▐ [6]Show Paths ▐ [7]Paste'  
		print bc.OKGREEN + ' [8]ShowContent  ▐ [9]FavPaths  ▐ [10] NewProject ▐'
		print '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n' 
		print bc.OKBLUE +'[apps] AppLauncher'
		print '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n' + bc.ENDC

		
		sel = raw_input(bc.OKGREEN + '> option :' + bc.ENDC)
		
		if sel == 'q':
			quit()
		elif sel == '1' or sel == 'back' or sel == 'cd ..':
			self.execBack();
		elif sel == '2' or sel == 'go' or sel == 'cd':
			self.execGo(sel)
		elif sel == '3' or sel == 'mkdir':
			self.execMakeDir()
		elif sel == '4' or sel == 'cp':
			self.copyPath()
		elif sel == '5' or sel=='sv':
			self.execStorePath()
		elif sel == '6' or sel=='sh':
			self.execShowPaths()
		elif sel == '7' or sel=='paste':
			self.execPasteRecursive()
		elif sel == '8' or sel=='display':
			self.execShowContent()
		elif sel == '9' or sel=='favs':
			self.execLoadFav()
		elif sel == '10' or sel=='new':
			self.execMakeProject()
		elif sel == 'apps' or sel == 'app' or sel == 'laucher' or sel == 'applauncher':
			self.appLauncher()


def main():
	os.system('cls')
	fron.headmain()

	n = naut()
	while True:
		n.showContent()

main()

