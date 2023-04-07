#!/bin/bash

which uglifyjs || sudo npm install uglify-js -g

# uglifyjs --compress --mangle -- safeway.js | tee safeway.uglify.js
# uglifyjs --compress drop_console --mangle -- safeway.js | tee safeway.uglify.drop_console.js

# npx google-closure-compiler --js=safeway.js --js_output_file=safeway.closure.js && cat safeway.closure.js

original_file='safeway.js'
original=$(< "$original_file")
#minified=$(uglifyjs --compress drop_console --mangle -- "$original_file")
minified=$(uglifyjs --compress --mangle -- "$original_file")

echo
echo "original ${#original}"
echo "minified ${#minified}"
echo "$minified"

single_quote=${minified//\"/\'}

echo
echo "single_quote ${#single_quote}"
echo "$single_quote"

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
    Drag this link to your bookmarks bar: <a href="javascript:$(echo "$minified" | sed 's/"/\x27/g')">Just4U</a>
    <br><br>
    Example:<br>
    <img src="bookmarklet.png">
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
