#!/bin/bash
set -e

echo "Building .NET application..."
dotnet publish -c Release -o out

echo "Running migrations..."
cd out
dotnet ef database update --no-build

echo "Build complete!"