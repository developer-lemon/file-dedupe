const { resolve, isAbsolute } = require("path");
const { createHash } = require("crypto");
const { createReadStream, readdirSync, rm, writeFile } = require("fs");

module.exports = async function dedupe(argv) {
  console.time("任务耗时");
  const root = isAbsolute(argv.dir)
    ? argv.dir
    : resolve(process.cwd(), argv.dir);
  const hashes = new Set();
  const repeatFiles = [];

  const files = readdirSync(root);
  console.log("正在处理，总文件数: ", files.length);
  for (let i = 0, l = files.length; i < l; i++) {
    const item = files[i];
    const path = resolve(root, item);
    try {
      const hash = await getFileStramHash(path);
      if (hashes.has(hash)) {
        repeatFiles.push(item);
        if (argv.remove) {
          rm(path, () => console.log(`已删除${repeatFiles.legnth}个重复文件`));
        } else {
          console.log(`已找到${repeatFiles.legnth}个重复文件`);
        }
        continue;
      }
      hashes.add(hash);
      console.log(`已扫描${i + 1}/${l} hash:`, hash, item);
    } catch (e) {}
  }

  argv.output &&
    writeFile(resolve(root, argv.output), JOSN.stringify(argv.output, null, 2));
  console.log("已找到重复文件如下：", repeatFiles);
  argv.remove && console.log("已删除重复文件数:", repeatFiles.length);

  console.timeEnd("任务耗时");
};

function getFileStramHash(path) {
  return new Promise((resolve, reject) =>
    createReadStream(path)
      .on("error", reject)
      .pipe(createHash("sha1"))
      .setEncoding("hex")
      .on("finish", function () {
        resolve(this.read()); // or hash.digest('hex')
      })
  );
}
