const fs = require('fs-extra');

const source = './plugins/camera3d/dist/';
const dest = '../phaser3-examples/public/plugins/';

async function copyPlugin() {
  try {
    const stats = await fs.stat(dest);
    if (stats.isDirectory()) {
      await fs.copy(source, dest, { overwrite: true });
      console.log('Plugin copied successfully to Phaser 3 Examples.');
    } else {
      console.log('Copy-to-Examples failed: Phaser 3 Examples not present at ../phaser3-examples.');
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('Copy-to-Examples failed: Phaser 3 Examples not present at ../phaser3-examples.');
    } else {
      console.error('Error occurred while copying plugin:', err);
    }
  }
}

copyPlugin();
