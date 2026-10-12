@echo off
cd /d "%~dp0"
start "mock-gemini" /b node build\dev\mock-gemini.mjs
npx wp-playground-cli server --port=9400 --php=8.3 --mount=./wordpress/rcm-core:/wordpress/wp-content/plugins/rcm-core --mount=./wordpress/rcm-theme:/wordpress/wp-content/themes/rcm-theme --blueprint=./build/blueprint.json --define RCM_GEMINI_API_BASE http://127.0.0.1:3999 --define RCM_GEMINI_API_KEY local-mock-key --login
