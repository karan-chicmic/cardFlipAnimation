import { _decorator, Component, InstanceMaterialType, instantiate, Node, Prefab, Animation } from "cc";
const { ccclass, property } = _decorator;

@ccclass("flipCard")
export class flipCard extends Component {
    @property({ type: Prefab })
    cardPrefab: Prefab;

    cardArray: Node[] | Node[] = [];
    count: number;

    protected start(): void {
        for (let i = 0; i < 7; i++) {
            const card = instantiate(this.cardPrefab);

            card.setPosition(-750 + i * 200, 0, 0);
            setTimeout(() => {
                let animation = card.getComponent(Animation);
                this.node.addChild(card);
                animation.play("flip");
                animation.on(
                    Animation.EventType.FINISHED,
                    () => {
                        animation.play("removeCard");
                    },
                    this
                );
            }, i * 1000);
        }
    }

    update(deltaTime: number) {}
}
