//////////////New Upgrades///////////////
//                                                                //
//   More Wheat per Click                         //
//   Better Bread                                     //
//   Faster Auto Wheat/Bread/Selling   //
//                                                            //
/////////////////////////////////////////

// "rgb("+Math.floor(255 - (2.55*perc))+","+Math.round(2.55*perc)+",0)"

var money = 0;
var totalMoney = 0;
var wheat = 0;
var totalWheat = 0;
var bread = 0;
var totalBread = 0;

var autoWheatPrice = 15;
var autoBreadPrice = 20;
var autoSellBreadPrice = 25;
var increasedBreadPricePrice = 50;
var autoBuyReseachPrice = 50;

var wheatAuto = false;
var breadAuto = false;
var sellBreadAuto = false;
var research = false;

var autosave = false;

var currentTimeWheat = 0;
var currentTimeBread = 0
var currentTimeSellBread = 0;
var currentAutosave = 0;

var wheatTimeout = 3000;
var breadTimeout = 3000;
var sellBreadTimeout = 3000;
var autosaveTimeout = 6000;

var breadPrice = 1;

var currency = "";

var rp = 0;
var totalRP = 0;
var rpMax = 100;
var rPoint = 0;

var achievementIcon = '<img src="icons/achievement.png" width="45" height="45">';
var saveIcon = '<img src="icons/save.png" width="35" height="35">';

spop.defaults = {
	icon: false,
	style: 'default',
	autoclose: 4000,
	position: 'top-right'
};

var achievements = {
	Wheat: {
		amount: [1, 10, 25, 50, 100, 200, 500, 750, 1000, 2500, 5000, 10000, 15000, 25000, 50000, 100000, 500000, 1000000, 5000000, 10000000],
		achieved: [],
		variableName: "totalWheat",
		onAchieveText: "You harvested <> Wheat!",
	},
	Bread: {
		amount: [1, 10, 25, 50, 100, 200, 500, 750, 1000, 2500, 5000, 10000, 15000, 25000, 50000, 100000, 500000, 1000000, 5000000, 10000000],
		achieved: [],
		variableName: "totalBread",
		onAchieveText: "You baked <> Bread!",
	},
	Money: {
		amount: [1, 10, 25, 50, 100, 200, 500, 750, 1000, 2500, 5000, 10000, 15000, 25000, 50000, 100000, 500000, 1000000, 5000000, 10000000],
		achieved: [],
		variableName: "totalMoney",
		onAchieveText: "You earned <> Money!",
	},
	RP: {
		amount: [1, 10, 25, 50, 100, 200, 500, 750, 1000, 2500, 5000, 10000, 15000, 25000, 50000, 100000, 500000, 1000000, 5000000, 10000000],
		achieved: [],
		variableName: "totalRP",
		onAchieveText: "You earned <> Research Points!",
	}
}

for (var key in achievements) {
	var length = achievements[key].amount.length;
	for (var i = 0; i < length; i++) {
		achievements[key].achieved[i] = false;
	}
}
var achievementsNumber = 0;
var achievementsCompleted = 0;
for (var key in achievements) {
	var length = achievements[key].amount.length;
	for (var i = 0; i < length; i++) {
		var inc = achievements[key].amount[i];
		var element = '<div id="' + key + inc + '" class=achievement data-item=' + key + ' data-amount=' + inc + '>?</div>'
		$('#achievementsContainer').append(element);
		achievementsNumber++;
	}
	//	$('#achievementsContainer').append("<div style=clear:both;></div>");
}

function harvestWheat() {
	wheat += 1;
	totalWheat += 1;
}

function bakeBread() {
	if (wheat >= 1) {
		bread = bread + 1;
		totalBread = totalBread + 1;
		wheat = wheat - 1;
	}
}

function sellBread() {
	if (bread >= 1) {
		money = money + breadPrice;
		totalMoney = totalMoney + breadPrice;
		bread = bread - 1;
	}
}

function update() {
	document.getElementById("money").innerHTML = "Money: " + Math.floor(money).toLocaleString() + currency;
	document.getElementById("wheat").innerHTML = "Wheat: " + Math.floor(wheat).toLocaleString();
	document.getElementById("bread").innerHTML = "Bread: " + Math.floor(bread).toLocaleString();
	document.getElementById("rp").innerHTML = "RP: " + Math.floor(rPoint);

	if (wheatAuto) {
		currentTimeWheat += 100;
	}
	if (currentTimeWheat > wheatTimeout) {
		currentTimeWheat = 0;
		harvestWheat();
	}
	var perc = currentTimeWheat / wheatTimeout * 100
	document.getElementById("wheatBar").style.width = perc + "%";
	document.getElementById("wheatBar").style.backgroundColor = "rgb(" + Math.floor(255 - (2.55 * perc)) + "," + Math.round(2.55 * perc) + ",0)";
	if (breadAuto && wheat >= 1) {
		currentTimeBread += 100;
	}
	if (currentTimeBread > breadTimeout) {
		currentTimeBread = 0;
		bakeBread();
	}
	perc = currentTimeBread / breadTimeout * 100
	document.getElementById("breadBar").style.width = perc + "%";
	document.getElementById("breadBar").style.backgroundColor = "rgb(" + Math.floor(255 - (2.55 * perc)) + "," + Math.round(2.55 * perc) + ",0)";
	if (sellBreadAuto && bread >= 1) {
		currentTimeSellBread += 100;
	}
	if (currentTimeSellBread > sellBreadTimeout) {
		currentTimeSellBread = 0;
		sellBread();
	}

	autosave = $('#autosaveC').is(':checked');
	if (autosave) {
		currentAutosave += 1;
	}
	if (currentAutosave > autosaveTimeout) {
		currentAutosave = 0;
		saveGame();
	}

	perc = currentTimeSellBread / sellBreadTimeout * 100
	document.getElementById("moneyBar").style.width = perc + "%";
	document.getElementById("moneyBar").style.backgroundColor = "rgb(" + Math.floor(255 - (2.55 * perc)) + "," + Math.round(2.55 * perc) + ",0)";

	setTimeout(update, 100);
}

function typeWriterEffect(id, msg) {
	var text = "";
	var length = msg.length;
	var x = 0;
	var speed = 125;

	function nextLetter() {
		text += msg.charAt(x);

		document.getElementById(id).innerHTML = "<center>" + text + "</center>";

		if (x < length) {
			x++;

			setTimeout(nextLetter, speed);
		}
	}
	nextLetter();
}
typeWriterEffect("mainText", "Bread Maker");

$(function () {
	var handle = $("#custom-handle");
	$("#slider").slider({
		min: 5,
		max: 120,
		step: 5,
		create: function () {
			handle.text($(this).slider("value") + "s");
		},
		slide: function (event, ui) {
			autosaveTimeout = ui.value * 10
			handle.text(ui.value + "s");
		}
	});
});

function loop() {
	for (var key in achievements) {
		var amount = achievements[key].amount;
		var obj = window[achievements[key].variableName];
		for (var i = 0; i < amount.length; i++) {
			var achieved = achievements[key].achieved[i];
			if (obj >= amount[i] && achieved == false) {
				var title = "Collect " + amount[i].toLocaleString() + " " + key;
				$("#" + key + amount[i]).html("&#10003;");
				$("#" + key + amount[i]).prop("title", title);
				$("#" + key + amount[i]).addClass("tip");
				tooltip();
				achievementsCompleted++;
				var text = achievements[key].onAchieveText;
				text = text.replace(/<>/g, amount[i].toLocaleString())
				achievements[key].achieved[i] = true;
				spop(achievementIcon + "&nbsp;&nbsp;" + text + "<br><center style=color:#26bd1c>Achievement Unlocked</center>");
			}
		}
	}

	var perc = achievementsCompleted / achievementsNumber * 100
	$('#achievementTitle').html("Achievements (" + Math.floor(perc) + "%)");

	perc = (rp / rpMax) * 100;
	document.getElementById("rpbar").style.width = perc + "%";
	document.getElementById("rpBar").style.width = perc + "%";
	if (research) {
		rp = rp + 1;
	}
	if (rp >= rpMax) {
		rPoint = rPoint + 1;
		totalRP += 1;
		rp = 0;
	}
	var theme = $('#selectTheme').val()
	if (theme == 'default') {
		$('body').css({
			backgroundColor: "#fff",
			color: "#000",
		})
		$('.sidenav a').css({
			color: "#fff",
		})
		$('.btn-default').css({
			color: "#fff",
		})
	}
	if (theme == 'nightMode') {
		$('body').css({
			backgroundColor: "#0b0b0b",
			color: "#fff",
		})
		$('.sidenav a').css({
			color: "#fff",
		})
		$('.btn-default').css({
			color: "#fff",
		})
	}
	$("#stats").html("Total Bread Sold: " + totalMoney.toLocaleString() + "<br>Total Wheat harvested: " + totalWheat.toLocaleString() + "<br>Total Bread baked: " + totalBread.toLocaleString() + "<br>Total Research Points: " + totalRP.toLocaleString())
	currency = $('#selectCurrency').val()
	setTimeout(loop, 100);
}
loop();

function wheatAutoFunc() {
	if (money >= autoWheatPrice) {
		money -= autoWheatPrice;
		document.getElementById("buyautowheat").style.display = 'none';
		wheatAuto = true;
	}
}

function breadAutoFunc() {
	if (money >= autoBreadPrice) {
		money -= autoBreadPrice;
		document.getElementById("buyautobread").style.display = 'none';
		breadAuto = true;
	}
}

function sellBreadAutoFunc() {
	if (money >= autoSellBreadPrice) {
		money -= autoSellBreadPrice;
		document.getElementById("buyautosellbread").style.display = 'none';
		sellBreadAuto = true;
	}
}

function buyResearchFunc() {
	if (money >= autoBuyReseachPrice) {
		money -= autoBuyReseachPrice;
		document.getElementById("buyresearch").style.display = 'none';
		research = true;
	}
}

function start() {
	update();
}

function openNav() {
	document.getElementById("sideNav").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
	document.getElementById("sideNav").style.width = "0";
	document.getElementById("main").style.marginLeft = "0";
}

function increaseBreadPrice() {
	if (money >= 50) {
		money -= 50;
		breadPrice += 1;
		document.getElementById("buyincreasedbreadprice").style.display = 'none';
	}
}

function fasterSelling(obj) {
	if (rPoint >= 45) {
		rPoint -= 45;
		animateOut(obj);
		sellBreadTimeout = 2000;
	}
}

function fasterWheat(obj) {
	if (rPoint >= 25) {
		rPoint -= 25;
		animateOut(obj);
		wheatTimeout = 2000;
	}
}

function fasterBread(obj) {
	if (rPoint >= 35) {
		rPoint -= 35;
		animateOut(obj);
		breadTimeout = 2000;
	}
}
var variablelist = ['money', 'totalMoney', 'wheat', 'totalWheat', 'bread', 'totalBread', 'autoWheatPrice', 'autoBreadPrice', 'autoSellBreadPrice', 'increasedBreadPricePrice', 'autoBuyReseachPrice', 'wheatAutofalse', 'breadAutofalse', 'sellBreadAutofalse', 'researchfalse', 'currentTimeWheat', 'currentTimeBread', 'currentTimeSellBread', 'wheatTimeout', 'breadTimeout', 'sellBreadTimeout', 'breadPrice', 'currency', 'rp', 'totalRP', 'rpMax', 'rPoint'];
var variablelength = variablelist.length;

function saveGame() {
	localStorage["achievements"] = JSON.stringify(achievements);
	for (var i = 0; i < variablelength; i++) {
		localStorage.setItem(variablelist[i], (window[variablelist[i]]));
	}
	spop("<center>Game Saved!</center>");
}

function loadGame() {
	achievements = JSON.parse(localStorage["achievements"]);
	for (var i = 0; i < variablelength; i++) {
		if (isNaN(localStorage.getItem(variablelist[i])) == false){
			window[variablelist[i]] = (parseFloat(localStorage.getItem(variablelist[i])));
			continue;
		}
		window[variablelist[i]] = (localStorage.getItem(variablelist[i]));
	}
	
	for (var key in achievements){
    for (var s = 0; s < achievements[key].amount.length; s++){
      if (achievements[key].achieved[s]){
		  console.log(key,achievements[key].achieved[s]);
        $('#'+key+achievements[key].amount[s]).html("");
        var title = "Collect "+achievements[key].amount[s].toLocaleString()+" "+key;
        $('#'+key+achievements[key].amount[s]).html('<div class=tip title="'+title+'">&#10003;</div>');
      }
    }
  }
	spop("<center>Game Loaded!</center>");
}

function animateOut(obj) {
	$(obj).css({
		position: "absolute",
	})
	$(obj).animate({
		bottom: "10px",
		opacity: "0",
	}, 650, 'easeInOutBack', function () {
		$(this).remove();
	})
}

function tooltip() {
	$('.tip').tooltipster({
		animation: 'grow',
		delay: 50,
		theme: 'tooltipster-punk',
	});
}
setTimeout(tooltip,1500);
