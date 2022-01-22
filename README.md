# SuperStonks
Stock Charts For BitBurner!

BB-VUE IS REQUIRED. GET IT HERE: https://github.com/smolgumball/bb-vue/tree/dev#readme

Instructions: Run wallstreet.js with an argument of the stock ticker you'd like to chart. The argument MUST be capitalized. Example: run wallstreet.js FNS
Files Needed:  Just wallstreet.js and wallstreet-data.js.  Any other files in this repo are just bonuses.

Would highly suggest setting up an alias. Example: alias chart="run wallstreet.js", and then you could just type chart FNS and immediately get a chart.

![image](https://user-images.githubusercontent.com/97868924/150624177-f3fb354b-a710-4d11-9e79-13fb47a0ae18.png)


Update 5:  ADVANCED POSITIONS!  TRADE PROTECTION!  I've added some additional position trades below the chart.  A quick overview
of what each one does:

![Untitled](https://user-images.githubusercontent.com/97868924/150623697-f922c0b8-2830-4977-9782-048dbafbecb2.png)

TRADE PROTECTION:  Users will now be prompted at startup if they would like to enable Trade Protection.  What is it?
This enables the script's 'Safe Mode'.  With Safe Mode enabled, any position that you have that suddenly changes forecast
or has a volatility spike, it will manage for you in the background.  THIS PREVENTS LOSING ALL YOUR MONEY ON A SINKING STOCK.
If you DO ENABLE this feature, DO NOT FIGHT IT.  If forecast is not bullish and you place a long order, it WILL evaluate
it and more than likely close it. (SAFE MODE IS ENABLED BY DEFAULT WHEN AUTO-TRADE IS ENABLED.  SAFE MODE IS DISABLED
IF AUTO-TRADE IS DISABLED.  This means you do not have to re-launch the chart to enable/disable safe mode.  Just disable 
Auto-Trade)

Strangle:  Places a Long/Short (Based on forecast/volatility) order for max shares and then places a limit sell 
10% above current price and a limit stop 15% below current price (reversed for short positions).  What does this do?
It strangles the price at your current purchase.  If it moves above or below the strangle, the position closes.

Split:  A simple, yet effective, way to limit losses (and gains) at the expense of exposure.  This places a Long AND
Short order for 50% of available funds/max shares.  You are now split on the stock and covered regardless of direction.
Why would I do this?  Volatility is high and forecast is between 40% and 60%.  Split your order and allow the price to 
move.  If/when the forecast changes, close the long/short (whichever is at a loss) and double down on the other.

Go Long/Short Hedged:  A safer alternative to buying maximum amounts of shares.  What does this do?  Places an Long/Short
order for 75% of max amount and an opposite order for 25% of max amount.  Why would I do that?  It limits your losses in
uncertain markets.  This is a wonderful position to open if volatility is high, or if a stock continues to move against
you even if the forecast is favorable.  Example:  Forecast of 60% Bullish and volatlity of 0.80%.  Go long hedged.  The 
price drops, but forecast stays bullish.  Allow the drop to happen and sell your (small 25%) position for a gain and then 
let the price rebound.

-------------------------------------------------------------------------------------------------------------------------

Update 4:  AUTO-TRADER!  There is now a button at the top of the chart to enable/disable Auto-Trader.
What is Auto-Trader?  Auto-Trader will trade for you, basically.  If the function is enabled, it will
automatically place long or short positions depending on forecast and manage them for you.  You can toggle
it whenever you'd like.

![Untitled](https://user-images.githubusercontent.com/97868924/150469333-b2eb7368-d295-492c-957e-17b8a889028a.png)

-------------------------------------------------------------------------------------------------------------------------

UPDATE 3:  FULL ACTIVE TRADING!  Profit reporting now hooked into overview panel!  Trade confirmations are sent via
toast, so you can trade while ANY window is active!  (still only 1 chart open at a time...will fix soon-ish). 
This also means all WSE/TIX/4S is needed.  I'm considering releasing the previous version as a stand-alone.

Coming Soon:  TRADE PROTECTION!  An optional mode that can be enabled to protect the player's positions from
fast volatility/forecast changes.

-------------------------------------------------------------------------------------------------------------------------

Update 2:  ACTIVE TRADING WITH BUTTONS! 

-------------------------------------------------------------------------------------------------------------------------

Update 1:  Added volatility and forecast to chart data.  More to come!

A simple 2-script charting platform for BitBurner's stock market.

HOW TO MAKE THE MONIES WITH THE CHART:

This is a very primitive wavetrend chart. If you're unfamiliar with those types of indicators in trading securities, then here's a quick rundown. A real wavetrend would collect OHCL (Open High Close Low) data over the history of a stock and find the averages to display its wave. We don't have that luxury since BB's stock market isn't real. There's no historical data to pull from. So, we use a shorter time-frame and focus on quick plays.

By default, the chart collects 5 Minutes of data before scrolling. Would suggest letting your chart run for at least 2-3mins before placing any large trades based on the data. How to read the chart? Wavetrends are quite simple. They do not care about the actual PRICE. The only thing it's measuring is the current price compared to the last 2min and 59sec of data. The chart is dynamic in spacing, in that if there's a large enough movement in the current timeframe, you'll notice it. If the line is above the midpoint in the BULL ZONE, then the current trend is upwards and buying is considered safe. The opposite if the line is below the midpoint. Simple. Do not fight the trend. If it's at the top of the chart in the Bull Zone, don't buy a short position thinking "Oh man, I'll be rich when it crashes!". This isn't a real market. I've watched JGN reach 300k per share in a game session. Speculative trading will ruin your BN8 run, which this is designed for. 

Customization: If you'd like to change any of the settings, edit wallstreet-data.js. The main variables to change are {resolution} and {delay}. Resolution is the overall timeframe of the chart. I have it set to 300 by default (5 minutes). Delay is the delay in tick information. Delay is multiplied by 100, so a setting of 10 is 1 second. 20 is 2 seconds. Setting this below 10 will cause many areas of 'flatness' on the chart. Setting it to 15 or 20 will pull data slower, but give a slightly more 'jagged' chart.
