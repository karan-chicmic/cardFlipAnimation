import { _decorator, Component, InstanceMaterialType, instantiate, Node, Prefab, Animation } from "cc";
const { ccclass, property } = _decorator;

@ccclass("flipCard")
export class flipCard extends Component {
    @property({ type: Prefab })
    cardPrefab: Prefab;

    cardArray: Node[] | Node[] = [];
    count: number;

    protected start(): void {
        this.flipCards(7);
    }

    flipCards(totalCards: number) {
        this.count += (totalCards - 1) * 1000;
        for (let i = 0; i < totalCards; i++) {
            const card = instantiate(this.cardPrefab);
            this.cardArray.push(card);
            card.setPosition(-750 + i * 200, 0, 0);

            let animation = card.getComponent(Animation);
            setTimeout(() => {
                this.node.addChild(card);

                animation.play("flip");
            }, 1000 * i);
        }

        for (let i = totalCards - 1; i >= 0; i--) {
            const card = this.cardArray[i];
            let animation = card.getComponent(Animation);
            setTimeout(() => {
                animation.play("removeCard");
                if (i == 0) {
                    console.log("<0 condition occurs");
                    this.flipCards(totalCards);
                }
            }, 14500 - i * 1000);
        }
    }

    update(deltaTime: number) {}
}
