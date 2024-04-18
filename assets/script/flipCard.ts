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
        this.cardsAnimation(this.cardArray, 0, "startCard");
    }
    // openCards() {
    //     this.cardArray.forEach((card) => {
    //         card.getComponent(Sprite).spriteFrame = this.cardImage;
    //         card.getComponent(Animation).play(Cards_Animations.Open);
    //     });
    // }

    // closeCard(round) {
    //     if (round == this.totalCards) {
    //         this.startCard(0);
    //         return;
    //     }
    //     const card = this.cardArray[round];
    //     const animation = card.getComponent(Animation);
    //     animation.play(Cards_Animations.Close);
    //     animation.on(Animation.EventType.FINISHED, () => this.closeCard(round + 1), this, true);
    // }

    // flipCard(round) {
    //     if (round == this.totalCards) {
    //         this.closeCard(0);
    //         return;
    //     }
    //     const card = this.cardArray[round];
    //     const animation = card.getComponent(Animation);
    //     animation.play(Cards_Animations.Flip);
    //     animation.on(Animation.EventType.FINISHED, () => this.flipCard(round + 1), this, true);
    // }

    // startCard(round: number) {
    //     if (round == this.totalCards) {
    //         this.flipCard(0);
    //         return;
    //     }
    //     const card = this.cardArray[round];
    //     card.getComponent(Sprite).spriteFrame = this.cardImage;
    //     const animation = card.getComponent(Animation);
    //     animation.play(Cards_Animations.Open);
    //     animation.on(Animation.EventType.FINISHED, () => this.startCard(round + 1), this, true);
    // }

    cardsAnimation(cards: Node[], count: number, operation: String) {
        if (cards.length == 0) return;
        const card = cards[count];

        card.getComponent(Sprite).spriteFrame = this.cardImage;
        const animation = card.getComponent(Animation);
        if (operation == "startCard") {
            if (count == cards.length - 1) {
                count = -1;
                operation = "flipCard";
            }
            animation.play(Cards_Animations.Open);
            animation.on(
                Animation.EventType.FINISHED,
                () => this.cardsAnimation(cards, count + 1, operation),
                this,
                true
            );
        } else if (operation == "flipCard") {
            if (count == cards.length - 1) {
                count = -1;
                operation = "closeCard";
            }
            animation.play(Cards_Animations.Flip);
            animation.on(
                Animation.EventType.FINISHED,
                () => this.cardsAnimation(cards, count + 1, operation),
                this,
                true
            );
        } else if (operation == "closeCard") {
            if (count == cards.length - 1) {
                count = -1;
                operation = "startCard";
            }
            animation.play(Cards_Animations.Close);
            animation.on(
                Animation.EventType.FINISHED,
                () => this.cardsAnimation(cards, count + 1, operation),
                this,
                true
            );
        }
    }
}
