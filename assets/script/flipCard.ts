import { _decorator, Component, InstanceMaterialType, instantiate, Node, Prefab, Animation } from "cc";
const { ccclass, property } = _decorator;

@ccclass("flipCard")
export class flipCard extends Component {
    @property({ type: Prefab })
    cardPrefab: Prefab;
    // start() {
    //     for (let i = 0; i < 7; i++) {
    //         const card = instantiate(this.cardPrefab);
    //         card.addComponent(Animation);
    //         const animation = this.node.getComponent(Animation);
    //         if (animation && animation.defaultClip) {
    //             const { defaultClip } = animation;
    //             defaultClip.events = [
    //                 {
    //                     frame: 0.5, // Triggers the event on the 0.5 second
    //                     func: "onTriggered", // The name of the function to call when the event is triggered
    //                     params: ["0"], // Parameters passed to `func`
    //                 },
    //             ];

    //             animation.clips = animation.clips;
    //         }

    //         setTimeout(() => {
    //             this.node.addChild(card);
    //             // const animationComponent = card.addComponent(Animation);
    //             // animationComponent.play("idle");
    //             card.setPosition(-750 + i * 200, 0, 0);
    //         }, 1000 * i);
    //     }
    // }

    protected start(): void {
        this.flipCards(7);
    }

    flipCards(totalCards: number) {
        for (let i = 0; i < totalCards; i++) {
            const card = instantiate(this.cardPrefab);
            console.log("before animation", card);
            card.setPosition(-750 + i * 200, 0, 0);

            setTimeout(() => {
                this.node.addChild(card);

                let animation = card.getComponent(Animation);
                animation.play();
            }, 1000 * i);
        }
    }

    update(deltaTime: number) {}
}
