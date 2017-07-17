# tts-annoy
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/) [![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/) 

Receive messages over the Internet and output them via TTS (Google Translate) - what could go wrong?

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. Serious deployment (on a live and production system) is not recommended!

### Prerequisites

*play-sound* requires one of the following mediaplayers present and in your *PATH*:

* mplayer
* afplay
* mpg123
* mpg321
* play
* omxplayer
* aplay
* cmdmp3


### Installing

#### Backend

To install the backend, simply clone this repository

```sh
git clone https://github.com/Schokobecher/tts-annoy.git
```
switch to the new directory
```sh
cd tts-annoy/Backend
```
and install 
```
npm install
```

#### Frontend

The frontend is written in HTML and Javascript, so all yo uneed to do is upload it to a webserver of your choice.
Then edit

```
js/annoy.js
```

and replace **BACKENDURL** with your actual backend server (e.g. **http://192.168.20.44:2888**) 

##### Notice 

Make sure the webpage (Frontend) is served via *HTTP* and not *HTTPS*, else you will end up with an error like 

```
Page loaded over HTTPS but requested an insecure XMLHttpRequest endpoint
```



## Running the server

To run the server, simply run
```sh
node server.js
```
in the directory.


## Built With

* [Bootstrap](http://getbootstrap.com/) - The web framework used
* [jQuery](https://jquery.com/) - Javascript framework
* [Node.js](https://nodejs.org) - Javascript runtime
* An assload of Node modules (See [packages.json](https://github.com/Schokobecher/tts-annoy/blob/master/Backend/package.json))

## Demo

A live demo can be found [here](http://annoy.dennert.me/) - ~~Messages are being sent to my Raspberry Pi at home and played via a Bluetooth speaker.~~ 

*The backend is down, since I don't seem to own a working cardreader.*

## Versioning

Not much to version here.

## Authors & other Persons

* **Pierre Dennert** - *you made this? I made this.* - [dennert.me](https://dennert.me)
* **Michael Reeves** - *Stole his idea* - [His website](https://michaelreeves.us/)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Hat tip to anyone whose code was used