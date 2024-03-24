ShakibAdimin Next.js - Free Next.js Tailwind Admin Dashboard Template

## Installation

Here are the steps you need to follow to install the dependencies.

1. Check environment variables and database config

* Environment: **env**, **.env.development**
* Database config: **src/DAL/database/config.json**

3. After that **cd** into the template directory then run this command to install all the dependencies

```
npm install
```

or

```
yarn install
```

4. Create. migrate and seed database
```
npx sequelize db:drop
```

```
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

5. Now run this command to start the developement server

```
npm run dev
```

or

```
yarn dev
```



ShakibAdmin Next.js Free is 100% free and open-source; feel free to use it with your personal and commercial projects.

## Configure social login application

### Google

Log in to the Google Cloud Console (https://console.cloud.google.com/) and do the following:
1. Create a project
![image](https://github.com/khauthanhhieu/barebone-admin/assets/44426849/9faee3c7-fc74-4cf9-8729-3c7e5d8ec743)

![image](https://github.com/khauthanhhieu/barebone-admin/assets/44426849/b3adfc87-b20a-4024-810d-fb3f83331070)

2. Setup API

After create project, go to Dashboard and click APIs and Services in Quick access
![image](https://github.com/khauthanhhieu/barebone-admin/assets/44426849/0c0f4628-3381-4f23-ad47-11c5be0852c2)

Go to OAuth consent screen
- User Type: choose External
- Setup app information
  + OAuth consent screen
     * Required: App name, User support email and Developer contact information
     * In prodution, we need to input Authorized domains
  + Scopes: no need to setup
  + Test users: no need to setup

Go to Credentials tab, click Create Credential > OAuth client ID
![image](https://github.com/khauthanhhieu/barebone-admin/assets/44426849/85e5c6e0-9a01-47d5-bfe5-9f5408db11cc)

- Application type: choose Web application
- Name: input whatever you want or default value. This name is only used to identify the client in the console and will not be shown to end users.

- Authorized JavaScript origins:
   + Insert http://localhost:3000 -- can remove in production
   + Insert http://\<production-domain\>
- Authorized redirect URIs
   + Insert http://localhost:3000/api/auth/callback/google -- can remove in production
   + Insert http://\<production-domain\>/api/auth/callback/google
![image](https://github.com/khauthanhhieu/barebone-admin/assets/44426849/276b5254-032d-4ef3-a4a6-532c4aa9564e)

- OAuth client created: copy **Client ID** and **Client secret**
![image](https://github.com/khauthanhhieu/barebone-admin/assets/44426849/f1975d23-4694-4543-8054-2efffd11b567)
- Update .env file: set **Client ID** as GOOGLE_ID and **Client secret** as GOOGLE_SECRET

Publish app: go to OAuth consent screen > click Publish app

Pricing

| Monthly Active Users (MAU) | Price per MAU ($)    |
| :---:   | :---: |
| 0 - 49,999 | 0   |
| 50,000 - 99,999 |	0.0055 |
| 100,000 - 999,999	| 0.0046 |
| 1,000,000 - 9,999,999 |	0.0032 |
| 10,000,000 +	| 0.0025 |

Detail: https://cloud.google.com/identity-platform/pricing

### Facebook

Log in to the Meta for Developers (https://developers.facebook.com/apps) and do the following:

1. Create new app

![image](https://github.com/khauthanhhieu/barebone-admin/assets/44426849/5597e95b-bd2b-42d3-bf17-b2b7f71261f5)

- Add use case: Choose Other, click Next
![image](https://github.com/khauthanhhieu/barebone-admin/assets/44426849/7d177222-f355-466e-93fe-ede77e377624)

- Select an app type: choose Consumer
![image](https://github.com/khauthanhhieu/barebone-admin/assets/44426849/7c8d1fe4-dba3-47bd-9345-78d9bc6353db)

- Detail
![image](https://github.com/khauthanhhieu/barebone-admin/assets/44426849/953ab9b4-be09-4ba1-96d5-4073493fc39d)

  + Add an app name: Barebone
  + App contact email
 
Add products to your app: click Facebook Login > Setup
![image](https://github.com/khauthanhhieu/barebone-admin/assets/44426849/462ae970-2105-477d-a9bf-c1b6079c6d1d)

Select the platform for this app: choose Web
- Add site URL: https://\<production-domain\>/ or http://localhost:3000/
- Save > Next > Next ...

Go to App Settings > Basic

Copy **App ID** and **App secret**, update .env file: set **App ID** as FACEBOOK_ID and **App secret** as FACEBOOK_SECRET

Setup config in production
- Facebook Login > Setttings > Valid OAuth Redirect URIs: https://\<YOUR_DOMAIN\>/api/auth/callback/facebook

Publish: Update App Mode to Live.
To do it, you must provide a valid Privacy Policy URL, Terms of Service URL and other information in order take your app Live.
Go to Basic Settings and make sure it is valid.

Detail: https://www.youtube.com/watch?v=dxSQuzzihjA

Pricing: free

