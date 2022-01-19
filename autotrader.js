// Built upon u/pwillia7 's stock script.
// u/ferrus_aub stock script using simple portfolio algorithm.
/** @param {NS} ns **/
export async function main(ns) {
    var maxSharePer = 1.00
    var stockBuyPer = 0.60  //If stock has a 60% chance to increase, we go Long.
    var stockShortPer = 0.40  //If stock has a 40% chance to increase (60% to decrease), we go Short.
    var stockVolPer = 0.1  // Anything under 1.00% percent volatility will be targeted.  Careful with this one.
    var moneyKeep = 100000000 //The amount of money you want to keep at all times.  100m default.
    var minSharePer = 25  //Minimum amount of shares to spend on an order.  Set higher if commissions are eating you.

    while (true) {
        ns.disableLog('disableLog');
        ns.disableLog('sleep');
        ns.disableLog('getServerMoneyAvailable');
        var stocks = ns.stock.getSymbols()
        for (const stock of stocks) {
            var position = ns.stock.getPosition(stock);
            if (position[0]) {
                //ns.print('Position: ' + stock + ', ')
                sellPositionsLong(stock);
                sellPositionsShort(stock);
            }
            buyPositions(stock);
            buyPositionsShort(stock);
        }
        ns.print('Cycle Complete');
        await ns.sleep(6000);
    }
    function buyPositions(stock) {
        var maxShares = (ns.stock.getMaxShares(stock) * maxSharePer) - position[0];
        var askPrice = ns.stock.getAskPrice(stock);
        var forecast = ns.stock.getForecast(stock);
        var volPer = ns.stock.getVolatility(stock);
        var playerMoney = ns.getServerMoneyAvailable('home');

        if (forecast >= stockBuyPer && volPer <= stockVolPer) {
            if (playerMoney - moneyKeep > ns.stock.getPurchaseCost(stock,minSharePer, "Long")) {
                var shares = Math.min((playerMoney - moneyKeep - 100000) / askPrice, maxShares);
                ns.stock.buy(stock, shares);
                //ns.print('Bought: '+ stock + '')
            }

            
        }      
    }
    //Added the short positions for BN8.  Feel free to comment out the functions in the main stack at lines 22 and 25. -StrifeRaZoR
    function buyPositionsShort(stock) {
        var maxShares = (ns.stock.getMaxShares(stock) * maxSharePer) - position[2];
        var askPrice = ns.stock.getAskPrice(stock);
        var forecast = ns.stock.getForecast(stock);
        var volPer = ns.stock.getVolatility(stock);
        var playerMoney = ns.getServerMoneyAvailable('home');

        if (forecast <= stockShortPer && volPer <= stockVolPer) {
            if (playerMoney - moneyKeep > ns.stock.getPurchaseCost(stock,minSharePer, "Short")) {
                var shares = Math.min((playerMoney - moneyKeep - 100000) / askPrice, maxShares);
                ns.stock.short(stock, shares);
                //ns.print('Bought: '+ stock + '')
            }

            
        }      
    }
    function sellPositionsLong(stock) {
        var forecast = ns.stock.getForecast(stock);
        if (forecast < 0.5) {
            ns.stock.sell(stock, position[0]);
            //ns.print('Sold: '+ stock + '')
        }
    }
    function sellPositionsShort(stock) {
        var forecast = ns.stock.getForecast(stock);
        if (forecast > 0.5) {
            ns.stock.sellShort(stock, position[2]);
        }
    }
}
