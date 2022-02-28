#! /usr/bin/env node
'use strict'

const fs = require('fs')
const util = require('util');
const options = require('./options');
const exec = util.promisify(require('child_process').exec);
const commandExists = require('command-exists');
const colors = require('./colors');

if (options.help) {
	return false;
}

if (!options.src) {
	console.log(`${colors.FgYellow}Path to clip is required. EX: ${colors.FgGreen} clip2gif myfile.mp4`);
	return false;
}

if (options.protect) {
	if (fs.existsSync(options.src)) {
		console.log(`
			${colors.FgYellow}File already exist and command was ran with protect flag, process aborted! \n${options.src}
			${colors.FgYellow}Either rename file or run without protect flag to overwrite exiting files.
		`);
		return false;
	};
}

const size = {
	start: 0,
	end: 0
};
const filename = options.src.split("/").pop().replace(/\.(.*)/, '');
const smFilename = `${filename}_COMPRESSED.mp4`;
const hasPath = options.src.match(/.*\//);
let output = hasPath ? hasPath[0] : '';
const outputClipFilename = `${output}${smFilename}`;

if(options.outputDir) {
	output = options.outputDir.replace(/\/?$/, '/');
	if (!fs.existsSync(output)){
		fs.mkdirSync(output);
	}
}

function log(arr) {
	console.log(arr.join('\n'));
}

function getFileSize(path) {
	const stats = fs.statSync(path);
	return (stats.size / 1000000.0).toFixed(2);
}

function run() {
	commandExists('ffmpeg')
		.then(function (command) {
			reduceFileSizeAndCreateGIF();
		}).catch(function () {
			console.error(`${colors.FgCyan}Please install ffmpeg from https://www.ffmpeg.org/download.html or install using Homebrew, brew install ffmpeg`)
		});
}

async function reduceFileSizeAndCreateGIF() {
	try {
		const fileSize = getFileSize(options.src);
		size.start = fileSize;

		log([
			`${colors.FgCyan}Creating compressed clip started...`,
			`👉 Current file size: ${colors.FgYellow}${fileSize}MB`
			]
		);
		
		await exec(`ffmpeg -y -i ${options.src} -vcodec h264 -an -filter:v "setpts=PTS/${options.speed}" -acodec aac ${outputClipFilename}`);

		const outputFileSize = getFileSize(`${outputClipFilename}`);
		size.end = outputFileSize;

		log([
			`${colors.FgCyan}Creating compressed clip complete. ✅`,
			`${colors.FgCyan}👉 Reduced file size: ${colors.FgGreen}${outputFileSize}MB`,
			`${colors.FgYellow}🎬 ${outputClipFilename}`
			]
		);
		
		const difference = size.start - size.end
		log([`${colors.FgGreen}`,
			`┌─────── File Size Savings! ───────┐`,
			`	   -${difference.toFixed(2)}MB 🤟`,
			`└──────────────────────────────────┘`,
			``
		]);
		
		if(!options.clipOnly) {
			createGIF();
		}
	} catch (e) {
		console.error(`${colors.FgYellow}${e}`);
	}
}

async function createGIF() {
	await exec(`ffprobe -i ${options.src} -show_entries format=duration -v quiet -of csv="p=0"`).then(({stdout}) => {
		const MAX_DURATION = 30;
		const fileDuration = ++stdout;
		const reduceDuration = fileDuration > MAX_DURATION;
		const duration = reduceDuration ? MAX_DURATION : fileDuration.toFixed(0);
		const outputGifFilename = `${output}${filename}.gif`;
		
		if(reduceDuration) {
			console.log(`${colors.FgYellow}⚠️  GIF duration is limited to ${MAX_DURATION} seconds! Keep it short!\n`)
		}
		
		console.log(`${colors.FgMagenta}Creating GIF started...`);
		
		exec(`ffmpeg -y -ss 0 -t ${duration} -i ${outputClipFilename} -vf "fps=20,scale=800:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 ${outputGifFilename}`)
		.then(() => {
			log([
				`${colors.FgMagenta}Creating GIF complete. ✅`,
				`${colors.FgYellow}🖼  ${outputGifFilename} \n`,
				`${colors.FgCyan}Enjoy! 🍔`
			]);

			if(!options.saveClip) {
				console.log(`${colors.FgCyan}Cleaning up...`);
				exec(`rm -rf ${outputClipFilename}`).then(() => {
					log([
						'Compressed clip deleted.',
						'Clean up complete.'
					]);
				});
			}
		});
	})
}

run();
