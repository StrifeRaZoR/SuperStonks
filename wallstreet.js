import AppFactory from '/bb-vue/AppFactory.js'
// prettier-ignore
import { getGlobal, html, Mitt, setGlobal } from '/bb-vue/lib.js'

/** @param { import("~/ns").NS } ns */
export async function main(ns) {
var ticker = ns.args[0];
  ns.run("wallstreet-data.js", 1, ticker)
  try {
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
  let bus = Mitt().createBus()
  bus.on('wantsShutdown', () => (wantsShutdown = true))
  setGlobal('tickerBus', bus)

  // Instead of closing, let's keep this running
  while (wantsShutdown == false) {
   await ns.asleep(500)
  }

//ns.stock.buy(ticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(ticker), ns.stock.getMaxShares(ticker)))
}

export const SVGChartContainerwallstreet = 'svgChartContainerwallstreet'
const ChartContainerwallstreet = {
  name: 'svg-chart-wallstreet',
  inject: ['appShutdown', 'sendOrderLong'], 
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
  }, 
}
