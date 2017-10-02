'''Compress images for the web'''
import os
from subprocess import call

ROOT_DIR = os.path.abspath(os.path.join('.', os.pardir)) + '/src/images'
DIRECTORIES = [os.path.abspath(x[0]) for x in os.walk(ROOT_DIR)]

def compress(directory):
    '''Compress method for handling different file formats'''
    for filename in os.listdir("."):
        if filename.endswith('png'):
            call(["/home/ghost_000/github/zopfli/zopflipng", "-y", filename, filename])
        elif filename.endswith(('jpg', '.JPG')):
            print(directory + '/' + filename)
            name, ext = os.path.splitext(filename)
            newname = directory + '/' + "{name}_{uid}{ext}".format(name=name, uid="small", ext=ext)
            call(["cjpeg", "-outfile", newname, filename])
            call(["rm", "-f", filename])
            call(["mv", newname, filename])

for i in DIRECTORIES:
    os.chdir(i)
    compress(i)
