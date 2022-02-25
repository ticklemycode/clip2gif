# clip2gif

> Note: `ffmpeg` (v4.4.1 or greater) is required in order to use this package. You can download `ffmpeg` from https://ffmpeg.org/download.html or install with Homebrew `brew install ffmpeg`

## Why?
This tool was created to quickly share screen recordings from Camtasia or Quicktime which in some cases would normally be too large to send over email. It also creates a handy animated GIF which can be shared within team collaboration software like Slack and WebEx which usually play animated GIF files automatically in the chat window which is pretty kewl! 

> Tested with `.mov` and `.mp4` files. This tool can reduce an MP4 file size down **90%** from its original file size and MOV files down **80%** and still **maintain excellent quality**.

## Sample
The GIF below was created with `clip2gif` from a Camtasia (MP4) screen recording. It's a 40 second GIF!

![Sample GIF](./samples/sample.gif)

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
| --src, --file string    | Path to srouce file you want to convert to GIF                                                                |
| -o, --outputDir string  | Output directory. Default will be the same directory as source file.                                         |
| -s, --speed string      | Used to speed up video, default is 1x. Ex: for 2.5x playback use `2.5`                                        |
| -p, --protect           | Protect will prevent existing files from being overwritten. By default files ARE overwritten.                 |
