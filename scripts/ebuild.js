const fs = require("fs-extra");
const process = require("process");
const path = require("path");
const { realpathSync } = require("fs");

const build = async () => {
	const cwd = process.cwd();
	const curPath = realpathSync(cwd);

	const oldAppPath = path.join(curPath, "./electron/app");
	const curAppPath = path.join(curPath, "./dist/app");
	const oldDistPath = path.join(curPath, "./electron/dist");

	const curAppExist = fs.pathExistsSync(curAppPath);
	const oldAppExist = fs.pathExistsSync(oldAppPath);
	const oldDistExist = fs.pathExistsSync(oldDistPath);

	if (!curAppExist) {
		console.error("没用可用的程序包");
		process.exit(1);
	}

	if (oldAppExist) {
		await fs.remove(oldAppPath);
		console.log("原app文件夹已经删除");
	}

	if (oldDistExist) {
		await fs.remove(oldDistPath);
		console.log("原Electron打包文件已删除");
	}

	console.log("正在拷贝新的App......");
	await fs.copy(curAppPath, oldAppPath);
	console.log("拷贝完成......");

	console.log("准备打包应用......");
};

build();
