import AppFactory from '/bb-vue/AppFactory.js'
// prettier-ignore
import { getGlobal, html, Mitt, setGlobal } from '/bb-vue/lib.js'

/** @param { import("~/ns").NS } ns */
export async function main(ns) {
var ticker = ns.args[0];
ns.tail();

  ns.run("wallstreet-data.js", 1, ticker)
  try {
    ns.disableLog('disableLog');
    ns.disableLog('asleep');
    ns.disableLog('sleep');
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

  let wantsShutdown = false
  let buyMaxLongShares = false
  let buyMaxShortShares = false
  let sellAllShares = false
  let bus = Mitt().createBus()
  bus.on('wantsShutdown', () => (wantsShutdown = true))
  bus.on('buyMaxLong', () => (buyMaxLongShares = true))
  bus.on('buyMaxShort', () => (buyMaxShortShares = true))
  bus.on('closeAllPositions', () => (sellAllShares = true))
  setGlobal('tickerBus', bus)

  // Instead of closing, let's keep this running
  while (wantsShutdown == false) {
    var position = ns.stock.getPosition(ticker);
      if (buyMaxLongShares == true) {

        ns.stock.buy(ticker, Math.min((ns.getServerMoneyAvailable("home") - 10000) / ns.stock.getAskPrice(ticker), ns.stock.getMaxShares(ticker)))
        buyMaxLongShares = false;

      }
      if (buyMaxShortShares == true) {

        ns.stock.short(ticker, Math.min((ns.getServerMoneyAvailable("home") - 10000) / ns.stock.getAskPrice(ticker), ns.stock.getMaxShares(ticker)))
        buyMaxShortShares = false;

      }
      if (sellAllShares == true) {

        ns.stock.sell(ticker, position[0]);
        ns.stock.sellShort(ticker, position[2]);
        sellAllShares = false;

      }

   await ns.asleep(500)
  }
//ns.stock.buy(ticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(ticker), ns.stock.getMaxShares(ticker))))
//ns.stock.buy(ticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(ticker), ns.stock.getMaxShares(ticker)))
}

export const SVGChartContainerwallstreet = 'svgChartContainerwallstreet'
const ChartContainerwallstreet = {
  name: 'svg-chart-wallstreet',
  inject: ['appShutdown',], 
  template: html`
    <bbv-win
      class="__CMP_NAME__"
      title="Wall Street Wave Trend"
      no-pad
      start-height="60%"
      start-width="40%"
    >
      <div v-once id="${SVGChartContainerwallstreet}" />
      <template #actions>
        <bbv-button @click="shutdownAll">Close Chart</bbv-button>
        <div><bbv-button @click="buyMaxLong">BUY MAX [LONG]</bbv-button></div>
        <div><bbv-button @click="buyMaxShort">BUY MAX [SHORT]</bbv-button></div>
        <div><bbv-button @click="closeAllPositions">SELL/CLOSE ALL</bbv-button></div>
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
  }, 
}
