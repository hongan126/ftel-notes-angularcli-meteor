# api-meteor-to-deploy

'api' folder of FTEL Notes Project split out here.

# How to deploy this?

## Tutorial video for deployment
[![Watch the video](https://image.ibb.co/f0s1yS/Scr_1_29_2018_9_49_18_AM3_1_2018_3_59_13_PM.png)](https://youtu.be/F8C1dot2t9o)

## Deploy on Heroku

Full tutorial: [Here](https://medium.com/@pushplaybang/deploying-and-hosting-meteor-on-heroku-mongolab-for-free-37050a3ebd7e)

### Config Variables

`heroku config:set EMAIL_URL=smtp://USERNAME:PASSWORD@HOST:PORT/` (If your app sent email)

Example for gmail: `EMAIL_URL=smtps://abcd%40gmail.com:password@smtp.gmail.com:465/`

Encode and Decode Url [Here](https://www.url-encode-decode.com/) (Exam: '@' encode -> '%40')

`heroku config:set MONGO_URL=mongodb://your-db-user-name:your-db-password@ds017231.mlab.com:17231/db-name`

`heroku config:set ROOT_URL=your-heroku-url`

### Buildpacks

Meteor Buildpack Horse: 
`https://github.com/AdmitHub/meteor-buildpack-horse.git`

### Some errors

- To fix error `at=error code=H14 desc="No web processes running" method=GET path="/sockjs/info?cb=2uma05ykoi`

Use command: `heroku ps:scale web=1 -a <app-name>`

- Fix error `No 'Access-Control-Allow-Origin' header is present on the requested resource`
![Fix erroer](https://image.ibb.co/c9LX57/Fix_No_Access_Control_Allow_Origin.png)

- To fix `Error: Invalid login` for Gmail account: [Click here](https://productforums.google.com/forum/#!topic/gmail/9KCgzXY4G_c)

## Deploy on Galaxy

Just one Command line:

`$ DEPLOY_HOSTNAME=us-east-1.galaxy-deploy.meteor.com meteor deploy [hostname] --settings settings.json`

Full tutorial: [Here](https://galaxy-guide.meteor.com/deploy-quickstart.html)

![](https://image.ibb.co/fpzEJS/Deploy_galaxy.png)
