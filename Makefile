all: build

.PHONY: all build ejs sass copy clean

build: clean ejs sass copy

ejs:
	gulp ejs

sass:
	gulp sass

copy:
	mkdir -p dist
	rsync -a --exclude='_*' --exclude='*.ejs' ./app/* ./dist

# deploy: build
# 	gulp deploy

clean:
	-rm -rf dist
	-rm -rf .publish
