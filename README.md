# Unofficial IITC plugins


## [Highlight unique visits/captures using opacity](https://raw.githubusercontent.com/xificurk/iitc-plugins/master/dist/portal-highlighter-uniques-opacity.user.js)

Use stroke and fill opacity to denote player's unique visits and captures. Requires uniques plugin.

The standard highlighter from uniques plugin gives you clear overview of un/visited/captured portals, but I do not like the fact that it kind of masks the state of the battlefield, especially when you're zoomed out.

This highlighter does not use any additional colors, so the Enlightened/Resistance controlled areas remain mostly green/blue. It uses opacity to de-emphasize the areas where you already have unique captures, and on the other hand brings up the areas that you have not visited at all.

See the example below and compare it with [standard highlighter](images/uniques.png?raw=true).

### Example

![Uniques opacity plugin highlighting](images/portal-highlighter-uniques-opacity.png?raw=true "Uniques opacity plugin highlighting")


## [Unique visits/captures heatmap](https://raw.githubusercontent.com/xificurk/iitc-plugins/master/dist/uniques-heatmap.user.js)

Display heatmap of all portals that the player did NOT visit/capture. Requires uniques plugin.

This plugin adds two additional layers - Explorer heatmap (unvisited portals) and Pioneer heatmap (uncaptured portals), it's great for identifying portal-dense areas that you did not visit/capture.

See the example heatmaps below and compare it with [standard highlighter](images/uniques.png?raw=true).

### Explorer heatmap

![Explorer heatmap](images/uniques-heatmap-explorer.png?raw=true "Explorer heatmap")

### Pioneer heatmap

![Pioneer heatmap](images/uniques-heatmap-pioneer.png?raw=true "Pioneer heatmap")
