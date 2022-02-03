import { SVGChartContainerwallstreet } from 'wallstreet-lite.js'

export async function main(ns) {
  const doc = eval('document')
  var ticker = ns.args[0];

  //Number of lines rendered.  For stocks, I have this set to 60 to avoid cramping the window.
  const resolution = 420
  //Delay between data gathered in seconds.  For stocks, once again, delayed a bit so that there isn't tons of 'flat zones' on the chart.
  const delay = 10

  const textSize = 2.5

  const lineColor = 'green'

  const strokeWidth = 0.5

  const conWidth = 80
  const conHeight = 60
  const wBuffer = 1
  const hBuffer = 5
  await ns.clearPort(1)
  await ns.clearPort(2)
  await ns.writePort(3, ticker)


  var container = doc.getElementById('graph_container')

  if (container != null) {
    KillChildren(container)
    container.remove()
  }
 //Give the chart time to load.
  const dropPage = doc.getElementById(SVGChartContainerwallstreet)

  container = doc.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const containerAttr = [
    ['viewBox', '0 0 ' + conWidth + ' ' + conHeight],
    ['xmlns', 'http://www.w3.org/2000/svg'],
    ['id', 'graph_container'],
  ]
  AddAttr(container, containerAttr)
  
  dropPage.appendChild(container)

  const uiThickness = 0.1

  var topLine = doc.createElementNS('http://www.w3.org/2000/svg', 'line')
  AddAttr(topLine, [
    ['x1', String(wBuffer)],
    ['y1', String(hBuffer)],
    ['x2', String(conWidth - wBuffer)],
    ['y2', String(hBuffer)],
    ['stroke', 'lightgrey'],
    ['stroke-width', String(uiThickness)],
  ])
  container.appendChild(topLine)

  var midLine = doc.createElementNS('http://www.w3.org/2000/svg', 'line')
  AddAttr(midLine, [
    ['x1', String(wBuffer)],
    ['y1', String(conHeight / 2)],
    ['x2', String(conWidth - wBuffer)],
    ['y2', String(conHeight / 2)],
    ['stroke', 'lightgrey'],
    ['stroke-width', String(uiThickness)],
  ])
  container.appendChild(midLine)

  var botLine = doc.createElementNS('http://www.w3.org/2000/svg', 'line')
  AddAttr(botLine, [
    ['x1', String(wBuffer)],
    ['y1', String(conHeight - hBuffer)],
    ['x2', String(conWidth - wBuffer)],
    ['y2', String(conHeight - hBuffer)],
    ['stroke', 'lightgrey'],
    ['stroke-width', String(uiThickness)],
  ])
  container.appendChild(botLine)


  var lines = []
  for (let i = 0; i < resolution - 1; i++) {
    lines[i] = doc.createElementNS('http://www.w3.org/2000/svg', 'line')
    AddAttr(lines[i], [
      ['x1', '0'],
      ['y1', '60'],
      ['x2', '100'],
      ['y2', '0'],
      ['stroke', 'green'],
      ['stroke-width', '1'],
    ])
    AddAttr(lines[i], [
      ['x1', '0'],
      ['y1', '0'],
      ['x2', '0'],
      ['y2', '0'],
      ['stroke', lineColor],
      ['stroke-width', String(strokeWidth)],
    ])
    container.appendChild(lines[i])
  }

  var topText = CreateText('LOADING FORECAST...', wBuffer, hBuffer + hBuffer / 2, container, doc, textSize)
  var topTextBG = doc.createElementNS('http://www.w3.org/2000/svg', 'rect')
  HighlightText(topTextBG, topText, container)

  var midText = CreateText('LOADING TICKER...', wBuffer, conHeight / 2 + hBuffer / 2, container, doc, textSize)
  var midTextBG = doc.createElementNS('http://www.w3.org/2000/svg', 'rect')
  HighlightText(midTextBG, midText, container)

  var botText = CreateText('COLLECTING DATA...', wBuffer, conHeight - hBuffer / 2, container, doc, textSize)
  var botTextBG = doc.createElementNS('http://www.w3.org/2000/svg', 'rect')
  HighlightText(botTextBG, botText, container)


  var values = []
  while (true) {
    var ticker = ns.args[0];
    var position = ns.stock.getPosition(ticker)
    try {
      if (values.length == resolution) {
        values.splice(0, 1)
        await ns.clearPort(1);
        await ns.clearPort(2);
        
      }
      values[values.length] = ns.stock.getPrice(ns.sprintf(ticker))

      if (values.length > 2) {
        var lineCount = values.length - 2
        var xOff = (conWidth - wBuffer * 2) / lineCount

        var moneyList = []

        for (let i = 0; i < values.length; i++) {
          moneyList[i] = values[i]
        }
      await ns.clearPort(1)
      await ns.clearPort(2)
      await ns.writePort(1, (Math.max(...moneyList)))
      await ns.writePort(2, (Math.min(...moneyList)))
      await ns.writePort(3, ticker)
        var tenmin = ns.nFormat((ns.peek(2) + ns.peek(1)) / 2, '$0.00a')
        var pricediff = (((ns.peek(2) + ns.peek(1)) / 2) - ns.stock.getAskPrice(ticker))
        var forecast = (pricediff / ns.stock.getAskPrice(ticker) *-1)
        var estVol = ns.nFormat((moneyList[299] + moneyList[2]) / 419, '$0.00a')
      await ns.writePort(4, forecast * 100);
      //await ns.writePort(4, (pricediff / ns.stock.getAskPrice(ticker) *-1000))


        var highestVal = moneyList[0]
        var lowestVal = moneyList[0]

        for (var i in moneyList) {
          if (moneyList[i] > highestVal) {
            highestVal = moneyList[i]
          }
          if (moneyList[i] < lowestVal) {
            lowestVal = moneyList[i]
          }
        }

        highestVal = highestVal - lowestVal
        //highestVal = moneyList[i];
        //The above line was commented out because that was causing a few unwanted behaviors.  This was originally intended to
        //monitor the player's cash, but has been tweaked for stocks.

        for (let i in moneyList) {
          if (highestVal != lowestVal) {
            moneyList[i] = (moneyList[i] - lowestVal) / highestVal
          } else {
            moneyList[i] = values[i]
            //This line was also changed by me.  This keeps the graph line from resetting to the middle, eliminating the EKG-style.
          }
        }

        for (let i = 0; i < lineCount; i++) {
          var temp = String(conHeight - (moneyList[i] * (conHeight - hBuffer * 2) + hBuffer))
          if (isNaN(temp)) {
            ns.asleep(5000);
            ns.print("Possible delay in data.  This could be caused by lots of scripts running on HOME.  Please wait...")
          }

          var attr = [
            ['x1', String(i * xOff + wBuffer)],
            ['y1', String(conHeight - (moneyList[i] * (conHeight - hBuffer * 2) + hBuffer))],
            ['x2', String((i + 1) * xOff + wBuffer)],
            ['y2', String(conHeight - (moneyList[i + 1] * (conHeight - hBuffer * 2) + hBuffer))],
          ]
          AddAttr(lines[i], attr)

        }
        //ns.nFormat((pricediff / ns.stock.getAskPrice(ticker) *-1), '%0.0')
        topText.innerHTML = 'Overall Trend: ' + ns.nFormat((pricediff / ns.stock.getAskPrice(ticker) *-1), '%0.0') + ' || [LONG] PROFIT: ' + ns.nFormat(ns.stock.getSaleGain(ticker, position[0], "Long") - (position[0] * position[1]), '0.00a');
        HighlightText(topTextBG, topText, container)

        midText.innerHTML = '['+ ticker + ']' + ': ' + ns.nFormat(ns.stock.getPrice(ns.sprintf(ticker)), '$0.00a') + ' || ('+ tenmin +' 7m AVG)'
        HighlightText(midTextBG, midText, container)

        botText.innerHTML = 'Movement Per Tick: ' + estVol + ' || [SHORT] PROFIT: ' + ns.nFormat(ns.stock.getSaleGain(ticker, position[2], "Short") - (position[2] * position[3]), '0.00a');
        HighlightText(botTextBG, botText, container)


        
      }


    } catch (err) {
      // This might come in handy later
      ns.print('ERROR: Update Skipped: ' + String(err))
    }
    await ns.sleep(delay * 100)
    await ns.clearPort(1);
    await ns.clearPort(2);
    await ns.clearPort(4);

    if (ns.isRunning("wallstreet-lite.js", "home") == false) {
      await ns.clearPort(1);
      await ns.clearPort(2);
      await ns.clearPort(3);
      await ns.clearPort(4);
      ns.exit();
    }

  }
}

function AddAttr(element, attrList) {
  for (var i in attrList) {
    element.setAttribute(attrList[i][0], attrList[i][1])
  }
}

function KillChildren(element) {
  const children = element.children
  for (var line of children) {
    line.remove()
  }
}

function CreateText(text, x, y, parent, doc, textSize) {
  var textElm = doc.createElementNS('http://www.w3.org/2000/svg', 'text')
  AddAttr(textElm, [
    ['x', String(x)],
    ['y', String(y)],
    ['fill', 'lightgrey'],
    ['font-size', String(textSize)],
    ['font-family', 'sans-serif'],
    ['stroke', 'black'],
    ['stroke-width', '0'],
  ])
  textElm.innerHTML = text
  parent.appendChild(textElm)
  return textElm
}

function HighlightText(bg, text, parent) {
  var textBox = text.getBBox()

  AddAttr(bg, [
    ['x', String(textBox.x)],
    ['y', String(textBox.y)],
    ['width', String(textBox.width)],
    ['height', String(textBox.height)],
    ['fill', 'black'],
    ['opacity', '0.0'],
  ])
  parent.insertBefore(bg, text)
  
}
