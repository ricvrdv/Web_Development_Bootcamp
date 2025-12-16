#!/bin/bash

if [ $# -eq 0 ]
then
	echo "No arguments supplied"
elif [ $# -ge 1 ]
then
	for arg in "$@"
	do
		mkdir -p "ex$arg"
	done
fi
