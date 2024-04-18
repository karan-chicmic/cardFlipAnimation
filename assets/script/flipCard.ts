import { _decorator, Component, InstanceMaterialType, instantiate, Node, Prefab, Animation } from "cc";
const { ccclass, property } = _decorator;

@ccclass("flipCard")
export class flipCard extends Component {
    @property({ type: Prefab })
    cardPrefab: Prefab;

    cardArray: Node[] | Node[] = [];
    count: number;

    protected start(): void {
        this.onFlipStart();
    }

    onFlipStart() {
        for (let i = 0; i < 7; i++) {
            const card = instantiate(this.cardPrefab);
            this.cardArray.push(card);

            card.setPosition(-750 + i * 200, 0, 0);
            setTimeout(() => {
                let animation = card.getComponent(Animation);
                this.node.addChild(card);
                animation.play("flip");
                if (i == 6) {
                    animation.on(
                        Animation.EventType.FINISHED,
                        this.onFlipFinished,

                        this
                    );
                }
            }, i * 1000);
        }
    }

    onFlipFinished() {
        console.log("onFlipFinished console", this.node);
        for (let index = 0; index < this.cardArray.length; index++) {
            let card = this.cardArray[index];
            let animation = card.getComponent(Animation);
            Promise.resolve(animation.play("removeCard")).then(() => {
                this.node.removeChild(card);
            });
        }
    }
    update(deltaTime: number) {}
}
