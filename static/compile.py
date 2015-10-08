import os
import fileinput
import sys
import re


def handlejsimport(base_dir, filename, target="main.min.js"):
	""" Replace import statements in the file by corresponding files"""
	imp_regex = re.compile("//[ ]*import\((.+)\)")
	target = os.path.join(base_dir, target)

	# Creating target file, imports are replaced in new file
	tmp_file = target + ".temp"
	stmt = "cp " + filename + " " + tmp_file
	os.system(stmt)
	# ===

	try:
		for line in fileinput.input(tmp_file, inplace=True):
			imp = line.strip()
			matches = imp_regex.match(line)
			if matches:
				sourcefile = matches.group(1).replace('"', '').replace('\'', '')
				with open (os.path.join(base_dir, sourcefile), "r") as myfile:
					data=myfile.read()
				print(data)
				# sys.stdout.write(data)
			else:
				print(line)

		#Minify combined js
		print("  -Minifying combined js")
		stmt = "uglifyjs --compress --mangle -- " + tmp_file + " > " + target
		os.system(stmt)
		# removing temp file
		os.system("rm -f " + tmp_file)
		print("  ===done")
		# ===

	except Exception as e:
		print("Error importing js files")
		print(e)

def compile():
	""" Combine and compile CSS, JS files """
	scss_src = "./styles/main.scss"
	scss_dest = "./styles/main.min.css"

	scripts_dir = "./scripts"


	print("Compiling sass files (*Requires npm sass module, do `npm install sass -g` to install.)")
	stmt = "sass " + scss_src + " > " + scss_dest + " --style compressed --no-cache"
	os.system(stmt)
	print("===done!\n")

	print("Importing and combining js files (*Requires npm uglify module, do `npm install uglify -g` to install.)")
	handlejsimport(base_dir=scripts_dir, filename=os.path.join(scripts_dir, "main.js"), target="main.min.js")
	print("===done!\n")

compile()