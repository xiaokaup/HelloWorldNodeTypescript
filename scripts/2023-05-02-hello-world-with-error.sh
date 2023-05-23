#!/bin/bash
# if [[ "$OSTYPE" == "linux-gnu"* ]]; then
#     echo "Running on Linux"
# elif [[ "$OSTYPE" == "darwin"* ]]; then
#     echo "Running on macOS"
# elif [[ "$OSTYPE" == "cygwin" ]]; then
#     echo "Running on Cygwin"
# elif [[ "$OSTYPE" == "msys" ]]; then
#     echo "Running on Windows (MSYS/MinGW)"
# elif [[ "$OSTYPE" == "win32" ]]; then
#     echo "Running on Windows (native)"
#     echo "Error: run .sh script on Window" >&2
#     exit 1
# else
#     echo "Unknown OS"
# fi

echo "OS: Linux"

echo "This is a message before the error."
echo "Error: a custimize error message from scripts" >&2
exit 1
echo "This is a message after the error. This line will not be executed." # will never show up
