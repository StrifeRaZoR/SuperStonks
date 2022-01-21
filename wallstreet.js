import AppFactory from '/bb-vue/AppFactory.js'
// prettier-ignore
import { getGlobal, html, Mitt, setGlobal } from '/bb-vue/lib.js'

/** @param { import("~/ns").NS } ns */
export async function main(ns) {
  var ticker = ns.args[0];
  let safeMode = await ns.prompt("Would you like to enable Trade Protection?");
  safeMode
  ns.tail();

  await ns.run("wallstreet-data.js", 1, ticker)
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
  let bus = Mitt().createBus()
  bus.on('wantsShutdown', () => (wantsShutdown = true))
  bus.on('buyMaxLong', () => (buyMaxLongShares = true))
  bus.on('buyMaxShort', () => (buyMaxShortShares = true))
  bus.on('closeAllPositions', () => (sellAllShares = true))
  bus.on('closeLong', () => (closeLongPosition = true))
  bus.on('closeShort', () => (closeShortPosition = true))
  bus.on('autoTrade', () => (enableAutoTrader = true))
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
      await ns.asleep(200);
      buyMaxLongShares = true;

    }

    if (autoTrader == true && position[2] == '0' && ns.stock.getForecast(ticker) < 0.50) {
      await ns.asleep(200);
      buyMaxShortShares = true;

    }

    if (enableAutoTrader == true) {
      let autoTradeConfirm = ns.prompt("Enable Auto-Trade?")
      await autoTradeConfirm;
      if (autoTradeConfirm = true) {
        ns.toast("Enabling Auto-Trader", "info", 5000);
        autoTrader = true;
        safeMode = true;
        enableAutoTrader = false;
      } else {
        ns.toast("Auto-Trader NOT Enabled", "info", 5000);
        autoTrader = false;
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
      start-height="70%"
      start-width="40%"
    >
      <div><button @click="enableAutoTrade">Enable/Disable Auto-Trader (BETA)</button></div>
      <div v-once id="${SVGChartContainerwallstreet}" />
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
  },
}
