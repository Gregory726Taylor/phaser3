const fs = require('fs-extra');

const source = './plugins/spine/dist/';
const destinations = [
  { dest: '../phaser3-examples/public/plugins/3.8.95/', name: 'phaser3-examples' },
  { dest: '../100-phaser3-snippets/public/libs/', name: '100-phaser3-snippets' },
];

for (const dest of destinations) {
  if (fs.existsSync(dest.dest)) {
    try {
      fs.copySync(source, dest.dest, { overwrite: true });
      console.log(`Copied files to ${dest.name} successfully.`);
    } catch (err) {
      console.error(`Error copying files to ${dest.name}:`, err);
    }
  } else {
    console.log(`Copy-to-${dest.name} failed: Phaser 3 Examples not present at ${dest.dest}`);
  }
}
