import * as BABYLON from 'babylonjs'
import {
    HtmlMeshRenderer, HtmlMesh
} from "@babylonjs/addons/htmlMesh";
export class AppOne {
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;

    constructor(readonly canvas: HTMLCanvasElement) {
        this._engine = new BABYLON.Engine(canvas)
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
        this._scene = createScene(this._engine, this.canvas)

    }

    debug(debugOn: boolean = true) {
        if (debugOn) {
            this._scene.debugLayer.show({ overlay: true });
        } else {
            this._scene.debugLayer.hide();
        }
    }

    run() {
        this.debug(true);
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });
    }
}


var createScene = function(_engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
    // this is the default code from the playground:

    // This creates a basic Babylon Scene object (non-mesh)
    const scene = new BABYLON.Scene(_engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    // this._scene.createDefaultCameraOrLight(true, true, true);

    // const htmlMeshRenderer = new HtmlMeshRenderer(this._scene);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to this._scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.8, 0.5); // RGB for a greenish color
    ground.material = groundMaterial;
    groundMaterial.bumpTexture = new BABYLON.Texture("./normal.jpg", scene);
    //groundMaterial.bumpTexture.level = 0.125;

    return scene;
};
