# Web Crawler
This repository contains a web crawler that fetches the number of times the word ‘Kayako’ appears on Kayako's product homepage (https://kayako.com/). In this assessment, you must adapt the code to do the following:
1. Crawl the subpages of Kayako’s website, in addition to the homepage. For this exercise you should use BFS (Breadth-first search) and only consider **two levels from the homepage**, but your code **should not have a limitation on the level depth** (i.e., scanning 5 or 50 levels should be possible by changing the input parameters). 
For detailed information about BFS and levels, look into the Additional information section.
2. Make the URL, word, and scan depth level command line parameters of the application, with default word 'kayako' and depth 2.
3. The repository contains local copy of the website to be used for verification. Use command `bash verification.sh` to run your app against the local server. Expected response for word 'kayako' and depth 2 is 1084.


### How you will be evaluated:
* Your code finds the target word “Kayako” **1084 times in the subpages against the local version of the website** and exits the page once the crawling is done
* Your code is free from defects and regressions
* Your code has 100% test coverage and passes both automatic checks (Analyze and Test)
* You extend CLI parsing to include the parameter 
* You make the appropriate method-level decisions that make the code simple, modular, readable, and easily changeable


### Additional information:
* This is assessment emulates real work - you are free to use external resources to research and solve the problem
* You can change and move the code, except for main.ts
* `npm run main`  will be used to run the crawler and collect the result
* If two URLs only differ in the "fragment" part they are considered identical
* Parallel processing is out of scope - we do not expect your submission to fetch multiple websites at the same time
* **Breadth-first search** is an algorithm for searching a tree data structure for a node that starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level. https://en.wikipedia.org/wiki/Breadth-first_search
* **‘Two levels’** means that it takes at most two clicks on hyperlinks to get to the subpage
![First-four-levels-of-a-web-site](https://user-images.githubusercontent.com/88856224/159994289-a973f85f-3003-42fd-bc81-015d1bd59465.png)
* There are two path to reach a certain website, then the level of the page is the lower number. For example if the page is linked on homepage and level two page then the level of that page is one.


## How to start
1. Unzip and create the xo-webcrawler repository into your own GitHub account (make sure your new repo is private)
2. You can use your own IDE for to create your solution. If you prefer, you can use gitpod.io to open an online IDE eg. gitpod.io/#https://github.com/username/xo-webcrawler (replace with your username)
3. Review the existing product code and add your feature code, making sure to comply with all requirements.
4. Do not change files marked with the "Don't change this file" comment
5. Submit your assessment **via Pull Request in your own private repo**
6. Add ‘GAC89’ and ‘krystian-lieber’  as collaborators and share the link to your PR as your submission response
7. If you cannot push workflow files to repository, go to https://gitpod.io/integrations and edit GitHub permissions to include workflow.

### Useful commands
* `npm run ci-all` - install all dependencies
* `npm run analyze` - runs the code analysis tool
* `npm run test` - runs the unit tests
* `npm run main` - runs the application
* `npm run main -- -u www.google.com` - runs the application with parameters, use `--` to separate the npm parameters from application parameters
* `bash verification.sh` - runs the verification process, 

### Final Note
The purpose of this assessment is to check if you can build functional code and make the appropriate method-level decisions.
Test to make sure your code works as specified.
