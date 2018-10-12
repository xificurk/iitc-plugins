# Unofficial IITC plugins


## Seznam map tiles [[Install](https://raw.githubusercontent.com/xificurk/iitc-plugins/master/dist/basemap-seznam.user.js)]

Base and hiking map tiles from [Seznam](http://mapy.cz).


## GDPR uniques [[Install](https://raw.githubusercontent.com/xificurk/iitc-plugins/master/dist/uniques-gdpr.user.js)]

Visualize and manage unique visit/capture data based on GDPR data access request package.

### How to import data into IITC?

1) Send a data access request under GDPR to privacy@nianticlabs.com
2) After you recieve and unpack the data use [game_log_parser.py](https://raw.githubusercontent.com/xificurk/iitc-plugins/master/bin/game_log_parser.py) python script from this repository to parse `game_log.tsv` file from the data package: `python3 game_log_parser.py path/to/game_log.tsv > output.txt`
3) Open the plugin menu (find `Uniques from GDRP` link in the right-hand side panel under portal details), select `Import game_log`, paste the contents of `output.txt` into the textarea and confirm.

### Data visualization

This plugin provides are several visualization tools:

**Uniques (GDPR)** highlighter: It works just like a normal uniques highlighter but it highlights portals based on the imported GDPR-based data.

**Unmatched visited portals from GDPR** and **Unmatched captured portals from GDPR** layers: These layers show pink/black circles with positions of visited/captured portals that are no longer there - either the portal was moved or completely deleted. 


### Compare and merge GDPR-based data with current uniques data

**Important:** Unfortunately the data package does not directly contain unique visit/capture data (there are no real portal guids). The game log contains only coordinates of the portal and the plugin matches them to the loaded portals in the view screen. In other words - the displayed data may not be completely correct, but they are generally good enough.

Zoom in on the area you're interested in, wait for the portals to load, and then select `Compare GDPR data with uniques` from the plugin menu - it displays a table comparing visit/capture data stored in uniques plugin and this GDPR uniques plugin.

`Merge GDPR data with uniques` works in a similar way - it takes all the loaded portals in the view screen and merges their capture/visit status from GDPR data into uniques plugin data.


## Highlight unique visits/captures using opacity [[Install](https://raw.githubusercontent.com/xificurk/iitc-plugins/master/dist/portal-highlighter-uniques-opacity.user.js)]

Use stroke and fill opacity to denote player's unique visits and captures. Requires uniques plugin.

The standard highlighter from uniques plugin gives you clear overview of un/visited/captured portals, but I do not like the fact that it kind of masks the state of the battlefield, especially when you're zoomed out.

This highlighter does not use any additional colors, so the Enlightened/Resistance controlled areas remain mostly green/blue. It uses opacity to de-emphasize the areas where you already have unique captures, and on the other hand brings up the areas that you have not visited at all.

See the example below and compare it with [standard highlighter](images/uniques.png?raw=true).

### Example

![Uniques opacity plugin highlighting](images/portal-highlighter-uniques-opacity.png?raw=true "Uniques opacity plugin highlighting")


## Unique visits/captures heatmap [[Install](https://raw.githubusercontent.com/xificurk/iitc-plugins/master/dist/uniques-heatmap.user.js)]

Display heatmap of all portals that the player did NOT visit/capture. Requires uniques plugin.

This plugin adds two additional layers - Explorer heatmap (unvisited portals) and Pioneer heatmap (uncaptured portals), it's great for identifying portal-dense areas that you did not visit/capture.

See the example heatmaps below and compare it with [standard highlighter](images/uniques.png?raw=true).

### Explorer heatmap

![Explorer heatmap](images/uniques-heatmap-explorer.png?raw=true "Explorer heatmap")

### Pioneer heatmap

![Pioneer heatmap](images/uniques-heatmap-pioneer.png?raw=true "Pioneer heatmap")
