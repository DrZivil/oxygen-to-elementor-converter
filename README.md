# Oxygen to Bricks Converter

## Overview

This tool converts Oxygen Builder JSON to Bricks Builder compatible format.

## Features

- Converts Oxygen elements to their Bricks equivalents
- Maps styling properties from Oxygen to Bricks
- Handles Oxygen classes and converts them to Bricks global classes
- Supports Oxygen 4.9+ JSON structure with "component" wrapper
- Advanced class extraction from inline properties
- Automatically detects common CSS utility class patterns
- Deduplicates similar classes to avoid redundancy

## Usage

1. Export your Oxygen JSON structure
2. Paste it into the converter
3. Click "Convert"
4. Copy the resulting Bricks JSON
5. Import into Bricks Builder by pasting directly in the editor

### Using in Bricks Builder

The converted JSON contains properly formatted global classes that Bricks Builder will recognize. You can:

1. Copy the entire converted JSON output
2. Open Bricks Builder (try.bricksbuilder.io or your own Bricks installation)
3. Right-click in the structure panel and paste

The elements, along with all classes, will be imported and ready to use.

## Updates

### Version 1.3 (May 2025)
- Improved style mapping to match Bricks format
- Enhanced style property organization for better compatibility
- Fixed color handling for background and typography
- Improved margin and padding formatting
- Added support for percentage width and height

### Version 1.2 (May 2025)
- Added intelligent class extraction from inline properties
- Added class deduplication to avoid redundant classes
- Enhanced UI to show more detailed class information
- Improved property grouping for better class organization

### Version 1.1 (May 2025)
- Added support for Oxygen 4.9+ JSON structure
- Enhanced class conversion
- Added automatic hex color detection in class names
- Fixed nested elements handling

## License

Open source
