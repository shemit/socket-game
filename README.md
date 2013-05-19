socket-game
===========

#### Socket Game ####

This will eventually be a top-down 3D game engine with the goal of allowing people to easily create simple multiplayer games on the web. The engine will implement a tree structure with a player's location to ensure that only the necessary resources are loaded.

Currently, the game uses player's cookies to identify which player has moved on the server. Of course, this is insecure, and somewhere along the line, user authentication will have to be implemented.

To run, just run the following command:

```html
sudo node server.js
```

Make sure that port 80 isn't occupied by Apache or any other server. This will launch the server on port 80. To test, open up two browser instances and put in two different names into the text field. Voila! You should have two browser windows talking to your node server and updating the location of two rectangles.


