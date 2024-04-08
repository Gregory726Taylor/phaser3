import { Pipelines } from 'phaser/lib/renderer/webgl/WebGLRenderer';
import TransformMatrix from 'phaser/lib/gameobjects/components/TransformMatrix';
import Rope from 'phaser/lib/gameobjects/rope/Rope';

/**
 * Renders this Game Object with the WebGL Renderer to the given Camera.
 * The object will not render if any of its renderFlags are set or it is being actively filtered out by the Camera.
 * This method should not be called directly. It is a utility function of the Render module.
 *
 * @method Phaser.GameObjects.Rope#renderWebGL
 * @since 3.23.0
 * @private
 *
 * @param {Phaser.Renderer.WebGL.WebGLRenderer} renderer - A reference to the current active WebGL renderer.
 * @param {Phaser.GameObjects.Rope} src - The Game Object being rendered in this call.
 * @param {Phaser.Cameras.Scene2D.Camera} camera - The Camera that is rendering the Game Object.
 * @param {Phaser.GameObjects.Components.TransformMatrix} parentMatrix - This transform matrix is defined if the game object is nested
 */
const RopeWebGLRenderer = (renderer: Phaser.Renderer.WebGL.WebGLRenderer, src: Rope, camera: Phaser.Cameras.Scene2D.Camera, parentMatrix: TransformMatrix) =>
{
    camera.addToRenderList(src);

    const pipeline = renderer.pipelines.set(src.pipeline, src);

    const calcMatrix = GetCalcMatrix(src, camera, parentMatrix).calc;

    const vertices = src.vertices;
    const uvs = src.uv;
    const colors = src.colors;
    const alphas = src.alphas;
    const alpha = src.alpha;
    const getTint = Utils.getTintAppendFloatAlpha;
    const roundPixels = camera.roundPixels;

    const meshVerticesLength = vertices.length;
    const vertexCount = Math.floor(meshVerticesLength * 0.5);

    //  Because it's a triangle strip and we don't want lots of degenerate triangles joining things up
    pipeline.flush();

    renderer.pipelines.preBatch(src);

    let textureUnit = pipeline.setGameObject(src);

    const vertexViewF32 = pipeline.vertexViewF3
