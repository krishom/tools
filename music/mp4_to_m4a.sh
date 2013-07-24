#!/bin/bash -x
# Extracts the audio track from mp4 and flv videos.
# Adds artist and title info from the file name.

binary="$(which avconv || which ffmpeg)"
if [[ -z "$binary" ]]; then
  echo "This script requires avconv or ffmpeg"
  echo "$ sudo apt-get install libav-tools"
  echo "$ sudo apt-get install ffmpeg"
  exit 1
fi

for file in ~/Music/*.mp4
do
  out="$(echo $file | sed -r 's/(flv|mp4)$/m4a/')"
  # Skip files that have already been converted.
  if [[ ! -f $out ]]; then
    artist="$(basename "$file" | sed -r 's/ *-.*//')"
    title="$(basename "$file" | sed -r 's/.*- *(.*)\.(flv|mp4)/\1/')"
    $binary -i "$file" -vn -acodec copy -metadata artist="$artist" -metadata title="$title" "$out"
  fi
done
