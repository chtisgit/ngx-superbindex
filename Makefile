.DEFAULT_GOAL := help

.PHONY: build \
		ci \
		clean \
		docker_build \
		help \
		install \
		reload \
		test \
		tree \
		watch

.SILENT:

docker_build:
	docker run --rm -v "${shell pwd}":/usr/src --user $(shell id -u) -ti node:lts make -C /usr/src build

# generate assets
build: tree
	tasks/build

# continuous integration
ci: install \
	build \
	test

# clean generated assets
clean:
	tasks/clean

# show some help
help:
	tasks/help

# install project dependencies
install:
	tasks/install

# issue a reload signal to nginx
reload:
	tasks/reload

# run tests
test:
	tasks/test

# generate the public file tree
tree:
	tasks/tree

# generate assets on asset changes
watch:
	tasks/watch
