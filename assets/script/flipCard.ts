import { _decorator, Component, InstanceMaterialType, instantiate, Node, Prefab } from "cc";
const { ccclass, property } = _decorator;

@ccclass("flipCard")
export class flipCard extends Component {
    @property({ type: Prefab })
    cardPrefab: Prefab;
    start() {
        for (let i = 0; i < 6; i++) {
            const card = instantiate(this.cardPrefab);
            this.node.addChild(card);
            card.setPosition(-750 + i * 200, 0, 0);
        }
    }

    update(deltaTime: number) {}
}
