let modInfo = {
	name: "外卖树",
	id: "food-tree",
	author: "Hydrogenated233",
	pointsName: "食物",
	modFiles: ["layers.js", "tree.js"],

	discordName: "鸿运当头666",
	discordLink: "https://hydrogenated233.github.io/The-Food-Tree/",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "帅otto帅",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- 今天来点大家想看的。`

let winText = `你则么死了？`

// 新函数屏蔽器
var doNotCallTheseFunctionsEveryTick = []

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// 是否显示获得
function canGenPoints(){
	return true
}

// 计算获得
function getPointGen() {
	if(!canGenPoints()) return new Decimal(0)
	// 基础值
	let gain = new Decimal(1)
	// 乘数
	if (hasUpgrade('exp', 11)) gain = gain.times(upgradeEffect('exp',11))
	if (hasUpgrade('exp', 12)) gain = gain.times(upgradeEffect('exp',12))
	if (hasUpgrade('exp', 14)) gain = gain.times(upgradeEffect('exp',14))
	gain=gain.times(buyableEffect('exp',11))
	if (hasChallenge('exp', 11)) gain = gain.times(challengeEffect('exp', 11))
	if (hasChallenge('exp', 12)) gain = gain.times(challengeEffect('exp', 12))
	// 指数
	if (hasUpgrade('exp', 15)) gain = gain.pow(upgradeEffect('exp',15))
	if (hasUpgrade('exp', 16)) gain = gain.pow(upgradeEffect('exp',16))
	return gain
}

// 不属于任何层的数据存放处，需要初始值。
function addedPlayerData() { return {
}}

// 顶部显示文字。
var displayThings = [
	"结局:e35"
]

// 结局条件
function isEndgame() {
	return player.points.gte(new Decimal("e35"))
}


// 背景样式，可以为函数。
var backgroundStyle = {
	"color":"grey"
}

// 有可能因长刻度长度的bug可以改
function maxTickLength() {
	return(3600) // 默认一小时
}
