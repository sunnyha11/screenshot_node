#Author - Sunny Ha

How to run the app:

1. build the Docker image

2. run the image into a container with -p 3000:3000 and also bash 
i.e.: docker run --name screenshot -p 3000:3000 -i -t screenshot:latest /bin/bash

3. in bash, run 'node node.js HTTP(S)://URL_TO_SCREENSHOT'

3a. you can add optional jpeg or png at the end: 'node node.js https://google.com jpeg'

4. run localhost:3000 on the host machine - give a few second just in case the process is slow
(i.e. reddit takes a long time to save and upload since a full page is requested)

5. this process can be used as is or be tweaked for other utility purposes stemming from puppeteer module
