/*
	pro.coinbase API by Lobo 2022 22.01.22 16:40


	ADA-USD
	BTC-USD
*/

//DIVS
const table = document.getElementById("table");
const TOP = document.getElementById("top");
let highest = document.getElementById("highest");
let lowest = document.getElementById("lowest");
let trans = document.getElementById("tr");

//SETTINGS
let setCoin = ["BTC-USD"];

//SET
let highPrice = 0;
let lowPrice = 0;
let lastPrice = 0;
let topCalc = 0;
let test = 0;
let tr = 0;

//WEBSOCKET
const ws = new WebSocket("wss://ws-feed.pro.coinbase.com");
const params = { "type": "subscribe", "channels": [{"name": "ticker", "product_ids": setCoin}] }

//EVENT ON MESSAGE
ws.onmessage = (e) =>
{
	tr += 1;

	const data = JSON.parse(e.data);

	let price = parseFloat(data.price);
	let low = parseFloat(data.low_24h);
	let high = parseFloat(data.high_24h);
	let volume24 = parseFloat(data.volume_24h);

	var element = document.createElement("div");
    	element.appendChild(document.createTextNode(price));
    	document.getElementById('table').appendChild(element);

	if(table.childElementCount === 60)
	{
		table.removeChild(table.firstChild);
	}

	if(price > lastPrice)
	{
		element.style.backgroundColor = "lightgreen";
	}
	else if(price < lastPrice)
	{
		element.style.backgroundColor = "orange";
	}
	else if(price > highPrice)
	{
		element.style.backgroundColor = "green";
	}
	else if(price < lowPrice)
	{
		element.style.backgroundColor = "red";
	}
	else if(price == lowPrice)
	{
		element.style.backgroundColor = "yellow";
	}
	else if(price == highPrice)
	{
		element.style.backgroundColor = "yellow";
	}
	else if(price == lastPrice)
	{
		element.style.backgroundColor = "yellow";
	}
	else
	{
		element.style.backgroundColor = "white";
	}

	let test = price - lastPrice; //?

	if(test >= 0)
	{
        	TOP.innerText = Number(test).toFixed(8);
        	TOP.style.color = "green";
	}
	else
	{
                TOP.innerText = Number(test).toFixed(8);
                TOP.style.color = "red";
	}

	//SET
        highPrice = high;
        lowPrice = low;
	lastPrice = price;
	topCalc = price - lastPrice;

	highest.innerText = "H: " + highPrice;
	lowest.innerText = "L: " + lowPrice;
	trans.innerText = "TR: " + tr;

	table.scrollTop = table.scrollHeight - table.clientHeight;
}

//EVENT ON CLOSE
ws.onclose = (e) =>
{
	location.reload();
}

//EVENT ON ERROR
ws.onerror = (e) =>
{
	console.log("WEBSOCKET API ERROR, CONTACT ADMINISTRATOR");
}

//EVENT ON OPEN
ws.onopen = (e) =>
{
	/*
		Send json to get info..
	*/
	ws.send(JSON.stringify(params));
}

document.getElementById("copyright").innerText = setCoin;
