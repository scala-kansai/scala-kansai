all: build

.PHONY: all build ejs copy clean

build: clean ejs copy

ejs:
	gulp ejs

copy:
	mkdir -p dist
	rsync -a --exclude='_*' --exclude='*.ejs' ./app/* ./dist

deploy: build
	gulp deploy

clean:
	-rm -rf dist
	-rm -rf .publish
