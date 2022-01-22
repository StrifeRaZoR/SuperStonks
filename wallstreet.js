import AppFactory from '/bb-vue/AppFactory.js'
// prettier-ignore
import { getGlobal, html, Mitt, setGlobal } from '/bb-vue/lib.js'

/** @param { import("~/ns").NS } ns */
export async function main(ns) {
  var ticker = ns.args[0];
  let safeMode = await ns.prompt("Would you like to enable Trade Protection?");
  safeMode
  //ns.tail();

  ns.run("wallstreet-data.js", 1, ticker)
  try {
    ns.disableLog('disableLog');
    ns.disableLog('asleep');
    ns.disableLog('sleep');
    ns.disableLog('getServerMoneyAvailable');
    ns.tprint("Chart Loading.  Please click CLOSE CHART before loading a new chart.")
    await new AppFactory(ns).mount({
      config: { id: 'svg-chart-app-wallstreet', showTips: false },
      rootComponent: ChartContainerwallstreet,
    })
  } catch (error) {
    console.error(error)
    ns.tprint(error.toString())
    ns.exit()
  }

  // Listen for specific event
  let autoTrader = false
  let enableAutoTrader = false
  let wantsShutdown = false
  let buyMaxLongShares = false
  let closeLongPosition = false
  let closeShortPosition = false
  let buyMaxShortShares = false
  let sellAllShares = false
  let quickStrangle = false
  let longHedge = false
  let shortHedge = false
  let splitPlay = false
  let bus = Mitt().createBus()
  bus.on('wantsShutdown', () => (wantsShutdown = true))
  bus.on('buyMaxLong', () => (buyMaxLongShares = true))
  bus.on('buyMaxShort', () => (buyMaxShortShares = true))
  bus.on('closeAllPositions', () => (sellAllShares = true))
  bus.on('closeLong', () => (closeLongPosition = true))
  bus.on('closeShort', () => (closeShortPosition = true))
  bus.on('autoTrade', () => (enableAutoTrader = true))
  bus.on('quickPlay', () => (quickStrangle = true))
  bus.on('quickHedgeLong', () => (longHedge = true))
  bus.on('quickHedgeShort', () => (shortHedge = true))
  bus.on('quickSplitPlay', () => (splitPlay = true))
  setGlobal('tickerBus', bus)

  // Instead of closing, let's keep this running
  while (wantsShutdown == false) {
    //Let's go ahead and render the profit monitor into the stats overview hook.
    const doc = eval('document');
    const hook0 = doc.getElementById('overview-extra-hook-0');
    const hook1 = doc.getElementById('overview-extra-hook-1');
    var ticker = ns.args[0];
    var position = ns.stock.getPosition(ns.sprintf(ticker));

    try {
      const headers = []
      const values = [];
      // Current stock LONG position profits
      headers.push("[LONG] Profit: ");
      values.push(ns.nFormat(ns.stock.getSaleGain(ticker, position[0], "Long") - (position[0] * position[1]), '0.00a'));
      // Current stock SHORT position profits
      headers.push("[SHORT] Profit: ");
      values.push(ns.nFormat(ns.stock.getSaleGain(ticker, position[2], "Short") - (position[2] * position[3]), '0.00a'));
      // TODO: Add more neat stuff

      // Now drop it into the placeholder elements
      hook0.innerText = headers.join(" \n");
      hook1.innerText = values.join("\n");

    } catch (err) { // This might come in handy later

      ns.print("ERROR: Update Skipped: " + String(err));

    }

    await ns.asleep(200);

    var ticker = ns.args[0];
    var position = ns.stock.getPosition(ns.sprintf(ticker));
    //var shortProfit = ns.stock.getSaleGain(ticker, position[2], "Short") - (position[2] * position[3])
    //var longProfit = ns.stock.getSaleGain(ticker, position[0], "Long") - (position[0] * position[1])
    //var myMoney = ns.getServerMoneyAvailable("home");


    //

    if (buyMaxLongShares == true) {
      var position = ns.stock.getPosition(ns.sprintf(ticker));
      ns.stock.buy(ticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(ticker), ns.stock.getMaxShares(ticker)));
      await ns.asleep(100);
      ns.toast("LONG ORDER PLACED - " + ticker + ".", "info", 10000);
      buyMaxLongShares = false;

    }
    if (buyMaxShortShares == true) {
      var position = ns.stock.getPosition(ns.sprintf(ticker));
      ns.stock.short(ticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(ticker), ns.stock.getMaxShares(ticker)));
      await ns.asleep(100);
      ns.toast("SHORT ORDER PLACED - " + ticker + ".", "info", 10000);
      buyMaxShortShares = false;

    }
    if (sellAllShares == true) {
      var position = ns.stock.getPosition(ns.sprintf(ticker));
      ns.stock.sell(ticker, position[0]);
      ns.stock.sellShort(ticker, position[2]);
      ns.toast("CLOSED **ALL** POSITIONS FOR " + ticker, "warning", 5000);
      sellAllShares = false;

    }
    if (closeLongPosition == true) {
      var position = ns.stock.getPosition(ns.sprintf(ticker));
      ns.stock.sell(ticker, position[0]);
      ns.toast("CLOSED LONG POSITION FOR " + ticker, "warning", 5000);
      closeLongPosition = false;

    }
    if (closeShortPosition == true) {
      var position = ns.stock.getPosition(ns.sprintf(ticker));
      ns.stock.sellShort(ticker, position[2]);
      ns.toast("CLOSED SHORT POSITION FOR " + ticker, "warning", 5000);
      closeShortPosition = false;

    }
    if (safeMode == true && position[0] > '1' && ns.stock.getForecast(ticker) < 0.45) {
      ns.toast("TRADE PROTECTION TRIGGERED - FORECAST DOES NOT MATCH POSITION.  CLOSING LONG.", "warning", 5000);
      ns.stock.sell(ticker, position[0]);

    }
    if (safeMode == true && position[2] > '1' && ns.stock.getForecast(ticker) > 0.55) {
      ns.toast("TRADE PROTECTION TRIGGERED - FORECAST DOES NOT MATCH POSITION.  CLOSING SHORT.", "warning", 5000);
      ns.stock.sellShort(ticker, position[2]);

    }
    if (autoTrader == true && position[0] == '0' && ns.stock.getForecast(ticker) > 0.50) {
      ns.toast("AUTO-TRADE: LONG PURCHASED", "info", 2000);
      await ns.asleep(200);
      buyMaxLongShares = true;

    }

    if (autoTrader == true && position[2] == '0' && ns.stock.getForecast(ticker) < 0.50) {
      await ns.asleep(200);
      buyMaxShortShares = true;

    }
    if (quickStrangle == true && position[0] == '0' && ns.stock.getForecast(ticker) > 0.50) {
      ns.toast("Executing Quick Strangle on " + ticker + "...", "info", "5000");
      buyMaxLongShares = true;
      await ns.asleep(500);
      ns.stock.placeOrder(ticker, position[0], (ns.stock.getAskPrice(ticker) * 1.05), "LimitSell", "Long");
      ns.toast("Limit Sell Placed [LONG]...", "info", 2000);
      ns.stock.placeOrder(ticker, position[0], (ns.stock.getBidPrice(ticker) * 0.90), "StopSell", "Long");
      ns.toast("Stop Limit Placed [LONG]...", "info", 2000);
      quickStrangle = false;

    }
    if (quickStrangle == true && position[2] == '0' && ns.stock.getForecast(ticker) < 0.50) {
      ns.toast("Executing Quick Strangle on " + ticker + "...", "info", "5000");
      buyMaxShortShares = true;
      await ns.asleep(500);
      ns.stock.placeOrder(ticker, position[2], (ns.stock.getAskPrice(ticker) * 0.95), "LimitSell", "Short");
      ns.toast("Limit Sell Placed [SHORT]...", "info", 2000);
      ns.stock.placeOrder(ticker, position[2], (ns.stock.getBidPrice(ticker) * 1.10), "StopSell", "Short");
      ns.toast("Stop Limit Placed [SHORT]...", "info", 2000);
      quickStrangle = false;
      
    }
    if (longHedge == true && position[0] == '0'){
      ns.toast("Executing Hedged Long Play on " + ticker + "...", "info", 5000);
      ns.stock.buy(ticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(ticker) * 0.75, ns.stock.getMaxShares(ticker) * 0.75));
      ns.stock.short(ticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(ticker) * 0.25, ns.stock.getMaxShares(ticker) * 0.25));
      longHedge = false;

    }
    if (shortHedge == true && position[2] == '0'){
      ns.toast("Executing Hedged Short Play on " + ticker + "...", "info", 5000);
      ns.stock.buy(ticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(ticker) * 0.25, ns.stock.getMaxShares(ticker) * 0.25));
      ns.stock.short(ticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(ticker) * 0.75, ns.stock.getMaxShares(ticker) * 0.75));
      shortHedge = false;
      
    }
    if (splitPlay == true && position[0] == '0' && position[2] == '0'){
      ns.toast("Executing Split Play on " + ticker + "...", "info", 5000);
      ns.stock.buy(ticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(ticker) * 0.49, ns.stock.getMaxShares(ticker) * 0.50));
      ns.stock.short(ticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(ticker) * 0.49, ns.stock.getMaxShares(ticker) * 0.50));
      splitPlay = false;
      
    }

    if (enableAutoTrader == true) {
      let autoTradeConfirm = await ns.prompt("Enable Auto-Trade?")

      if (autoTradeConfirm == true) {
        ns.toast("Enabling Auto-Trader", "info", 5000);
        autoTrader = true;
        safeMode = true;
        enableAutoTrader = false;
      } 
      if (autoTradeConfirm == false) {
        ns.toast("Auto-Trader NOT Enabled", "info", 5000);
        autoTrader = false;
        safeMode = false;
        enableAutoTrader = false;
      }

    }

    await ns.asleep(500)

  }
}

export const SVGChartContainerwallstreet = 'svgChartContainerwallstreet'
const ChartContainerwallstreet = {
  name: 'svg-chart-wallstreet',
  inject: ['appShutdown',],
  template: html`
    <bbv-win
      class="__CMP_NAME__"
      title="WSE Active Trader"
      no-pad
      start-height="728px"
      start-width="725px"
    >
      <div><button @click="enableAutoTrade">Enable/Disable Auto-Trader (BETA)</button></div>
      <div v-once id="${SVGChartContainerwallstreet}" />
      <div>
      <button @click="quickStrangle">QUICK STRANGLE</button>
      <button @click="quickSplit">QUICK SPLIT</button>
      <button @click="longHedge">GO LONG - HEDGED</button>
      <button @click="shortHedge">GO SHORT - HEDGED</button>
      </div>
      <template #actions>
        <bbv-button @click="shutdownAll">Close Chart</bbv-button>
        <div><bbv-button @click="buyMaxLong">BUY MAX [LONG]</bbv-button></div>
        <div><bbv-button @click="buyMaxShort">BUY MAX [SHORT]</bbv-button></div>
        <div><bbv-button @click="sellMaxLong">SELL MAX [LONG]</bbv-button></div>
        <div><bbv-button @click="sellMaxShort">SELL MAX [SHORT]</bbv-button></div>
        <div><bbv-button @click="closeAllPositions">CLOSE ALL [ALL]</bbv-button></div>
      </template>
    </bbv-win>
  `,

  data() {
    return {}
  },

  methods: {
    shutdownAll() {
      getGlobal('tickerBus').emit('wantsShutdown')
      this.appShutdown()
    },
    buyMaxLong() {
      getGlobal('tickerBus').emit('buyMaxLong')
    },
    buyMaxShort() {
      getGlobal('tickerBus').emit('buyMaxShort')
    },
    closeAllPositions() {
      getGlobal('tickerBus').emit('closeAllPositions')
    },
    sellMaxLong() {
      getGlobal('tickerBus').emit('closeLong')
    },
    sellMaxShort() {
      getGlobal('tickerBus').emit('closeShort')
    },
    enableAutoTrade() {
      getGlobal('tickerBus').emit('autoTrade')
    },
    quickStrangle() {
      getGlobal('tickerBus').emit('quickPlay')
    },
    quickSplit() {
      getGlobal('tickerBus').emit('quickSplitPlay')
    },
    longHedge() {
      getGlobal('tickerBus').emit('quickHedgeLong')
    },
    shortHedge() {
      getGlobal('tickerBus').emit('quickHedgeShort')
    },
  },
}
