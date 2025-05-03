<div class="oxygen-to-bricks-container">
    <header class="otb-header">
        <h1 class="otb-title"><?php echo esc_html($atts['title']); ?></h1>
        <p class="otb-description"><?php echo esc_html($atts['description']); ?></p>
    </header>

    <div class="otb-converter-container">
        <div class="otb-input-container">
            <label for="otb-input"><?php esc_html_e('Paste Oxygen 4.9 JSON', 'oxygen-to-bricks-converter'); ?></label>
            <textarea id="otb-input" placeholder="<?php esc_attr_e('Paste Oxygen 4.9 JSON here...', 'oxygen-to-bricks-converter'); ?>" rows="15"></textarea>
        </div>
        
        <div class="otb-output-container">
            <label for="otb-output"><?php esc_html_e('Bricks JSON Output', 'oxygen-to-bricks-converter'); ?></label>
            <textarea id="otb-output" placeholder="<?php esc_attr_e('Bricks JSON will appear here...', 'oxygen-to-bricks-converter'); ?>" rows="15" readonly></textarea>
            <div class="otb-output-actions">
                <button id="otb-copy" class="otb-btn otb-small"><?php esc_html_e('Copy to Clipboard', 'oxygen-to-bricks-converter'); ?></button>
                <button id="otb-download" class="otb-btn otb-small"><?php esc_html_e('Download JSON', 'oxygen-to-bricks-converter'); ?></button>
            </div>
        </div>
        
        <div class="otb-actions">
            <button id="otb-convert" class="otb-btn otb-primary"><?php esc_html_e('Convert', 'oxygen-to-bricks-converter'); ?></button>
            <button id="otb-load-example" class="otb-btn otb-secondary"><?php esc_html_e('Load Example', 'oxygen-to-bricks-converter'); ?></button>
        </div>
    </div>

    <!-- Hidden div to store example JSON -->
    <div id="otb-example-json" style="display: none;"><?php echo json_encode(array(
        "id" => 0,
        "name" => "ct_div_block",
        "options" => array("ct_content" => "", "classes" => array("box")),
        "children" => array(
            array(
                "id" => 1,
                "name" => "ct_headline",
                "options" => array("ct_content" => "Hello Bricks!")
            )
        )
    )); ?></div>
</div>
