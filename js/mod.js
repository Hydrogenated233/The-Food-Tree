let modInfo = {
	name: "外卖树",
	id: "food-tree",
	author: "Hydrpgenated233",
	pointsName: "foods",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
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
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('exp', 11)) gain = gain.times(2)
	if (hasUpgrade('exp', 12)) gain = gain.times(upgradeEffect('exp',12))
	gain=gain.times(buyableEffect('exp',11))
	return gain
}

// 不属于任何层的数据存放处，需要初始值。
function addedPlayerData() { return {
}}

// 顶部显示文字。
var displayThings = [
]

// 结局条件
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}


// 背景样式，可以为函数。
var backgroundStyle = {

}

// 有可能因长刻度长度的bug可以改
function maxTickLength() {
	return(3600) // 默认一小时
}
