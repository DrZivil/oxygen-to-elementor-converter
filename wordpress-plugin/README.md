# Oxygen to Bricks Converter

A WordPress plugin that provides a tool to convert Oxygen 4.9 JSON to Bricks Builder format.

## Description

This plugin adds a shortcode `[oxygen_to_bricks]` that you can use on any WordPress page or post to display a conversion tool. The tool allows users to:

- Paste Oxygen 4.9 JSON data
- Convert it to Bricks Builder compatible format
- Copy the result to clipboard
- Download the converted JSON file

## Installation

1. Upload the `oxygen-to-bricks-converter` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Add the shortcode `[oxygen_to_bricks]` to any page or post where you want the converter to appear

## Shortcode Parameters

You can customize the appearance of the converter using these shortcode parameters:

- `title`: Change the heading text (default: "Oxygen 4.9 → Bricks Converter")
- `description`: Change the description text (default: "Convert Oxygen JSON to Bricks-compatible format")

Example:
```
[oxygen_to_bricks title="My Custom Converter" description="Convert your Oxygen designs to Bricks format"]
```

## Usage

1. Navigate to a page containing the `[oxygen_to_bricks]` shortcode
2. Paste your Oxygen 4.9 JSON into the left text area
3. Click "Convert" to transform it to Bricks format
4. Use the "Copy to Clipboard" button to copy the result or "Download JSON" to save it as a file

## Support

For support or feature requests, please contact the plugin author.

## License

This plugin is licensed under the GPL v2 or later.
