# SuperStonks
Stock Charts For BitBurner!

A simple 2-script charting platform for BitBurner's stock market.

BB-VUE IS REQUIRED. GET IT HERE: https://github.com/smolgumball/bb-vue/tree/dev#readme

Instructions: Run wallstreet.js with an argument of the stock ticker you'd like to chart. The argument MUST be capitalized. Example: run wallstreet.js FNS

Would highly suggest setting up an alias. Example: alias chart="run wallstreet.js", and then you could just type chart FNS and immediately get a chart.

HOW TO MAKE THE MONIES WITH THE CHART:

This is a very primitive wavetrend chart. If you're unfamiliar with those types of indicators in trading securities, then here's a quick rundown. A real wavetrend would collect OHCL (Open High Close Low) data over the history of a stock and find the averages to display its wave. We don't have that luxury since BB's stock market isn't real. There's no historical data to pull from. So, we use a shorter time-frame and focus on quick plays.

By default, the chart collects 3 Minutes of data before scrolling. Would suggest letting your chart run for at least 2-3mins before placing any large trades based on the data. How to read the chart? Wavetrends are quite simple. They do not care about the actual PRICE. The only thing it's measuring is the current price compared to the last 2min and 59sec of data. The chart is dynamic in spacing, in that if there's a large enough movement in the current timeframe, you'll notice it. If the line is above the midpoint in the BULL ZONE, then the current trend is upwards and buying is considered safe. The opposite if the line is below the midpoint. Simple. Do not fight the trend. If it's at the top of the chart in the Bull Zone, don't buy a short position thinking "Oh man, I'll be rich when it crashes!". This isn't a real market. I've watched JGN reach 300k per share in a game session. Speculative trading will ruin your BN8 run, which this is designed for. You do not need 4S Data or 4S TIX to use this. Just a WSE Account and WSE TIX.

Customization: If you'd like to change any of the settings, edit wallstreet-data.js. The main variables to change are {resolution} and {delay}. Resolution is the overall timeframe of the chart. I have it set to 180 by default (3 minutes). Delay is the delay in tick information. Delay is multiplied by 100, so a setting of 10 is 1 second. 20 is 2 seconds. Setting this below 10 will cause many areas of 'flatness' on the chart. Setting it to 15 or 20 will pull data slower, but give a slightly more 'jagged' chart.
