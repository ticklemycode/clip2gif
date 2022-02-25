const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean, description: 'Display this usage guide.'},
  { name: 'src', type: String, description: 'Path to srouce file you want to convert to GIF', defaultOption: true},
  { name: 'speed', alias: 's', type: String, description: 'Used to speed up video, default is 1x. Ex: for 2.5x playback use 2.5', defaultValue: '1'},
  { name: 'outputDir', alias: 'o', type: String, description: 'Output directory. Default will be the same directory as source file.'},
	{ name: 'protect', alias: 'p', type: Boolean, description: 'Protect will prevent existing files from being overwritten. Default is files ARE overwritten.'}
];

const sections = [
  {
    header: 'Clip 2 GIF',
    content: [
      'Create a reduced file size clip and a GIF from a video clip.'
    ]
  },
  {
    header: 'Synopsis',
    content: [
			'$ clip2gif clip.mp4',
      '$ clip2gif clip.mp4 {bold -s} 2',
      '$ clip2gif clip.mp4 {bold -p}',
      '$ clip2gif clip.mov {bold -o} ./other-dir/"',
      '$ clip2gif {bold -h}'
    ]
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  }
];

const options = commandLineArgs(optionDefinitions);
const usage = commandLineUsage(sections);

if(options.help){
  console.log(usage);
}

module.exports = options;