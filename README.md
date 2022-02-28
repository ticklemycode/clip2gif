# clip2gif

> Note: `ffmpeg` (v4.4.1 or greater) is required in order to use this package. You can download `ffmpeg` from https://ffmpeg.org/download.html or install with Homebrew `brew install ffmpeg`

## Why?
This tool was created to quickly share screen recordings as an animated GIFs within team collaboration tools like Slack and WebEx. Animated GIFs can also compliment changes within a Github or Bitbucket pull request. 

## How?
Under the hood this tool will execute `ffmpeg` commands to first create a compressed version of the original clip which is used to then produce the most optimized animated GIF possible. (The compressed version of the original clip can be also be saved with the `--saveClip` flag, otherwise only the GIF will be created).

> Tested with `.mov` and `.mp4` files. `clip2gif` can reduce an MP4 to **90%** from its original file size and MOV files down **80%** and still **maintain excellent quality**.

## Sample
The GIF below was created with `clip2gif` from a Camtasia screen recording. It was a 40 second clip sped up 2x to create a 20 second clip.

![Sample GIF](./samples/sample2.gif)

## Install
```bash
  npm i -g clip2gif@latest
```

## Usage
The following will create a smaller file size version of the original file and create a 30s animated GIF.

```bash
  clip2gif /folder/sample.mp4 -s 2.5
```

## Options

| option                  | description                                                                                                   |
|-------------------------|---------------------------------------------------------------------------------------------------------------|
| -h, --help              | Display this usage guide.                                                                                     |
| --src, --file string    | Path to source file you want to convert to GIF                                                                |
| -s, --speed string      | Used to speed up video, default is 1x. Ex: for 2.5x playback use `2.5`                                        |
| -o, --outputDir string  | Output directory. Default will be the same directory as source file.                                          |
| -e, --saveClip          | Save compressed version of the orginal source.                                                                |
| -y, --clipOnly          | Create the compressed clip only, GIF will NOT be created.                                                     |
| -p, --protect           | Protect will prevent existing files from being overwritten. By default files ARE overwritten.                 |

## Notes
Keep your clips as sort as possible, animated GIF aren't suppose to be long.
