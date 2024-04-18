import {
    _decorator,
    Component,
    InstanceMaterialType,
    instantiate,
    Node,
    Prefab,
    Animation,
    animation,
    SpriteFrame,
    Sprite,
} from "cc";
const { ccclass, property } = _decorator;
const Cards_Animations = {
    Open: "OpenCard",
    Flip: "flip",
    Close: "removeCard",
};
@ccclass("flipCard")
export class flipCard extends Component {
    @property({ type: Node })
    cardsParent: Node = null;

    totalCards: number = 7;

    @property({ type: SpriteFrame })
    cardImage: SpriteFrame = null;

    @property({ type: Prefab })
    cardPrefab: Prefab;

    cardArray: Node[] | Node[] = [];
    count: number = 7;

    protected start(): void {
        this.onFlipStart();
        // this.animateCard(0);
    }

    onFlipStart() {
        for (let i = 0; i < 7; i++) {
            let card = instantiate(this.cardPrefab);
            this.cardArray.push(card);
            this.cardsParent.addChild(card);
        }
        // this.openCards();
        // this.startCard(0);
        const flipCardCb = () => {
            this.animateCards(0, Cards_Animations.Flip, null, closeCard);
        };
        const openCardCB = () => {
            this.animateCards(0, Cards_Animations.Open, this.cardImage, flipCardCb);
        };
        const closeCard = () => {
            this.animateCards(0, Cards_Animations.Close, null, openCardCB);
        };

        openCardCB();
    }
    openCards() {
        this.cardArray.forEach((card) => {
            card.getComponent(Sprite).spriteFrame = this.cardImage;
            card.getComponent(Animation).play(Cards_Animations.Open);
        });
    }

    animateCards(round: number, clipname: string, backCard: SpriteFrame | null, callback: () => void) {
        if (round == this.totalCards) {
            callback();
            return;
        }
        const card = this.cardArray[round];
        const animation = card.getComponent(Animation);
        backCard && (card.getComponent(Sprite).spriteFrame = this.cardImage);
        animation.play(clipname);
        animation.on(
            Animation.EventType.FINISHED,
            () => this.animateCards(round + 1, clipname, backCard, callback),
            this,
            true
        );
    }

    closeCard(round) {
        if (round == this.totalCards) {
            this.startCard(0);
            return;
        }
        const card = this.cardArray[round];
        const animation = card.getComponent(Animation);
        animation.play(Cards_Animations.Close);
        animation.on(Animation.EventType.FINISHED, () => this.closeCard(round + 1), this, true);
    }

    flipCard(round) {
        if (round == this.totalCards) {
            this.closeCard(0);
            return;
        }
        const card = this.cardArray[round];
        const animation = card.getComponent(Animation);
        animation.play(Cards_Animations.Flip);
        animation.on(Animation.EventType.FINISHED, () => this.flipCard(round + 1), this, true);
    }

    startCard(round: number) {
        if (round == this.totalCards) {
            this.flipCard(0);
            return;
        }
        const card = this.cardArray[round];
        card.getComponent(Sprite).spriteFrame = this.cardImage;
        const animation = card.getComponent(Animation);
        animation.play(Cards_Animations.Open);
        animation.on(Animation.EventType.FINISHED, () => this.startCard(round + 1), this, true);
    }

    animateCard(round: number, forward: boolean) {
        console.log("animateCard Node", this.node); // canvas
        console.log(round);
        if (round < this.count) {
            let card = instantiate(this.cardPrefab);
            card.setPosition(-750 + round * 200, 0, 0);
            this.node.addChild(card);

            console.log(card);
            let animation = card.getComponent(Animation);
            animation.play("flip");
            animation.on(
                Animation.EventType.FINISHED,
                () => {
                    this.animateCard(round + 1, true);
                },
                this
            );
        }
    }

    onFlipFinished(card: Node) {
        console.log("node", this.node);
        console.log("onFlipFinished console", this.node);

        // this.cardArray.forEach((card, index) => {
        //     let animation = card.getComponent(Animation);

        //     setTimeout(() => {
        //         this.onFlip(animation).then(() => this.cardArray.pop());
        //     }, index * 1000);
        // });
        console.log("card", card);
        let animation = card.getComponent(Animation);
        animation.play("removeCard");
    }

    onFlip(animation: Animation) {
        return new Promise((resolve) => {
            animation.play("removeCard");
        });
    }
    update(deltaTime: number) {}
}
