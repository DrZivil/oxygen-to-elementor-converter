# Oxygen to Elementor Converter

## Overview

This tool converts Oxygen Builder JSON to Elementor compatible format.

## Features

- Converts Oxygen elements to their Elementor equivalents
- Maps styling properties from Oxygen to Elementor
- Merges styles from Oxygen classes directly into Elementor element settings
- Supports Oxygen 4.9+ JSON structure with "component" wrapper
- Applies styles from Oxygen, including those from classes and inline properties

## Usage

1. Export your Oxygen JSON structure
2. Paste it into the converter
3. Click "Convert"
4. Copy the resulting Elementor JSON
5. Paste directly into the Elementor editor (usually by right-clicking on a section/container and choosing 'Paste', or by dragging a JSON file onto the editor if that feature is supported by your Elementor version/setup for raw element JSON).

### Using in Elementor

The converted JSON contains an array of Elementor elements with their settings directly applied. This array can be pasted into the Elementor editor. You can:

1. Copy the entire converted JSON output
2. Open Elementor editor on a page or template.
3. Typically, you can right-click on a container or section in the Elementor editor and select 'Paste'. Alternatively, you might be able to paste directly into the main editor area or import from a .json file if you save the output.

The elements will be imported and ready to use.

## Updates

### Version 2.0.0 (October 2023)
- Major: Converted functionality from Oxygen-to-Bricks to Oxygen-to-Elementor.
- Maps Oxygen elements and styles to Elementor's JSON structure.
- Outputs an array of Elementor elements for direct pasting.

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
