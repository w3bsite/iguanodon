# Iguanodon contributor's handbook 🦕
Thanks for you interest in contribution to Iguanodon!

## Introduction
Iguanodon team strongly believes in power of free software. And we believe, that if the project is free, it will prosper.
Thus, you are free to create your own frameworks based on Iguanodon and create derived works from it. Even tho you have the 
right to fork Iguanodon, we still highly encourage you to contribute to our main repository, so everyone can use your changes 
without fully migrating to your fork.

## I've found a bug, what do I do?
* Create a GitHub issue [here](https://github.com/kislball/iguanodon). Please, provide as much detail as possible.
* Reply to further questions. Remember, that it can be your mistake as well!

## I can fix this bug/I've found bug I can fix!
Sweet!
* Check if anyone is already working on this bugfix. If nobody works on it - it's your time to shine!
* Create a PR and link an existing issue for it. 

## I want to add a new feature? How y'all feel about it?
You should start a new discussion in RFCs section. There you should precisely describe two main points: why and how.

Once you get an approval from one of maintainers, you should create a new PR. Start working on your feature!

## Using velociraptor
We use [velociraptor](https://velociraptor.run/) as our task runner. Once you install it, run `vr` command to check available tasks.

## Structure
Iguanodon's directory structure is fairly simple: it's source code consists of two folders and two files
* **src** - main source code for the framework. Contains modules.
* **test** - this directory contains unit tests. You should test **modules**
* **deps.ts** - contains external dependencies
* **mod.ts** - entrypoint for the library

## Writing tests
You should write test for **modules**, not their individual APIs. You should only test those module APIs, which are supposed to be used
by other modules.

## Commit style
We don't use any special commit styles like conventional commits. You should only describe how your commit changes behavior of the framework, e.g.
* Add better dinosaurs
* Let some dinosaurs eat more (#35)

## Before pushing
Before pushing, you should run `vr check`. It will do some styling and run tests. You are now free to push!