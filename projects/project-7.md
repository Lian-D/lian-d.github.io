---
layout: project
type: project
image: images/pyeadCrab.png
title: pyeadCrab
permalink: projects/pyeadCrab
# All dates must be YYYY-MM-DD format!
date: 2022-12-03
labels:
  - Python
  - D3
  - React
summary: PyeadCrab is a code analysis tool designed to do static and dynamic analysis on python repo projects. It focuses on identifying potential areas of interlinked code.  
---
# PyeadCrab 
![](frontend/src/data/pyeadCrab2.png)

PyeadCrab is a code analysis tool designed to do static and dynamic analysis on python repo projects. It focuses on identifying potential areas of interlinked code in addition to applying markov models to dynamically predict likelihood of calls.

For reference to CPSC 410 class based milestones [this file](milestones.md)

---
## Setup
### Backend
1. make sure `python` > 3 is installed 
2. `cd backend`
3. `pip -r install requirements.txt`
4. refer to [this file](docs/running_pyeadCrab.md) for how to run on repos
5. and [this file](backend/readme.md) for backend documentation

### Frontend
1. make sure you have npm installed
2. `cd frontend`
3. `npm install`
4. `npm start`

---
## Sample Results
Refer to [this file](docs/running_samples.md) for how to run our provided sample code

The following is the static and dynamic renders of `samplecode/selected_benchmarks/deltablue` from the command executed in `/backend/` 

`python main.py -d '../samplecode/selected_benchmarks/deltablue/' '../samplecode/selected_benchmarks/deltablue/deltablue.py'` 

and 

`python main.py -s '../samplecode/selected_benchmarks/deltablue/'`

Static Analysis
![](docs/resources/static.png)
Dynamic Analysis
![](docs/resources/dynamic.png)

