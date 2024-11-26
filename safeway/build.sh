#!/bin/bash

original_file='safeway.js'
original=$(< "$original_file")
minified=$(uglifyjs --compress --mangle --output-opts quote_style=1 -- "$original_file")

echo "original ${#original}"
echo "minified ${#minified}"
echo
echo "$minified"

cat << EOF > index.html
<!doctype html>
<html>
  <head>
    <title>Safeway J4U Coupon Clipper</title>
    <style>
      body {
        font-family: arial, sans-serif;
      }
      img {
        box-shadow: 2px 2px 2px;
      }
    </style>
  </head>
  <body>
    <h3>Bookmarklet</h3>
    Drag this link to your bookmarks bar:
    <a href="javascript:$minified">Just4U</a>
    <br /><br />
    Example:<br />
    <img src="bookmarklet.png" />
    <h3>Instructions</h3>
    <ol>
      <li>Log in to the <a href="https://www.safeway.com/account/sign-in.html">safeway.com Coupon Center</a></li>
      <li>When the page loads, click the "Just4U" bookmarklet you created above.</li>
      <li>Each item will be added to your card sequentially.</li>
    </ol>
    <h3>Uncompiled Source</h3>
    <pre>
$original
    </pre>
  </body>
</html>
EOF
