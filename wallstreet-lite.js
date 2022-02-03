import AppFactory from '/bb-vue/AppFactory.js'
// prettier-ignore
import { getGlobal, html, Mitt, setGlobal, css } from '/bb-vue/lib.js'

/** @param { import("~/ns").NS } ns */
export async function main(ns) {


  try {
    ns.disableLog('disableLog');
    ns.disableLog('asleep');
    ns.disableLog('sleep');
    ns.disableLog('getServerMoneyAvailable');

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
  //let quickStrangle = false
  let longHedge = false
  let shortHedge = false
  let splitPlay = false
  //let stockCrawler = false
  let shortStrangle = false
  let longStrangle = false

  //Ticker Chart Storage
  let loadECP = false
  let loadMGCP = false
  let loadBLD = false
  let loadCLRK = false
  let loadOMTK = false
  let loadFSIG = false
  let loadKGI = false
  let loadFLCM = false
  let loadSTM = false
  let loadDCOMM = false
  let loadHLS = false
  let loadVITA = false
  let loadICRS = false
  let loadUNV = false
  let loadAERO = false
  let loadOMN = false
  let loadSLRS = false
  let loadGPH = false
  let loadNVMD = false
  let loadWDS = false
  let loadLXO = false
  let loadRHOC = false
  let loadAPHE = false
  let loadSYSC = false
  let loadCTK = false
  let loadNTLK = false
  let loadOMGA = false
  let loadFNS = false
  let loadJGN = false
  let loadSGC = false
  let loadCTYS = false
  let loadMDYN = false
  let loadTITN = false
  //End of Ticker Chart Storage

  let bus = Mitt().createBus()
  bus.on('wantsShutdown', () => (wantsShutdown = true))
  bus.on('buyMaxLong', () => (buyMaxLongShares = true))
  bus.on('buyMaxShort', () => (buyMaxShortShares = true))
  bus.on('closeAllPositions', () => (sellAllShares = true))
  bus.on('closeLong', () => (closeLongPosition = true))
  bus.on('closeShort', () => (closeShortPosition = true))
  bus.on('autoTrade', () => (enableAutoTrader = true))
  //bus.on('quickPlay', () => (quickStrangle = true))
  bus.on('quickHedgeLong', () => (longHedge = true))
  bus.on('quickHedgeShort', () => (shortHedge = true))
  //bus.on('quickSplitPlay', () => (splitPlay = true))
  //bus.on('stockCrawler', () => (stockCrawler = true))
  bus.on('longStrangle', () => (longStrangle = true))
  bus.on('shortStrangle', () => (shortStrangle = true))

  //Ticker Chart Bus Triggers
  bus.on('loadECP', () => (loadECP = true))
  bus.on('loadMGCP', () => (loadMGCP = true))
  bus.on('loadBLD', () => (loadBLD = true))
  bus.on('loadCLRK', () => (loadCLRK = true))
  bus.on('loadOMTK', () => (loadOMTK = true))
  bus.on('loadFSIG', () => (loadFSIG = true))
  bus.on('loadKGI', () => (loadKGI = true))
  bus.on('loadFLCM', () => (loadFLCM = true))
  bus.on('loadSTM', () => (loadSTM = true))
  bus.on('loadDCOMM', () => (loadDCOMM = true))
  bus.on('loadHLS', () => (loadHLS = true))
  bus.on('loadVITA', () => (loadVITA = true))
  bus.on('loadICRS', () => (loadICRS = true))
  bus.on('loadUNV', () => (loadUNV = true))
  bus.on('loadAERO', () => (loadAERO = true))
  bus.on('loadOMN', () => (loadOMN = true))
  bus.on('loadSLRS', () => (loadSLRS = true))
  bus.on('loadGPH', () => (loadGPH = true))
  bus.on('loadNVMD', () => (loadNVMD = true))
  bus.on('loadWDS', () => (loadWDS = true))
  bus.on('loadLXO', () => (loadLXO = true))
  bus.on('loadRHOC', () => (loadRHOC = true))
  bus.on('loadAPHE', () => (loadAPHE = true))
  bus.on('loadSYSC', () => (loadSYSC = true))
  bus.on('loadCTK', () => (loadCTK = true))
  bus.on('loadNTLK', () => (loadNTLK = true))
  bus.on('loadOMGA', () => (loadOMGA = true))
  bus.on('loadFNS', () => (loadFNS = true))
  bus.on('loadJGN', () => (loadJGN = true))
  bus.on('loadSGC', () => (loadSGC = true))
  bus.on('loadCTYS', () => (loadCTYS = true))
  bus.on('loadMDYN', () => (loadMDYN = true))
  bus.on('loadTITN', () => (loadTITN = true))
  //End of Ticker Chart Bus Triggers
  setGlobal('tickerBus', bus)

  // Instead of closing, let's keep this running

  while (wantsShutdown == false) {

    //init chart loading triggers
    if (loadECP == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [ECP] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "ECP")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadECP = false;
    }
    if (loadMGCP == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [MGCP] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "MGCP")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadMGCP = false;
    }
    if (loadBLD == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [BLD] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "BLD")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadBLD = false;
    }
    if (loadCLRK == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [CLRK] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "CLRK")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadCLRK = false;
    }
    if (loadOMTK == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [OMTK] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "OMTK")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadOMTK = false;
    }
    if (loadFSIG == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [FSIG] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "FSIG")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadFSIG = false;
    }
    if (loadKGI == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [KGI] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "KGI")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadKGI = false;
    }
    if (loadFLCM == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [FLCM] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "FLCM")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadFLCM = false;
    }
    if (loadSTM == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [STM] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "STM")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadSTM = false;
    }
    if (loadDCOMM == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [DCOMM] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "DCOMM")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadDCOMM = false;
    }
    if (loadHLS == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [HLS] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "HLS")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadHLS = false;
    }
    if (loadVITA == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [VITA] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "VITA")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadVITA = false;
    }
    if (loadICRS == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [ICRS] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "ICRS")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadICRS = false;
    }
    if (loadUNV == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [UNV] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "UNV")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadUVN = false;
    }
    if (loadAERO == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [AERO] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "AERO")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadAERO = false;
    }
    if (loadOMN == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [OMN] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "OMN")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadOMN = false;
    }
    if (loadSLRS == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [SLRS] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "SLRS")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadSLRS = false;
    }
    if (loadGPH == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [GPH] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "GPH")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadGPH = false;
    }
    if (loadNVMD == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [NVMD] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "NVMD")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadNVMD = false;
    }
    if (loadWDS == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [WDS] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "WDS")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadWDS = false;
    }
    if (loadLXO == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [LXO] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "LXO")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadLXO = false;
    }
    if (loadRHOC == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [RHOC] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "RHOC")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadRHOC = false;
    }
    if (loadAPHE == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [APHE] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "APHE")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadAPHE = false;
    }
    if (loadSYSC == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [SYSC] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "SYSC")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadSYSC = false;
    }
    if (loadCTK == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [CTK] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "CTK")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadCTK = false;
    }
    if (loadNTLK == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [NTLK] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "NTLK")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadNTLK = false;
    }
    if (loadOMGA == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [OMGA] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "OMGA")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadOMGA = false;
    }
    if (loadFNS == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [FNS] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "FNS")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadFNS = false;
    }
    if (loadJGN == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [JGN] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "JGN")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadJGN = false;
    }
    if (loadSGC == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [SGC] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "SGC")

      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadSGC = false;
    }
    if (loadCTYS == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [CTYS] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "CTYS")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadCTYS = false;
    }
    if (loadMDYN == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [MDYN] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "MDYN")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadMDYN = false;
    }
    if (loadTITN == true) {
      await ns.scriptKill("wallstreet-lite-data.js", "home");
      ns.toast("Loading [TITN] Chart...", "info", 2000);
      await ns.asleep(500);
      await ns.run("wallstreet-lite-data.js", 1, "TITN")
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      //autoTrader = false;
      loadTITN = false;
    }

    //Global Stock Price Test Module
    // var market = ns.stock.getSymbols()
    // var mValues = []
    //   for (const target of market) {

    //     const timeframe = 300
    //     var mPrice = ns.stock.getAskPrice(target); 

    //     if (mValues.length == timeframe) {
    //       mValues.splice(0,1)
    //     }

    //     mValues[mValues.length] = mPrice

    //     var maxMarket = Math.max(...mValues)
    //     var minMarket = Math.min(...mValues)
    //     var mAvg = (maxMarket + minMarket) / 2
    //     var mDiff = mAvg - mPrice
    //     var trend = (mDiff / ns.stock.getAskPrice(target)) *0.1

    //     if (mValues.length > 200 && trend > 75) {
    //       ns.print(target + " - BULL TREND DETECTED")
    //       await ns.asleep(5000);
    //     }
    //     if (mValues.length > 200 && trend < -75) {
    //       ns.print(target + " - BEAR TREND DETECTED")
    //       await ns.asleep(5000);
    //     }

    //   await ns.asleep(2000);
    //   ns.print(target + ': ' + trend)

    // }



    //Stock Crawler Module
    // if (stockCrawler == true) {
    //   ns.toast("Crawling Market...", "info", 2000);
    //   var market = ns.stock.getSymbols().sort(function (a, b) { return ns.stock.getForecast(b) - ns.stock.getForecast(a); })
    //     for (const target of market) {
    //     var tvol = ns.stock.getVolatility(target);
    //     var tfor = ns.stock.getForecast(target);
    //       if (tvol > 0.01 && tfor > 0.6) {
    //       ns.tprint("CRAWLER REPORT: [LONG] TARGET");
    //       ns.tprint(target)
    //     }
    //       if (tvol > 0.01 && tfor < 0.4) {
    //       ns.tprint("CRAWLER REPORT: [SHORT] TARGET");
    //       ns.tprint(target)
    //     }
    //     await ns.asleep(100);
    //   stockCrawler = false;
    //   }
    // }



    //failsafe exit condition
    if (wantsShutdown == true) {
      ns.exit();
    }

    if (ns.peek(3) != "NULL PORT DATA") {

      let loadedticker = ns.peek(3);
      var position = ns.stock.getPosition(loadedticker);
      var maxlongshares = Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(loadedticker), ns.stock.getMaxShares(loadedticker));
      var maxshortshares = Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(loadedticker), ns.stock.getMaxShares(loadedticker));
      var exposureLong = position[0] * position[1];
      var exposureShort = position[2] * position[3];

      if (buyMaxLongShares == true) {
        ns.stock.buy(loadedticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(loadedticker), ns.stock.getMaxShares(loadedticker)));
        await ns.asleep(100);
        ns.toast("LONG ORDER PLACED - " + loadedticker + ".", "info", 10000);
        buyMaxLongShares = false;

      }
      if (buyMaxShortShares == true) {
        ns.stock.short(loadedticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(loadedticker), ns.stock.getMaxShares(loadedticker)));
        await ns.asleep(100);
        ns.toast("SHORT ORDER PLACED - " + loadedticker + ".", "info", 10000);
        buyMaxShortShares = false;

      }
      if (sellAllShares == true) {
        ns.stock.sell(loadedticker, position[0]);
        ns.stock.sellShort(loadedticker, position[2]);
        ns.toast("CLOSED **ALL** POSITIONS AND ORDERS FOR " + loadedticker, "warning", 5000);
        sellAllShares = false;

      }
      if (closeLongPosition == true) {
        ns.stock.sell(loadedticker, position[0]);
        ns.toast("CLOSED LONG POSITION FOR " + loadedticker, "warning", 5000);
        closeLongPosition = false;

      }
      if (closeShortPosition == true) {
        ns.stock.sellShort(loadedticker, position[2]);
        ns.toast("CLOSED SHORT POSITION FOR " + loadedticker, "warning", 5000);
        closeShortPosition = false;
      }
      //Auto-Trader.  Does what it says.  Controls all positions for that ticker for you.


      if (autoTrader == true && position[0] > '1' && ns.peek(4) < '0.5') {
        ns.toast("TRADE PROTECTION TRIGGERED - FORECAST DOES NOT MATCH POSITION.  CLOSING LONG.", "warning", 5000);
        ns.stock.sell(loadedticker, position[0]);

      }
      if (autoTrader == true && position[2] > '1' && ns.peek(4) > '-0.5') {
        ns.toast("TRADE PROTECTION TRIGGERED - FORECAST DOES NOT MATCH POSITION.  CLOSING SHORT.", "warning", 5000);
        ns.stock.sellShort(loadedticker, position[2]);


      }
      if (autoTrader == true && position[0] == '0' && ns.peek(4) > '5.0') {
        ns.toast("AUTO-TRADE: LONG PURCHASED", "info", 2000);
        await ns.asleep(200);
        buyMaxLongShares = true;

      }
      if (autoTrader == true && position[2] == '0' && ns.peek(4) < '-5.0') {
        ns.toast("AUTO-TRADE: SHORT PURCHASED", "info", 2000);
        await ns.asleep(200);
        buyMaxShortShares = true;
      }

      //   //Advanced position settings.  Can mess with these if you want, but after testing, these are great.


      if (longStrangle == true && position[0] == '0') {
        ns.toast("Executing Quick Strangle on " + loadedticker + "...", "info", "5000");
        ns.stock.buy(loadedticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(loadedticker), ns.stock.getMaxShares(loadedticker)));
        await ns.asleep(100);
        ns.stock.placeOrder(loadedticker, maxlongshares, (ns.stock.getAskPrice(loadedticker) * 1.07), "LimitSell", "Long");
        ns.toast("Limit Sell Placed [LONG]...", "info", 2000);
        ns.stock.placeOrder(loadedticker, maxlongshares, (ns.stock.getBidPrice(loadedticker) * 0.87), "StopSell", "Long");
        ns.toast("Stop Limit Placed [LONG]...", "info", 2000);
        longStrangle = false;

      }
      if (shortStrangle == true && position[2] == '0') {
        ns.toast("Executing Quick Strangle on " + loadedticker + "...", "info", "5000");
        ns.stock.short(loadedticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(loadedticker), ns.stock.getMaxShares(loadedticker)));
        await ns.asleep(100);
        ns.stock.placeOrder(loadedticker, maxshortshares, (ns.stock.getAskPrice(loadedticker) * 0.87), "LimitSell", "Short");
        ns.toast("Limit Sell Placed [SHORT]...", "info", 2000);
        ns.stock.placeOrder(loadedticker, maxshortshares, (ns.stock.getBidPrice(loadedticker) * 1.07), "StopSell", "Short");
        ns.toast("Stop Limit Placed [SHORT]...", "info", 2000);
        shortStrangle = false;

      }
      if (longHedge == true && position[0] == '0') {
        ns.toast("Executing Hedged Long Play on " + loadedticker + "...", "info", 5000);
        ns.stock.buy(loadedticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(loadedticker) * 0.75, ns.stock.getMaxShares(loadedticker) * 0.75));
        ns.stock.short(loadedticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(loadedticker) * 0.25, ns.stock.getMaxShares(loadedticker) * 0.25));
        longHedge = false;

      }
      if (shortHedge == true && position[2] == '0') {
        ns.toast("Executing Hedged Short Play on " + loadedticker + "...", "info", 5000);
        ns.stock.buy(loadedticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(loadedticker) * 0.25, ns.stock.getMaxShares(loadedticker) * 0.25));
        ns.stock.short(loadedticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(loadedticker) * 0.75, ns.stock.getMaxShares(loadedticker) * 0.75));
        shortHedge = false;

      }
      if (splitPlay == true && position[0] == '0' && position[2] == '0') {
        ns.toast("Executing Split Play on " + loadedticker + "...", "info", 5000);
        ns.stock.buy(loadedticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(loadedticker) * 0.49, ns.stock.getMaxShares(loadedticker) * 0.50));
        ns.stock.short(loadedticker, Math.min((ns.getServerMoneyAvailable("home") - 1000000) / ns.stock.getAskPrice(loadedticker) * 0.49, ns.stock.getMaxShares(loadedticker) * 0.50));
        splitPlay = false;

      }

      //Auto-Trader button configuration.  Don't touch.

      if (enableAutoTrader == true) {
        let autoTradeConfirm = await ns.prompt("Enable Auto-Trade?")

        if (autoTradeConfirm == true) {
          ns.toast("Enabling Auto-Trader", "info", 5000);
          autoTrader = true;
          enableAutoTrader = false;
        }
        if (autoTradeConfirm == false) {
          ns.toast("Auto-Trader NOT Enabled", "info", 5000);
          autoTrader = false;
          enableAutoTrader = false;
        }
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
      start-height="770px"
      start-width="619px"
    >
 
      <details align="center"><summary>TICKERS [ALL]</summary>
      <div>
      <button align="left" @click="loadECP">[ECP]</button>
      <button align="left" @click="loadMGCP">[MGCP]</button>
      <button align="left" @click="loadBLD">[BLD]</button>
      <button align="left" @click="loadCLRK">[CLRK]</button>
      <button align="left" @click="loadOMTK">[OMTK]</button>
      <button align="left" @click="loadFSIG">[FSIG]</button>
      <button align="left" @click="loadKGI">[KGI]</button>
      <button align="left" @click="loadFLCM">[FLCM]</button>
      <button align="left" @click="loadSTM">[STM]</button>
      <button align="left" @click="loadDCOMM">[DCOMM]</button>
      <button align="left" @click="loadHLS">[HLS]</button>
      <button align="center" @click="loadVITA">[VITA]</button>
      <button align="center" @click="loadICRS">[ICRS]</button>
      <button align="center" @click="loadUNV">[UNV]</button>
      <button align="center" @click="loadAERO">[AERO]</button>
      <button align="center" @click="loadOMN">[OMN]</button>
      <button align="center" @click="loadSLRS">[SLRS]</button>
      <button align="center" @click="loadGPH">[GPH]</button>
      <button align="center" @click="loadNVMD">[NVMD]</button>
      <button align="center" @click="loadWDS">[WDS]</button>
      <button align="center" @click="loadLXO">[LXO]</button>
      <button align="center" @click="loadRHOC">[RHOC]</button>
      <button align="right" @click="loadAPHE">[APHE]</button>
      <button align="right" @click="loadSYSC">[SYSC]</button>
      <button align="right" @click="loadCTK">[CTK]</button>
      <button align="right" @click="loadNTLK">[NTLK]</button>
      <button align="right" @click="loadOMGA">[OMGA]</button>
      <button align="right" @click="loadFNS">[FNS]</button>
      <button align="right" @click="loadJGN">[JGN]</button>
      <button align="right" @click="loadSGC">[SGC]</button>
      <button align="right" @click="loadCTYS">[CTYS]</button>
      <button align="right" @click="loadMDYN">[MDYN]</button>
      <button align="right" @click="loadTITN">[TITN]</button>
      </div>
      </details>
      </div>
      <div v-once id="${SVGChartContainerwallstreet}" />
      <details align="left"><summary>Advanced Positions</summary>
      <div>
      <button @click="quickSplit">QUICK SPLIT</button>
      <button @click="longHedge">GO LONG - HEDGED</button>
      <button @click="shortHedge">GO SHORT - HEDGED</button>
      <button @click="longStrangle">LONG STRANGLE</button>
      <button @click="shortStrangle">SHORT STRANGLE</button>
      </div>
      </details>
      <details align="right"><summary>TOOLS</summary>
      <div>
      <button @click="enableAutoTrade">AUTO TRADE</button>
      </div>
      </details>

      <template #actions>
        <div><bbv-button @click="shutdownAll">Close Chart</bbv-button></div>
        <div><bbv-button @click="buyMaxLong">BUY MAX [LONG]</bbv-button></div>
        <div><bbv-button @click="buyMaxShort">BUY MAX [SHORT]</bbv-button></div>
        <div><bbv-button @click="sellMaxLong">SELL MAX [LONG]</bbv-button></div>
        <div><bbv-button @click="sellMaxShort">SELL MAX [SHORT]</bbv-button></div>
        <div><bbv-button @click="closeAllPositions">SELL ALL</bbv-button></div>
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
    longStrangle() {
      getGlobal('tickerBus').emit('longStrangle')
    },
    shortStrangle() {
      getGlobal('tickerBus').emit('shortStrangle')
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
    // stockCrawler() {
    //   getGlobal('tickerBus').emit('stockCrawler')
    // },
    // enableSmartTrade() {
    //   getGlobal('tickerBus').emit('enableSmartTrade')
    // },
    sellAllStocks() {
      getGlobal('tickerBus').emit('sellAllStocks')
    },
    loadECP() {
      getGlobal('tickerBus').emit('loadECP')
    },
    loadMGCP() {
      getGlobal('tickerBus').emit('loadMGCP')
    },
    loadBLD() {
      getGlobal('tickerBus').emit('loadBLD')
    },
    loadCLRK() {
      getGlobal('tickerBus').emit('loadCLRK')
    },
    loadOMTK() {
      getGlobal('tickerBus').emit('loadOMTK')
    },
    loadFSIG() {
      getGlobal('tickerBus').emit('loadFSIG')
    },
    loadKGI() {
      getGlobal('tickerBus').emit('loadKGI')
    },
    loadFLCM() {
      getGlobal('tickerBus').emit('loadFLCM')
    },
    loadSTM() {
      getGlobal('tickerBus').emit('loadSTM')
    },
    loadDCOMM() {
      getGlobal('tickerBus').emit('loadDCOMM')
    },
    loadHLS() {
      getGlobal('tickerBus').emit('loadHLS')
    },
    loadVITA() {
      getGlobal('tickerBus').emit('loadVITA')
    },
    loadICRS() {
      getGlobal('tickerBus').emit('loadICRS')
    },
    loadUNV() {
      getGlobal('tickerBus').emit('loadUNV')
    },
    loadAERO() {
      getGlobal('tickerBus').emit('loadAERO')
    },
    loadOMN() {
      getGlobal('tickerBus').emit('loadOMN')
    },
    loadSLRS() {
      getGlobal('tickerBus').emit('loadSLRS')
    },
    loadGPH() {
      getGlobal('tickerBus').emit('loadGPH')
    },
    loadNVMD() {
      getGlobal('tickerBus').emit('loadNVMD')
    },
    loadWDS() {
      getGlobal('tickerBus').emit('loadWDS')
    },
    loadLXO() {
      getGlobal('tickerBus').emit('loadLXO')
    },
    loadRHOC() {
      getGlobal('tickerBus').emit('loadRHOC')
    },
    loadAPHE() {
      getGlobal('tickerBus').emit('loadAPHE')
    },
    loadSYSC() {
      getGlobal('tickerBus').emit('loadSYSC')
    },
    loadCTK() {
      getGlobal('tickerBus').emit('loadCTK')
    },
    loadNTLK() {
      getGlobal('tickerBus').emit('loadNTLK')
    },
    loadOMGA() {
      getGlobal('tickerBus').emit('loadOMGA')
    },
    loadFNS() {
      getGlobal('tickerBus').emit('loadFNS')
    },
    loadJGN() {
      getGlobal('tickerBus').emit('loadJGN')
    },
    loadSGC() {
      getGlobal('tickerBus').emit('loadSGC')
    },
    loadCTYS() {
      getGlobal('tickerBus').emit('loadCTYS')
    },
    loadMDYN() {
      getGlobal('tickerBus').emit('loadMDYN')
    },
    loadTITN() {
      getGlobal('tickerBus').emit('loadTITN')
    },
  },
}
