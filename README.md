# NESVault

The NESVault is my E8 Final Backend Capstone. I've always been a huge fan of retro videos games and have been an avid collector for many years. In the last five years of so, the amount of NES collectors across the globe has grown rapidly. With the limited supply of these classic games from the 80's and early 90's, the value of individula titles have begun to rise.

I wanted to provide the ability for individual NES collectors to keep track of their personal collection, tally the entire the worth and total counts of carts they hold. Along with your own personal collection, I wanted to provide them with the abilty to build a wish list of games they're searching for as well as a trade list of games they're willing to part ways with. After finding an amazing API to access the entire database of NES titles, I then built the database within Sql & the app allowing users to add to the corresponding lists depending on the titles they hold in the collection and looking to land and/or trade.

For fun I added a section to where they can search YouTube for videos of their favorite games as well as a way to play chip tone 8 bit music from their favorite games and more. Being the lifelong fan I am, I basically provided a hub for afficinados and collectors alike to just have a place to call home.

After authorization with your google account the database is checked for an existing Firebase ID. If no user is found, the registration modal pops up to register. You don't have to register to use the app, as the database is open to anyone, but you won't be able to add any titles to any of your lists. I have provided the ability to edit your profile including your username and favorite game. I chose to not take any info such as phone or address, because I didn't deem it necessary for my app.

## Tech Used

- React.js
- C#/.Net/
- Boostrap
- SCSS
- Reactstrap
- React libraries including React Search Field and React Animated CSS
- Outside API
- Sql
- Planning with Github Projects

## Screenshots

- Auth
  ![Auth Screenshot](https://raw.githubusercontent.com/JonathanPMohan/NESVault/master/public/screenshots/auth.png)

- Home
  ![Home Screenshot](https://raw.githubusercontent.com/JonathanPMohan/NESVault/master/public/screenshots/home.png)

- Database
  ![Database Screenshot](https://raw.githubusercontent.com/JonathanPMohan/NESVault/master/public/screenshots/database.png)

- Profile
  ![Profile Screenshot](https://raw.githubusercontent.com/JonathanPMohan/NESVault/master/public/screenshots/profile.png)

- Collection
  ![Collection Screenshot](https://raw.githubusercontent.com/JonathanPMohan/NESVault/master/public/screenshots/collection.png)

- Detail
  ![Collection Detail Screenshot](https://raw.githubusercontent.com/JonathanPMohan/NESVault/master/public/screenshots/detail.png)

- WishList
  ![WishList Screenshot](https://raw.githubusercontent.com/JonathanPMohan/NESVault/master/public/screenshots/trade.png)

- TradeList
  ![TradeList Screenshot](https://raw.githubusercontent.com/JonathanPMohan/NESVault/master/public/screenshots/wish.png)

- Videos
  ![VideoPage Screenshot](https://raw.githubusercontent.com/JonathanPMohan/NESVault/master/public/screenshots/video.png)

- Video Page
  ![VideoPage2 Screenshot](https://raw.githubusercontent.com/JonathanPMohan/NESVault/master/public/screenshots/video2.png)

## How to run this project:

- Setup Firebase  
  -Create a firebase project  
  -Enable 'Google Authentication'  
  -Create an apiKeys.js file (an example file exists in the 'helpers' folder)
  -Copy firebase keys from firebase web app settings into apiKeys.js

- Clone or download the repo

- Browse to the repo directory in your terminal

- run `npm install` to install necessary dependencies

- Run the project from Visual Studio

## Special Thanks Goes To:

- Nathan Gonzalez (NSS E8 Backend Chief Instructor & Satirical Madman)
- Martin Cross (NSS E8 Backend Assistant Instructor & Professional Nerd)
- Adam Wieckert (NSS E8 Backend Assistant Instructor & Capstone Mentor)
- Zoe Ames (NSS E8 Front End Instructor & Evil Genius)
- JJ Hendricks (Purveyor of Price Charting.com & Rapid Responder To Emails )
- Marco Crank (Friend, Mentor & Troubleshooting Guru)
- Shane Wilson (Friend, Mentor & Never Ending Support)
- Matt Kelly (Life Long Friend & Coding Mentor)
- Fusajiro Yamauchi (Creator of the All Powerful Nintendo Entertainment System)
