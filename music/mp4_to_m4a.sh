#!/bin/bash
# Extracts the audio track from mp4 and flv videos.
# Adds artist and title info from the file name.

binary="$(which avconv || which ffmpeg)"
if [[ -z "$binary" ]]; then
  echo "This script requires avconv or ffmpeg"
  echo "$ sudo apt-get install libav-tools"
  echo "$ sudo apt-get install ffmpeg"
  exit 1
fi

for file in $1/*.flv $1/*.mp4
do
  m4a="${file/%.flv/.m4a}"
  m4a="${m4a/%.mp4/.m4a}"
  echo "$m4a"
  # Skip files that have already been converted.
  if [[ ! -f "$m4a" ]]; then
    basefile="$(basename "$m4a")"
    artist="${basefile/ -*/}"
    title="${basefile/*- /}"
    title="${title/%.m4a/}"
    $binary -i "$file" -vn -acodec copy -metadata artist="$artist" -metadata title="$title" "$m4a"
  fi
done
