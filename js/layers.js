addLayer("exp", {
    name: "exp", // 可选项，基本都用id/
    symbol: "E", // 层的按钮显示文字，默认为id的第一个大写字母。
    position: 0, // 行内的水平位置。默认使用id按字母顺序排序。
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // 可以是按需求增加的函数。
    resource: "exp", // 资源名。
    baseResource: "foods", // 资源需求。
    baseAmount() {return player.points}, // 获得基础值。
    type: "normal", // normal: 成本取决于获得数量。 static: 成本取决于已有的数量。
    exponent: 0.45, // 膨胀指数。
    gainMult() { // 获得倍数。
        mult = new Decimal(1)
        if (hasUpgrade('exp', 13)) mult = mult.times(upgradeEffect('exp', 13))
        return mult
    },
    gainExp() { // 获得指数。
        return new Decimal(1)
    },
    row: 0, // 行数（零索引）。
    layerShown(){return true},
    upgrades: {
        11:{
            title:"自己的餐具",
            description: "买饭速度翻倍",
            cost: new Decimal(1),
        },
        12:{
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            title:"外卖放置区",
            description: "基于经验加速买饭速度",
            cost: new Decimal(3),
            
        },
        13:{
            effect() {
                return player[this.layer].points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            title:"更大的垃圾桶",
            description: "基于经验增加经验获取",
            cost: new Decimal(10),
            
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1).mul(x) },
            effect(x) {return new Decimal(1).mul(x)},
            display() { return `大号垃圾桶<br>加速买饭速度*`+format(this.effect(getBuyableAmount(this.layer, this.id)))+`<br>成本：`+ format(this.cost(getBuyableAmount(this.layer, this.id)))},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    }
})
