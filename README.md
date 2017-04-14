# socketIOForStatusConvert
**Just A Simple Architecture Demo for other coding in the future**

# Introduction
A socketIO server for converting users' status
# Features
- Scripts to simulate clients' requests
- Multi-processing
- status machine
- Some difficult:)


# Run
		cd ~
		git clone https://github.com/minghust/socketIOForStatusConvert.git
		cd socketIOForStatusConvert
		npm install
		node server.js
		pm2 start bot.js -i 10
 
you can modify the number of process, the number above is ten, which means that starting 10 processes to simulate 10 clients to connect server.

**based on your cpu and main memory's capacity, be careful to protect your computer from down time**
# Dependency
[pm2](https://github.com/Unitech/pm2) deploy plan
# Licence
MIT
