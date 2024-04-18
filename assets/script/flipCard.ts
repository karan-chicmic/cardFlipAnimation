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
        this.cardRecursion(this.cardArray, 0, 0);
    }

    // cardsAnimation(cards: Node[], count: number, operation: string, step: number) {
    //     switch (step) {
    //         case 0:
    //             operation = Cards_Animations.Open;
    //         case 1:
    //             operation = Cards_Animations.Flip;

    //         case 2:
    //             operation = Cards_Animations.Close;
    //     }

    //     if (cards.length == 0) return;
    //     const card = cards[count];

    //     card.getComponent(Sprite).spriteFrame = this.cardImage;
    //     const animation = card.getComponent(Animation);

    //     if (count == cards.length - 1) {
    //         step += step + 1;
    //         count = 0;
    //     }
    //     animation.play(operation);

    //     animation.on(
    //         Animation.EventType.FINISHED,
    //         () => this.cardsAnimation(cards, count + 1, operation, step),
    //         this,
    //         true
    //     );
    // }

    cardRecursion(cards: Node[], count: number, step: number) {
        if (cards.length == 0) return;
        const card = cards[count];
        card.getComponent(Sprite).spriteFrame = this.cardImage;
        const animation = card.getComponent(Animation);
        // animation.play(operation);
        if (count == cards.length - 1) {
            step = step + 1;
            return;
        }

        switch (step) {
            case 0:
                animation.play(Cards_Animations.Open);

            case 1:
                animation.play(Cards_Animations.Flip);

            case 2:
                animation.play(Cards_Animations.Close);
        }
        animation.on(Animation.EventType.FINISHED, () => this.cardRecursion(cards, count + 1, step), this, true);
    }
}
