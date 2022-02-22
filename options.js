const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean, description: 'Display this usage guide.'},
  { name: 'file', alias: 'f', type: String, description: 'Path to file you want to convert to GIF'},
	{ name: 'speed', alias: 's', type: String, description: 'Used to speed up video, default is 1x. Ex: for 2.5x playback use 2.5', defaultValue: '1'},
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
      '$ c2gif {bold --file} foo.mp4 {bold --speed} 2',
			'$ c2gif {bold --file} foo.mp4',
			'$ c2gif {bold --file} foo.mp4 {bold --protect} -p',,
      '$ c2gif {bold --help}'
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