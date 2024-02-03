#!/usr/bin/env bash

#Capture user input; only expecting 1 arg
feature_name="${1}"

usage () {
  echo "Usage: ${0} <your-kebab-cased-feature-name>" 1>&2
  exit 1
}

is_feature_name_valid () {
  # grep's exit code indicates whether it matched (0) or not (1), so we can use
  # the value directly in a conditional to determine whether a string is valid.
  #
  # -E = extended
  # -s = silence error output
  # -q = suppress normal grep output
  #
  # regex checks if the string starts with one of more lower case letters,
  # followed by zero or more groups of a dash and one or more lowercase letters.
  grep -Esq '^([a-z]+)(-[a-z]+)*$' <<<"${1}"
}

# ensure input arg is valid
is_feature_name_valid "${feature_name}" || usage

# Make a PascalCase version of the feature name.
# Ref: https://unix.stackexchange.com/a/196246
#
# Ex:
#    ❯ echo piano-taco-pants | perl -pe 's/(^|_|-)([a-z])/uc($2)/ge'
#    PianoTacoPants
pascal_case_feature_name=$(perl -pe 's/(^|_|-)([a-z])/uc($2)/ge' <<<"${feature_name}" )

# Folders and files we need to create
paths=(
  "./src/features/${feature_name}"
  "./src/features/${feature_name}/index.js"
  "./src/features/${feature_name}/${pascal_case_feature_name}.jsx"
  "./src/features/${feature_name}/Drawing.js"
  "./src/pages/${feature_name}.jsx"
)

# Error if any of them already exist
for p in "${paths[@]}"; do
  test -e "${p}" && {
    printf "! ERROR ! \n Path: %s already exists." "${p}"
    exit 1
  }
done

# Generate files and folders
for p in "${paths[@]}"; do
  if grep -Esq '\.jsx?$' <<<"${p}"; then
    touch "${p}"
  else
    mkdir -p "${p}"
  fi
done

echo "Created:"
printf "   %s\n" "${paths[@]}"

# Fill some files with code

# New feature's index file
{
  echo "export { default as ${pascal_case_feature_name} } from './${pascal_case_feature_name}.jsx'"
} >> "./src/features/${feature_name}/index.js"
echo "Added component export to: ./src/features/${feature_name}/index.js"

# New features's component boilerplate
{
  echo "// @ts-check"
  echo ""
  echo "import React from 'react'"
  echo "import { MainContainer, ContentContainer } from '@/components/Layout'"
  echo "import { Drawing } from './Drawing'"
  echo ""
  echo "export default function ${pascal_case_feature_name} () {"
  echo "  // add useState, etc hooks"
  echo ""
  echo "  return ("
  echo "    <MainContainer>"
  echo "      <ContentContainer>"
  echo "        <Drawing />"
  echo "      </ContentContainer>"
  echo ""
  echo "      <ContentContainer>"
  echo "        {/* text content */}"
  echo "      </ContentContainer>"
  echo "    </MainContainer>"
  echo "  )"
  echo "}"
} >> "./src/features/${feature_name}/${pascal_case_feature_name}.jsx"
echo "Added component boilerplate to: ./src/features/${feature_name}/${pascal_case_feature_name}.jsx"

# New feature's Drawing
{
  echo "// @ts-check"
  echo ""
  echo "import { CanvasBuilder } from '@/components/Canvas'"
  echo ""
  echo "const HEIGHT = 100"
  echo "const WIDTH = 100"
  echo ""
  echo "// - React Component"
  echo ""
  echo "export const Drawing = new CanvasBuilder()"
  echo "  .withId('${pascal_case_feature_name}')"
  echo "  .withHeightAndWidth(HEIGHT, WIDTH)"
  echo "  .withDrawFactory(drawFactory)"
  echo "  .build()"
  echo ""
  echo "// - Draw Factory"
  echo ""
  echo "/** @type {import('@/components/Canvas/CanvasBuilder').DrawFactory} */"
  echo "function drawFactory (ctx, { drawState, setDrawState }) {"
  echo "  let requestId"
  echo ""
  echo "  function draw (drawArgs) {"
  echo "    // implement"
  echo "  }"
  echo ""
  echo "  return {"
  echo "    draw,"
  echo "    abort: () => cancelAnimationFrame(requestId)"
  echo "  }"
  echo "}"
} >> "./src/features/${feature_name}/Drawing.js"
echo "Added Drawing boilerplate to: ./src/features/${feature_name}/Drawing.js"

# New feature's /pages page
{
  echo "// @ts-check"
  echo ""
  echo "import React from 'react'"
  echo "import Head from 'next/head'"
  echo "import { PageContainer } from '@/components/Layout'"
  echo "import { ${pascal_case_feature_name} } from '@/features/${feature_name}'"
  echo ""
  echo "export default function ${pascal_case_feature_name}Page () {"
  echo "  return ("
  echo "    <PageContainer>"
  echo "      <Head>"
  echo "        <title>Huygens Pendulum Clock</title>"
  echo "        <link href='/favicon.ico' rel='icon' />"
  echo "      </Head>"
  echo ""
  echo "      <${pascal_case_feature_name} />"
  echo "    </PageContainer>"
  echo "  )"
  echo "}"
} >> "./src/pages/${feature_name}.jsx"
echo "Added page boilerplate to: ./src/pages/${feature_name}.jsx"
