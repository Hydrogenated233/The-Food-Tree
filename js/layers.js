addLayer("A", {
    name: "ach", // 可选项，基本都用id/
    symbol: "A", // 层的按钮显示文字，默认为id的第一个大写字母。
    position: 1, // 行内的水平位置。默认使用id按字母顺序排序。
    row: "side", // 行数（零索引）。
    resource: "成就",
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#F0E686",
    achievements: {
        11: {
            name: "吃饱了撑的",
            done() {return player.points.gte(50)},
            tooltip:"50食物<br>玩原神玩的（bushi",
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        12: {
            name: "大胃王",
            done() {return player.points.gte(1000)},
            tooltip:"1,000食物<br>100%HF胃酸",
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        13: {
            name: "三国杀是最好的游戏",
            done() {return player.points.gte('e5')},
            tooltip:"100,000食物<br>三国杀是世界上最好的游戏，不服去打差评",
            onComplete() {player.A.points = player.A.points.add(1)},
        },
        14: {
            name: "科学计数法",
            done() {return player.points.gte('e9')},
            tooltip:"1e9食物<br>是什么意思呢？",
            onComplete() {player.A.points = player.A.points.add(1)},
        },
    }
})

addLayer("exp", {
    name: "经验", // 可选项，基本都用id
    symbol: "E", // 层的按钮显示文字，默认为id的第一个大写字母。
    position: 0, // 行内的水平位置。默认使用id按字母顺序排序。
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // 可以是按需求增加的函数。
    resource: "经验", // 资源名。
    baseResource: "食物", // 资源需求。
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
            effect() {
                return 2
            },
            title:"自己的餐具",
            description: "买饭速度翻倍",
            cost: new Decimal(1),
        },
        12:{
            effect() {
                return player[this.layer].points.add(1).pow(0.5).pow(inChallenge('exp', 11)?0.6:1)
            },
            effectDisplay() { return format(this.effect())+"x" },
            title:"外卖放置区",
            description: "基于经验加速买饭速度",
            cost: new Decimal(3),
            
        },
        13:{
            effect() {
                return player[this.layer].points.add(1).pow(0.15)
            },
            effectDisplay() { return format(this.effect())+"x" },
            title:"更大的垃圾桶",
            description: "基于经验增加经验获取",
            cost: new Decimal(10),
            
        },
        14:{
            effect() {
                return player[this.layer].points.add(10).log(4)
            },
            effectDisplay() { return format(this.effect())+"x" },
            title:"摇人",
            description: "基于经验增加买饭速度",
            cost: new Decimal(100),
            
        },
        15:{
            effect() {
                return 1.5
            },
            title:"我们联合！",
            description: "买饭速度<sup>1.5</sup>",
            cost: new Decimal(500),
            
        },
        16:{
            effect() {
                return 1.2
            },
            title:"自己做菜",
            description: "买饭速度<sup>1.2</sup>",
            cost: new Decimal('e6'),
            
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1).mul(x).add(1).pow(1.1)},
            effect(x) {return new Decimal(1).mul(x).add(1).pow(1.1)},
            display() { 
                return `大号垃圾桶<br>加速买饭速度*`+
                format(this.effect(getBuyableAmount(this.layer, this.id)))+
                `<br>成本：`+ format(this.cost(getBuyableAmount(this.layer, this.id)))
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    milestones: {
        0: {
            requirementDescription: "100经验",
            effectDescription: "鼠标是什么？每秒获得10%经验",
            done() { return player.exp.points.gte(100) }
        },
        1: {
            requirementDescription: "100,000经验",
            effectDescription: "太慢了？每秒获得25%经验",
            done() { return player.exp.points.gte("e5") }
        },
        2: {
            requirementDescription: "1e10经验",
            effectDescription: "我有一个大胆的想法。每秒获得100%经验",
            done() { return player.exp.points.gte("e10") }
        },
    },
    passiveGeneration(){
        let passive = new Decimal(0)
        if (hasMilestone("exp", 0)) passive = passive.add(0.1) //10%
        if (hasMilestone("exp", 1)) passive = passive.add(0.15) //25%
        if (hasMilestone("exp", 2)) passive = passive.add(0.75) //100%
        return passive
    },
    challenges: {
        11: {
            name: "脑残骑手",
            challengeDescription: "“外卖放置区”效果<sup>0.6</sup>",
            goalDescription: "需求：1,000,000食物",
            canComplete: function() {return player.points.gte("e6")},
            rewardDescription: "基于食物加速买饭速度",
            rewardEffect() {return player.points.add(1).pow(0.1)},
            rewardDisplay() {return "*"+format(this.rewardEffect())},
        },
    }
})
